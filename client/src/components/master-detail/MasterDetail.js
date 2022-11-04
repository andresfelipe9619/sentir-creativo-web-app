import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import Master from "./Master";
import Detail from "./Detail";
import useAPI from "../../providers/hooks/useAPI";
import Spinner from "../spinner/Spinner";
import SpeedDial from "../speed-dial/SpeedDial";
import CreateEntity from "../modals/CreateEntity";
import { formatDate, getQueryFilters, isDate, isObject } from "../../utils";
import DialogButton from "../buttons/DialogButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { useAlertDispatch } from "../../providers/context/Alert";
import { useFiltersState } from "../../providers/context/Filters";
import Filters, { getFilterOptions } from "../filters/Filters";
import useDashboard from "../../providers/hooks/useDashboard";
import useFilterOptions from "../../providers/hooks/useFilterOptions";

export default function MasterDetail({
  detailProps,
  lazy,
  masterProps,
  renderMaster,
  service,
  toggle,
  DetailCpm = Detail
}) {
  const match = useRouteMatch();
  const history = useHistory();
  const masterPath = match.path;
  const detailPath = `${masterPath}/:id`;
  const [open, setOpen] = useState(false);
  const {
    api,
    data,
    loading,
    init,
    loadMore,
    create: createEntity,
  } = useAPI({ service, lazy });
  const { openAlert } = useAlertDispatch();

  const handleClickRow = (_, { dataIndex }) => {
    const entityId = data[dataIndex].id;
    history.push(`${masterPath}/${entityId}`);
  };

  const handleRowsDelete = async (indexes, fn) => {
    try {
      const ids = indexes.map((i) => data[i].id);
      await Promise.all(ids.map(async (id) => await api.delete(id)));
      init && (await init());
      openAlert({
        variant: "success",
        message: "¡Borrado con éxito!",
      });
    } catch (e) {
      console.error(e);
      openAlert({
        variant: "error",
        message: "Ha ocurrido un error inesperado, intentalo de nuevo!",
      });
    } finally {
      fn([]);
    }
  };

  const handleOpenModal = () => setOpen(true);

  const handleCloseModal = () => setOpen(false);

  const masterViewProps = {
    data,
    init,
    toggle,
    loading,
    loadMore,
    masterProps,
    renderMaster,
    handleClickRow,
    handleRowsDelete,
  };
  return (
    <>
      {loading && <Spinner />}
      {!loading && (
        <Switch>
          {/* Renders all the audiences */}
          <Route
            exact
            strict
            path={masterPath}
            render={(props) => <MasterView {...props} {...masterViewProps} />}
          />
          {/* Render a specific audience */}
          <Route
            path={detailPath}
            render={(props) => (
              <DetailCpm
                {...detailProps}
                {...props}
                service={service}
                reloadMaster={init}
              />
            )}
          />
        </Switch>
      )}
      <CreateEntity
        open={open}
        entity={service}
        handleClose={handleCloseModal}
        handleCreate={createEntity}
        loading={loading}
        {...detailProps}
      />
      <SpeedDial service={service} handleCreate={handleOpenModal} />
    </>
  );
}
const PAGE_SIZE = 12;

function MasterView({
  data,
  init,
  toggle,
  masterProps,
  renderMaster,
  handleClickRow,
  handleRowsDelete,
  ...routerProps
}) {
  const filtersSchema = masterProps?.filters;
  const { showCards } = useFiltersState();
  const dashboardItem = useDashboard();
  const { filterOptions } = useFilterOptions({
    data,
    initialValues: filtersSchema,
  });
  console.log("filterOptions", filterOptions);
  const [searchValue, setSearchValue] = useState(null);
  const [searchOptions, setSearchOptions] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [loading, setLoading] = useState(false);

  const [firstItem] = data;
  const showCustom = toggle && showCards && renderMaster;
  const shouldUseFilters = !!filtersSchema?.length;
  const handleClose = (lookup, fn) => async (accepted) =>
    accepted && (await handleRowsDelete(Object.keys(lookup), fn));

  async function handleFilterChange(filters) {
    const { pagination } = filters;
    setPagination(pagination?.page || 1);
    const params = getQueryFilters(filters, filtersSchema);
    Reflect.deleteProperty(params, "_start");
    Reflect.deleteProperty(params, "_limit");
    let entries = Object.entries(params);
    if (!entries.length) return;
    setLoading(true);
    await init(params);
    setLoading(false);
  }

  function buildFilterOptions() {
    return (masterProps?.filters || []).map((f) => {
      let filter = filterOptions[f.name];
      let options = getFilterOptions(filter);
      return {
        ...f,
        options,
      };
    });
  }

  const offset = (pagination - 1) * PAGE_SIZE;
  const limit = pagination * PAGE_SIZE;
  let data2show = data;
  if (searchValue) {
    data2show = [searchValue];
  } else if (shouldUseFilters) {
    data2show = data.slice(offset, limit);
  }

  let shouldUseFavorite = typeof firstItem?.destacado === "boolean";
  if (showCustom && shouldUseFavorite && data2show.length > 1) {
    data2show = data2show.sort((a, b) => +b.destacado - +a.destacado);
  }

  useEffect(() => {
    if (!data || searchOptions?.length) return;
    setSearchOptions(data);
  }, [data, searchOptions]);

  return (
    <FiltersWrapper
      show={showCustom}
      color={dashboardItem?.color}
      data={data2show}
      loading={loading}
      maxCount={data.length}
      filterOptions={buildFilterOptions()}
      onSearchChange={setSearchValue}
      onFilterChange={handleFilterChange}
      searchOptions={searchOptions.sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
      )}
    >
      {showCustom &&
        renderMaster({
          data: data2show,
          handleClickRow,
          handleRowsDelete,
          ...routerProps,
        })}
      {!showCustom && (
        <Master
          {...masterProps}
          {...routerProps}
          data={data}
          onRowClick={handleClickRow}
          customToolbarSelect={({ lookup }, _, fn) => (
            <DialogButton
              color="default"
              label={<DeleteIcon />}
              onClose={handleClose(lookup, fn)}
            />
          )}
        />
      )}
    </FiltersWrapper>
  );
}

function FiltersWrapper({ show, children, ...filtersProps }) {
  const { filterOptions } = filtersProps;
  if (!filterOptions?.length || !show) return children;
  return <Filters {...filtersProps}>{children}</Filters>;
}

export function customBodyRender(type) {
  return (value) => {
    if (type) return bodyType(type, value);
    if (isDate(value)) return formatDate(value);
    if (Array.isArray(value)) {
      return value.map((i) => i.codigo || i.nombre).join(", ");
    }
    if (isObject(value)) {
      if (value.codigo) return value.codigo;
      return value.nombre;
    }
  };
}

function bodyType(type, value) { }

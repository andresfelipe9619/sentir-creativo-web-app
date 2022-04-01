import React, { useState } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import Master from "./Master";
import Detail from "./Detail";
import useAPI from "../../providers/hooks/useAPI";
import Spinner from "../spinner/Spinner";
import SpeedDial from "../speed-dial/SpeedDial";
import CreateEntity from "../modals/CreateEntity";
import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MuiSwitch from "@material-ui/core/Switch";
import { formatDate } from "../../utils";
import DialogButton from '../buttons/DialogButton'
import DeleteIcon from "@material-ui/icons/Delete";

export default function MasterDetail({
  masterProps,
  detailProps,
  service,
  create,
  toggle,
  renderMaster,
}) {
  const match = useRouteMatch();
  const history = useHistory();
  const masterPath = match.path;
  const detailPath = `${masterPath}/:id`;
  const [open, setOpen] = useState(false);
  const { data, loading, init, create: createEntity, api } = useAPI(service);

  const handleClickRow = (_, { dataIndex }) => {
    const entityId = data[dataIndex].id;
    history.push(`${masterPath}/${entityId}`);
  };

  const handleRowsDelete = async (indexes, fn) => {
    const ids = indexes.map((i) => data[i].id)
    await Promise.all(ids.map(async (id) => await api.delete(id)))
    init && await init()
    fn([]);
  };

  const handleOpenModal = () => setOpen(true);

  const handleCloseModal = () => setOpen(false);

  const masterViewProps = {
    data,
    toggle,
    loading,
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
          <Route
            exact
            strict
            path={masterPath}
            render={(props) => <MasterView {...props} {...masterViewProps} />}
          />
          <Route
            path={detailPath}
            render={(props) => (
              <Detail
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
      {create && <SpeedDial service={service} handleCreate={handleOpenModal} />}
    </>
  );
}

function MasterView({
  data,
  loading,
  toggle,
  masterProps,
  renderMaster,
  handleClickRow,
  handleRowsDelete,
  ...routerProps
}) {
  const [showList, setShowList] = useState(false);

  const handleChange = (e) => setShowList(e.target.checked);

  const showCustom = toggle && showList && renderMaster

  if (showCustom && typeof data[0]?.destacado === 'boolean') {
    data = data.sort((a, b) => +b.destacado - +a.destacado);
  }

  return (
    <>
      {toggle && (
        <Box width="100%" display="flex" justifyContent="flex-end" my={2}>
          <FormControlLabel
            control={
              <MuiSwitch
                checked={showList}
                onChange={handleChange}
                name="cardView"
                color="primary"
              />
            }
            label="Vista Cards"
          />
        </Box>
      )}
      {showCustom &&
        renderMaster({
          data,
          handleClickRow,
          handleRowsDelete,
          ...routerProps,
        })}
      {!showCustom && (
        <Master
          {...masterProps}
          {...routerProps}
          data={data}
          loading={loading}
          onRowClick={handleClickRow}
          customToolbarSelect={({ lookup }, _, fn) => <DialogButton color='grey' label={<DeleteIcon />}
            onClose={async accepted => accepted && await handleRowsDelete(Object.keys(lookup), fn)}/>
          }
          // onRowsDelete={({ lookup }) => handleRowsDelete(Object.keys(lookup))}

        />
      )}
    </>
  );
}

const isDate = (item) =>
  new Date(item) !== "Invalid Date" && !isNaN(new Date(item));

const isObject = (item) => !!item && typeof item === "object";

export function customBodyRender(type) {
  return (value) => {
    if (type) return bodyType(type, value);
    if (isDate(value)) return formatDate(value);
    if (Array.isArray(value)) {
      return value.map((i) => i.nombre).join(", ");
    }
    if (isObject(value)) {
      if (value.codigo) return value.codigo;
      return value.nombre;
    }
  };
}

function bodyType(type, value) {}

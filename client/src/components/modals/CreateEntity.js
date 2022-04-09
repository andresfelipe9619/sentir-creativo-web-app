import React, { useEffect } from "react";
import GenericModal from "./GenericModal";
import Grid from "@material-ui/core/Grid";
import { Formik } from "formik";
import { useAlertDispatch } from "../../providers/context/Alert";
import FormItem from "../master-detail/FormItem";
import useFormDependencies from "../../providers/hooks/useFormDependencies";

const EXCLUDED_FIELDS = ["bitacora", "file", "tag"];

export default function CreateEntity({
  open,
  entity,
  columns,
  handleClose,
  handleCreate,
  ...props
}) {
  const filteredColumns = (columns || []).filter(
    (column) => !EXCLUDED_FIELDS.includes(column?.form?.type)
  );
  const { openAlert } = useAlertDispatch();
  const { dependencies, loadDependencies, loadingDependencies } =
    useFormDependencies(filteredColumns);

  useEffect(() => {
    loadDependencies();
    //eslint-disable-next-line
  }, []);

  const handleFormSubmit = async (values) => {
    try {
      console.log(`values`, values);
      const result = await handleCreate({
        ...values,
      });
      console.log(`result`, result);
      openAlert({ variant: "success", message: `${entity} creado con éxito!` });
      handleClose();
    } catch (error) {
      console.error(error);
      openAlert({
        variant: "error",
        message: "Algo salió mal. Vuelve a intentarlo más tarde",
      });
    }
  };
  const initialValues = filteredColumns.reduce((acc, col) => {
    let key = col.name;
    acc[key] = "";
    if (col.form.type === "date") {
      acc[key] = new Date();
    }
    return acc;
  }, {});

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
      {({ handleSubmit, ...formikProps }) => {
        return (
          <GenericModal
            {...props}
            open={open}
            handleClose={handleClose}
            loading={loadingDependencies}
            handleConfirm={handleSubmit}
            title={`Crear ${entity}`}
            // disableOk={Object.values(formikProps.values).some(v => !v)}
            isSubmitting={formikProps.isSubmitting}
          >
            <form>
              <Grid container spacing={4}>
                {filteredColumns.map((item, i) => (
                  <FormItem
                    key={i}
                    item={item}
                    {...formikProps}
                    dependencies={dependencies}
                  />
                ))}
              </Grid>
            </form>
          </GenericModal>
        );
      }}
    </Formik>
  );
}

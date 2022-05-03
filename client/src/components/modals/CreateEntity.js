import React, { useEffect } from "react";
import GenericModal from "./GenericModal";
import Grid from "@material-ui/core/Grid";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAlertDispatch } from "../../providers/context/Alert";
import FormItem from "../master-detail/FormItem";
import useFormDependencies from "../../providers/hooks/useFormDependencies";
import { nullifyObjectEmptyStrings } from "../../utils";

const EXCLUDED_FIELDS = ["bitacora", "file", "tag", "comments"];

export default function CreateEntity({
  open,
  entity,
  columns,
  handleClose,
  handleCreate,
  staticDependencies,
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

  const handleFormSubmit = async (formValues) => {
    try {
      console.log(`formValues`, formValues);
      const values = nullifyObjectEmptyStrings(formValues);
      const result = await handleCreate(values);
      console.log(`result`, result);
      openAlert({ variant: "success", message: `${entity} creado con éxito!` });
      handleClose();
    } catch (error) {
      console.error(error);
      const message =
        error?.message || "Algo salió mal. Vuelve a intentarlo más tarde";

      openAlert({
        message,
        variant: "error",
      });
    }
  };

  const { validationSchema, initialValues } = getFormProps(filteredColumns);
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={Yup.object(validationSchema)}
    >
      {({ handleSubmit, ...formikProps }) => {
        return (
          <GenericModal
            {...props}
            open={open}
            handleClose={handleClose}
            loading={loadingDependencies}
            handleConfirm={handleSubmit}
            title={`Crear ${entity}`}
            isSubmitting={formikProps.isSubmitting}
          >
            <form>
              <Grid container spacing={4}>
                {filteredColumns.map((item, i) => (
                  <FormItem
                    key={i}
                    item={item}
                    {...formikProps}
                    dependencies={{ ...dependencies, ...staticDependencies }}
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

function getFormProps(columns) {
  const result = columns.reduce(
    (acc, col) => {
      const { name: key, form } = col;
      const { inputType, type: formType, required } = form;

      acc.initialValues[key] = "";
      if (inputType === "number") {
        acc.initialValues[key] = 0;
      }
      if (formType === "date") {
        acc.initialValues[key] = new Date();
      }
      if (formType === "input" && !inputType) {
        let validation = Yup.string();
        if (required) {
          acc.validationSchema[key] = validation.required("Campo requerido!");
        }
      }
      if (inputType === "email") {
        let validation = Yup.string().email("Correo inválido!");
        acc.initialValues[key] = "";
        acc.validationSchema[key] = validation;

        if (required) {
          acc.validationSchema[key] = validation.required("Correo requerido!");
        }
      }

      return acc;
    },
    { validationSchema: {}, initialValues: {} }
  );
  return result;
}

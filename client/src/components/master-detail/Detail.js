import React, { useCallback, useEffect, useState } from "react";
import { Prompt } from "react-router-dom";
import { Formik } from "formik";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import API from "../../api";
import Spinner from "../spinner/Spinner";
import { Button } from "@material-ui/core";
import FormItem from "./FormItem";
import useFormDependencies from "../../providers/hooks/useFormDependencies";
import { useAlertDispatch } from "../../providers/context/Alert";

export default function Detail({ columns, service, match, reloadMaster }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputsChanged, setInputsChanged] = useState([]);

  const entityId = match?.params?.id;
  const { dependencies, loadDependencies, loadingDependencies } =
    useFormDependencies(columns);
  const { openAlert } = useAlertDispatch();

  const handleFormSubmit = useCallback(
    async (values) => {
      try {
        const result = await API[service].update(entityId, values);
        console.log(`result`, result);
        reloadMaster && reloadMaster();
        openAlert({
          variant: "success",
          message: "Datos guardados exitosamente!",
        });
        setInputsChanged([]);
      } catch (error) {
        console.error(error);
        openAlert({
          variant: "error",
          message: "Oops! parece que algo salió mal",
        });
      } finally {
        setLoading(false);
      }
    },
    [entityId, service, reloadMaster, openAlert]
  );

  const init = useCallback(async () => {
    try {
      const result = await API[service].get(entityId);
      console.log(`result`, result);
      setData(result);
      await loadDependencies();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    //eslint-disable-next-line
  }, [entityId, service]);

  useEffect(() => {
    init();
    //eslint-disable-next-line
  }, []);

  const initialValues = columns.reduce((acc, col) => {
    let key = col.name;
    if (!data) return acc;
    let value = data[key];
    if (col?.form?.type === "select") {
      value = value?.id;
      console.log(`select`, value);
    }
    if (col?.form?.type === "multiselect") {
      value = (value || []).map((i) => i.id);
      console.log(`multiselect`, value);
    }

    acc[key] = value;
    return acc;
  }, {});

  console.log(`initialValues`, initialValues);
  if (loading || loadingDependencies) return <Spinner />;
  return (
    <Formik
      enableReinitialize
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      // validationSchema={contactSchema}
    >
      {({ handleSubmit, ...formProps }) => (
        <form onSubmit={handleSubmit}>
          <Prompt
            when={inputsChanged.length > 0}
            message={`Tiene cambios sin guardar, ¿Está seguro que desea salir?`}
          />
          <Paper elevation={3} component={Box} p={5}>
            <Grid container spacing={4}>
              {columns.map((item, i) => (
                <FormItem
                  key={i}
                  parent={service.toLowerCase()}
                  item={item}
                  initParent={init}
                  {...formProps}
                  dependencies={dependencies}
                  handleChange={(e) => {
                    if (e.target.value !== initialValues[item.name]) {
                      setInputsChanged([...inputsChanged, item.name]);
                    } else {
                      setInputsChanged([
                        ...inputsChanged.filter((i) => i !== item.name),
                      ]);
                    }
                    formProps.handleChange(e);
                  }}
                />
              ))}
              <Grid item md={12} container justifyContent="flex-end">
                <Button
                  type="submit"
                  color="primary"
                  variant="outlined"
                  disabled={
                    formProps.isSubmitting || inputsChanged.length === 0
                  }
                >
                  {formProps.isSubmitting ? "Guardando ..." : "Guardar"}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      )}
    </Formik>
  );
}

import React, { useCallback, useEffect, useState } from "react";
import { Prompt } from "react-router-dom";
import { Formik } from "formik";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import StarIcon from "@material-ui/icons/Star";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import API from "../../../api";
import Spinner from "../../spinner/Spinner";
import FormItem from "../../master-detail/FormItem";
import useFormDependencies from "../../../providers/hooks/useFormDependencies";
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const includedColumns = ['descripcion', 'impacto', 'publico_objetivos', 'cupon_descuentos'];

export default function Detail({ columns, service, match, reloadMaster }) {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputsChanged, setInputsChanged] = useState([]);

  const entityId = match?.params?.id;
  const { dependencies, loadDependencies, loadingDependencies } =
    useFormDependencies(columns);
  const [hExpanded, setHExpanded] = useState(false);
  const [fExpanded, setFExpanded] = useState(false);

  const handleFormSubmit = () => { };

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
    let type = col?.form?.type;

    if (type === "select") {
      value = value?.id;
    }
    if (type === "multiselect") {
      value = (value || []).map((i) => i.id);
    }

    acc[key] = value;
    return acc;
  }, {});

  if (loading || loadingDependencies) return <Spinner />;
  return (
    <Formik
      enableReinitialize
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
    // validationSchema={contactSchema}
    >
      {({ handleSubmit, ...formProps }) => (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Prompt
            when={!!inputsChanged.length}
            message={`Tiene cambios sin guardar, ¿Está seguro que desea salir?`}
          />
          <Paper elevation={3} component={Box} p={5}>
            <Box display={"flex"} alignItems={"center"}>
              <Box bgcolor={"#000"} p={1} borderRadius={100} mr={2} color={"#fff"}>
                <Typography color="inherit">
                  121
                </Typography>
              </Box>

              <Typography variant={"h4"} style={{ fontWeight: 700 }} >
                Cuentacuentos para Aguas Antafagosta
              </Typography>

              <IconButton>
                <StarIcon
                  fontSize="large"
                  style={{ width: "0.88em", color: "#ffab00" }}
                />
              </IconButton>
            </Box>

            <Box
              alignItems="center"
              bgcolor={"#ffb900"}
              color="black"
              display="flex"
              justifyContent="flex-start"
              px={10}
              mx={-4}
              mt={3}
            >
              <Typography variant="h5" component="h3" align="right">
                Highlights
              </Typography>
              <IconButton
                color={"inherit"}
                className={clsx(classes.expand, {
                  [classes.expandOpen]: hExpanded,
                })}
                onClick={() => setHExpanded(!hExpanded)}
              >
                <ExpandMoreIcon />
              </IconButton>
            </Box>

            <Collapse in={hExpanded} timeout="auto" unmountOnExit>
              <Box p={2}>
                <Grid container spacing={6}>
                  {columns.filter(x => includedColumns.includes(x.name)).map((item, i) => (
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
                </Grid>
              </Box>
            </Collapse>

            <Box
              alignItems="center"
              bgcolor={"#008d00"}
              color="#ffffff"
              display="flex"
              justifyContent="flex-start"
              px={10}
              mx={-4}
              mt={3}
            >
              <Typography variant="h5" component="h3" align="right">
                Finanzas
              </Typography>
              <IconButton
                color={"inherit"}
                className={clsx(classes.expand, {
                  [classes.expandOpen]: fExpanded,
                })}
                onClick={() => setFExpanded(!fExpanded)}
              >
                <ExpandMoreIcon />
              </IconButton>
            </Box>

            <Collapse in={fExpanded} timeout="auto" unmountOnExit>
            </Collapse>

            <Box
              alignItems="center"
              bgcolor={"#c2c2c2"}
              color="textSecondary"
              display="flex"
              justifyContent="flex-start"
              px={10}
              mx={-4}
              mt={3}
            >
              <Typography variant="h5" component="h3" align="right">
                Finanzas
              </Typography>
              <IconButton
                color={"inherit"}
                className={clsx(classes.expand, {
                  [classes.expandOpen]: fExpanded,
                })}
                onClick={() => setFExpanded(!fExpanded)}
              >
                <ExpandMoreIcon />
              </IconButton>
            </Box>

            <Box bgcolor={"#d9d9d9"} py={2} px={5} mx={-4}>
              <Grid container spacing={6}>
                {columns.filter(x => x.name === 'bitacoras').map((item, i) => (
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
              </Grid>
            </Box>
          </Paper>
        </form>
      )}
    </Formik>
  );
}

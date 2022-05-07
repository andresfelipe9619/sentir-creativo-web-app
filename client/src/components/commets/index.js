import { useState } from "react";
import { useParams } from "react-router";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import { formatDate, parseJwt } from "../../utils";
import { useAlertDispatch } from "../../providers/context/Alert";
import API from "../../api";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DialogButton from "../buttons/DialogButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

export default function Comments(props) {
  const { title = "Comentarios", data = [], parent, initParent } = props;

  const classes = useStyles();

  const [value, setValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [activeId, setActiveId] = useState(0);

  const params = useParams();
  const { openAlert } = useAlertDispatch();

  const editing = activeId > 0;

  const userId = parseJwt(API.getToken())?.id;

  const handleAddComment = async () => {
    try {
      if (editing) {
        await editComment();
        return;
      }

      if (!params.id) return;
      setLoading(true);
      const created = await API.Comentarios.create({ comentario: value, userId });
      const parentServiceName = parent[0]?.toUpperCase() + parent?.slice(1);
      const parentService = API[parentServiceName];
      await parentService.update(params.id, {
        comentarios: [...data, created],
      });

      await initParent();
    } catch (e) {
      console.error(e);
      openAlert({
        variant: "error",
        message: "Ha ocurrido un error inesperado, intentalo de nuevo!",
      });
    } finally {
      setLoading(false);
    }
  };

  const editComment = async () => {
    try {
      if (!params.id) return;

      setLoading(true);
      const updated = await API.Comentarios.update(activeId, { comentario: value, userId });
      const parentServiceName = parent[0]?.toUpperCase() + parent?.slice(1);
      const parentService = API[parentServiceName];

      const index = data.findIndex((x) => x.id === activeId);
      const comentarios = Array.from(data);
      comentarios.splice(index, 1, updated);

      await parentService.update(params.id, { comentarios });

      await initParent();
      setActiveId(0);

      openAlert({
        variant: "success",
        message: "¡Actualizado correctamente!",
      });
    } catch (e) {
      console.error(e);
      openAlert({
        variant: "error",
        message: "Ha ocurrido un error inesperado, intentalo de nuevo!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePrepareToEdit = (value = "", activeId = 0) => {
    setValue(value);
    setActiveId(activeId);
  };

  const handleDelete = async (id = 0) => {
    try {
      setLoading(true);
      await API.Comentarios.delete(id);
      await initParent();
      openAlert({
        variant: "success",
        message: "¡Borrado correctamente!",
      });
    } catch (e) {
      console.error(e);
      openAlert({
        variant: "error",
        message: "Ha ocurrido un error inesperado, intentalo de nuevo!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      {!!title && (
        <Typography component="legend" variant="h5" paragraph>
          {title}
        </Typography>
      )}

      <Grid
        container
        spacing={1}
        justifyContent="flex-end"
        style={{ marginBottom: 16 }}
      >
        <Grid item xs={12}>
          <TextField
            label="Nuevo comentario"
            multiline
            maxRows={8}
            fullWidth
            value={value}
            onChange={({ target }) => setValue(target.value)}
            disabled={loading}
            InputProps={
              loading
                ? {
                    startAdornment: (
                      <InputAdornment position="end">
                        <CircularProgress size={24} />
                      </InputAdornment>
                    ),
                  }
                : {}
            }
          />
        </Grid>

        <Grid item>
          <Button
            color="primary"
            onClick={handleAddComment}
            disabled={!value.trim().length || loading}
          >
            Guardar comentario
          </Button>

          {editing && (
            <Button
              color="primary"
              onClick={() => handlePrepareToEdit("", 0)}
              disabled={!value.trim().length || loading}
            >
              Cancelar
            </Button>
          )}
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {data?.map((x) => (
          <Grid item md={4} key={x.id}>
            <Card>
              <CardContent>
                <Typography variant="body2" component="p">
                  {x?.comentario}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {formatDate(x?.created_at, false) + " "}
                  &bull;
                  {" " +
                    new Date(x?.created_at)
                      .toLocaleTimeString("es-CL")
                      .slice(0, 5)}
                </Typography>
                <Typography variant="caption" color="primary">
                  {x?.userId?.username}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  onClick={() => handlePrepareToEdit(x?.comentario, x?.id)}
                  disabled={loading}
                >
                  <EditIcon color="textSecondary" />
                </IconButton>
                <DialogButton
                  label={<DeleteIcon />}
                  color="textSecondary"
                  disabled={loading}
                  onClose={async (accepted) =>
                    accepted && (await handleDelete(x?.id))
                  }
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

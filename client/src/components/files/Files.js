import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router";
import CreateEntity from "../modals/CreateEntity";
import useAPI from "../../providers/hooks/useAPI";
import columns from "../dashboard/archivos/columns";
import DialogButton from "../buttons/DialogButton";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import API from "../../api";

const dropzoneColumns = [
  ...columns.filter((x) => x.name !== "path"),
  {
    name: "path",
    label: "Arrastra o selecciona un archivo para agregarlo",
    form: {
      size: 12,
      type: "upload",
    },
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  button: {
    marginTop: -theme.spacing(2),
  },
}));

export default function Files({ files, title, parent, initParent }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const {
    api,
    loading,
    create: createEntity,
  } = useAPI({ service: "Archivo", initilize: false });
  const params = useParams();
  const handleCloseModal = () => setOpen(false);

  const handleOpenModal = () => setOpen(true);

  const handleCreateFiles = async (values) => {
    if (!params.id) return;
    const fileCreated = await createEntity(values);
    console.log(`fileCreated`, fileCreated);
    if (!fileCreated) return;
    const result = await api.addFiles2Entity(params.id, parent, [
      fileCreated.id,
    ]);
    console.log(`result`, result);
    await initParent();
  };

  const handleDeleteFile = async (fileId) => {
    const result = await api.delete(`${fileId}.${parent}`);

    if (!result) return;
    //TODO: Not to load everything again, only remove it from state
    await initParent();
  };

  async function handleCreateFolder() {
    await API.Proyecto.createFolder(params.id);
  }

  const useFolder = parent === "proyecto";
  return (
    <div className={classes.root}>
      {!!title && (
        <Typography component="legend" variant="h5" paragraph>
          {title}
        </Typography>
      )}
      <Tooltip title={"Crear Archivo"}>
        <IconButton
          color="primary"
          onClick={handleOpenModal}
          className={classes.button}
          variant="contained"
        >
          <Icon>add_circle</Icon>
        </IconButton>
      </Tooltip>

      {useFolder && (
        <Button
          color="primary"
          variant="contained"
          size="small"
          style={{ marginBottom: 16 }}
          onClick={handleCreateFolder}
        >
          <CreateNewFolderIcon />
          Crear carpeta
        </Button>
      )}

      <Box width="100%" display="flex" flexWrap={"wrap"}>
        {(files || []).map((f, i) => (
          <ImgMediaCard key={f.nombre + i} remove={handleDeleteFile} {...f} />
        ))}
      </Box>
      <CreateEntity
        open={open}
        entity={"Archivo"}
        handleClose={handleCloseModal}
        handleCreate={handleCreateFiles}
        loading={loading}
        columns={dropzoneColumns}
      />
    </div>
  );
}
const isImage = (path) =>
  [".png", ".jpg", ".jpeg", ".gif", ".tiff"].some((ext) => path.includes(ext));

export function ImgMediaCard({ id, nombre, path, tipo_archivo, remove }) {
  const history = useHistory();
  function handleView() {
    history.push(`/admin/archivos/${id}`);
  }
  function handleLink() {
    window.open(path, "_blank");
  }
  return (
    <Card style={{ maxWidth: 180, margin: 8 }}>
      {isImage(path) && (
        <CardMedia component="img" alt="file" height="120" image={path} />
      )}
      <CardContent>
        <Typography gutterBottom variant="subtitle1" component="div">
          {nombre}
        </Typography>
        {tipo_archivo && (
          <Typography variant="caption" color="textSecondary" component="div">
            {tipo_archivo.nombre}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleView}>
          Ver
        </Button>
        <Button size="small" color="primary" onClick={handleLink}>
          Abir Link
        </Button>
      </CardActions>
      <CardActions>
        <DialogButton
          onClose={async (accepted) => accepted && (await remove(id))}
        />
      </CardActions>
    </Card>
  );
}

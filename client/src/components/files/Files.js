import React, { useEffect, useState } from "react";
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
import {
  deleteFileFromS3,
  getFileFromS3,
  uploadFileToS3,
} from "../../utils/aws";

const BucketName = process.env.REACT_APP_BUCKET_NAME;

const PROJECT_FOLDER_ID = 36;
const INTERNAL_PROJECT = 1;

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

const isFromS3 = (path) => path.includes(`${BucketName}.s3`);

export default function Files({
  files,
  title,
  parent,
  values = {},
  initialValues = {},
  initParent,
}) {
  const classes = useStyles();
  const [signedFiles, setSignedFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const {
    api,
    loading,
    create: createEntity,
  } = useAPI({ service: "Archivo", initilize: false });
  const params = useParams();

  useEffect(() => {
    if (!files?.length) return;
    async function signFiles() {
      const promises = files.map(async (file) => {
        let path = file?.path;
        console.log("prev path", path);
        if (isFromS3(path)) {
          path = await getFileFromS3(path);
          console.log("post path", path);
        }
        return { ...file, path };
      });
      const signed = await Promise.all(promises);
      setSignedFiles(signed);
    }
    signFiles();
  }, [files]);

  const handleCloseModal = () => setOpen(false);

  const handleOpenModal = () => setOpen(true);

  const handleCreateFiles = async (values) => {
    const parentId = params.id;
    if (!parentId) return;
    if(!values.tipo_archivo) throw new Error()
    console.log("values: ", values);
    let path = values.path;
    const fromDropzone = Array.isArray(path);
    if (fromDropzone) {
      let [file] = path;
      let name = values.nombre;
      const { Location } = await uploadFileToS3({
        name,
        file,
        parentId,
        parent,
      });
      path = Location;
    }
    const fileCreated = await createEntity({ ...values, path });
    console.log(`fileCreated: `, fileCreated);
    if (!fileCreated) return;
    const result = await api.addFiles2Entity(parentId, parent, [
      fileCreated.id,
    ]);
    console.log(`addFiles2Entity result: `, result);
    await initParent();
  };

  const handleDeleteFile = async (fileId) => {
    const found = files.find((x) => x.id === fileId);
    console.log("found: ", found);
    if (!found) throw new Error("Archivo no encontrado");
    if (isFromS3(found.path)) {
      let result = await deleteFileFromS3(found.path);
      console.log("deleteFileFromS3 result: ", result);
    }
    const result = await api.delete(`${fileId}.${parent}`);

    if (!result) return;
    //TODO: Not to load everything again, only remove it from state
    await initParent();
  };

  async function handleCreateFolder() {
    await API.Proyecto.createFolder(params.id);
  }

  const { nombre, servicios, tipo_proyecto } = initialValues;
  const useFolder = parent === "proyecto" && tipo_proyecto !== INTERNAL_PROJECT;
  const missingSomething =
    useFolder && [nombre, servicios?.length].some((value) => !value);
  const alreadyCreated =
    useFolder &&
    signedFiles.some((f) => f?.tipo_archivo?.id === PROJECT_FOLDER_ID);
  const formHasChanged = Object.entries(values).some(([key, value]) => {
    if (value !== initialValues[key]) return true;
    return false;
  });
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
        <Tooltip
          title={
            formHasChanged
              ? "Hay cambios en el formulario, guarde los cambios para poder crear una carpeta"
              : missingSomething
              ? "Falta agregar nombre y/o servicios al proyecto"
              : alreadyCreated
              ? "La carpeta ya fúe creada"
              : "Crear carpeta en Google Drive"
          }
        >
          <span>
            <Button
              size="small"
              color="primary"
              variant="contained"
              style={{ marginBottom: 16 }}
              onClick={handleCreateFolder}
              startIcon={<CreateNewFolderIcon />}
              disabled={alreadyCreated || missingSomething || formHasChanged}
            >
              Crear carpeta
            </Button>
          </span>
        </Tooltip>
      )}

      <Box width="100%" display="flex" flexWrap={"wrap"}>
        {(signedFiles || []).map((f, i) => (
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

import { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useAlertDispatch } from "../../providers/context/Alert";
import Box from '@material-ui/core/Box';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200]
  },
}))(TableRow);

export default function Archivos(props) {
  const [data, setData] = useState(props?.values?.archivos || []);
  const [activeTab, setActiveTab] = useState(0);
  const { openAlert } = useAlertDispatch();

  const handleUpload = ({ target }, tipo = 0) => {

    if (!target?.files?.length) {
      return;
    }

    const file = target.files[0];
    target.value = '';
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const img = new Image();

      img.onload = () => {
        const dimensions = [img.width, img.height];
        if (tipo === 28 && (dimensions[0] < 2560 || dimensions[1] < 1706)) {
          openAlert({
            variant: "error",
            message: "Debe colocar una imagen con tamaño adecuado",
          });

          return;
        }

        const item = {
          tipo,
          dimensions,
          name: file.name,
          file,
          img,
          ajuste: false
        };

        let items = [...data];

        const indexPortada = data.findIndex(x => x.tipo === 28);
        if (tipo === 28 && indexPortada > -1) {
          items.splice(indexPortada, 1, item);
        } else {
          items = [...items, item];
        }

        const event = { target: { name: 'archivos', value: items } };
        props.handleChange(event);
        setData(items);
      };

      img.src = fileReader.result;
    }

    fileReader.readAsDataURL(file);
  }

  const handleAjustar = (index) => {
    const item = data[index];
    item.ajuste = !item.ajuste;
    const items = [...data];
    items.splice(index, 1, item);
    setData(items);
  }

  const handleDelete = (index = 0) => {
    const items = data.filter((_, i) => i !== index);
    const event = { target: { name: 'archivos', value: items } };
    props.handleChange(event);
    setData(items);
  }

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography color="primary" variant="h1" gutterBottom>
          Archivos
        </Typography>

        <Typography gutterBottom>
          Suba fotografías en la más alta calidad posible, de la experiencia artística:
        </Typography>
      </Grid>

      <Grid item md={8}>
        <Box display="flex">
          <Box
            px={2}
            py={.5}
            bgcolor={activeTab === 0 ? 'primary.main' : 'gray'}
            style={{
              color: 'white',
              cursor: 'pointer'
            }}
            onClick={() => setActiveTab(0)}>
            Fotografía de Portada
          </Box>

          <Box
            px={2}
            py={.5}
            bgcolor={activeTab === 1 ? 'primary.main' : 'gray'}
            style={{
              color: 'white',
              cursor: 'pointer'
            }}
            onClick={() => setActiveTab(1)}>
            Fotografía detalle
          </Box>
        </Box>
        {activeTab === 0 && (
          <Box bgcolor="#8080801f" p={3}>
            <Typography variant="subtitle" gutterBottom paragraph>
              Es la fotografía principal de la experiencia, se utilizará en catálogo, colecciones, en la
              confeccción del Dossier, en ventas y en campañas de difusión. Por lo tanto le
              sugerimos que sea muy representativa de su trabajo.
            </Typography>

            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="contained-button-file"
              type="file"
              onChange={(e) => handleUpload(e, 28)}
            />

            <label htmlFor="contained-button-file">
              <Button
                color="primary"
                variant="contained"
                style={{ marginTop: 16 }}
                component="span"
              >
                Subir
              </Button>
            </label>
          </Box>
        )}

        {activeTab === 1 && (
          <Box bgcolor="#8080801f" p={3}>
            <Typography variant="subtitle" gutterBottom paragraph>
              En ésta sección puedes subir fotografías relacionadas al servicio que subes, en ejecución, del público, materiales, instrumentos o de los resultados. Pueden tener un tamaño más bajo, pero intenta mantener la calidad, ya que serán también utilizadas en futuras secciones o en campañas de difusión.
            </Typography>

            <Typography variant="subtitle" gutterBottom paragraph>
              Si en la sección anterior no pudiste subir la Fotografía de Portada, porque no tienen los requerimientos ideales, tendrás que subir todo en ésta sección. Nosotros haremos lo posible para optimizar las imágenes.
            </Typography>

            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="contained-button-file"
              type="file"
              multiple
              onChange={(e) => handleUpload(e, 45)}
            />

            <label htmlFor="contained-button-file">
              <Button
                color="primary"
                variant="contained"
                style={{ marginTop: 16 }}
                component="span"
              >
                Subir
              </Button>
            </label>
          </Box>
        )}
      </Grid>

      {activeTab === 0 && (
        <Grid item md={4} style={{ alignSelf: "center" }}>
          <Typography variant="subtitle">
            <strong>Requerimientos ideales:</strong><br />
          </Typography>

          <Typography variant="subtitle">
            Tamaño: 2560px x 1706px<br />
          </Typography>

          <Typography variant="subtitle">
            Formato: Raw, CR2, jpeg.
          </Typography>
        </Grid>
      )}

      <Grid item md={12}>
        <Typography variant="h6" gutterBottom>
          Archivos cargados:
        </Typography>

        <Box style={{ maxHeight: 300, overflow: 'auto' }}>
          <Table aria-label="Table">
            <TableHead>
              <TableRow style={{ backgroundColor: '#eeeeee' }}>
                <TableCell></TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Dimensiones</TableCell>
                <TableCell style={{ color: '#a00' }}>
                  ¿Requiere ajustes?
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((x, i) => {
                const rowStyle = {
                  backgroundColor: '#80808033',
                  border: '1px solid #80808054'
                };

                return (
                  <StyledTableRow key={i}>
                    <TableCell>
                      <Box style={{ width: 50, height: 50, backgroundColor: '#dddce1', margin: '0 auto' }}>
                        <img src={x.img.src} style={{ width: 50, height: 50 }} alt="pic" />
                      </Box>
                    </TableCell>
                    <TableCell style={{ padding: 0 }}>
                      <Box bgcolor='gray' p={2} style={rowStyle}>
                        {x?.name}
                      </Box>
                    </TableCell>
                    <TableCell style={{ padding: 0 }}>
                      <Box bgcolor='gray' p={2} style={rowStyle}>
                        {x?.tipo === 28 ? 'Portada' : 'Detalle'}
                      </Box>
                    </TableCell>
                    <TableCell style={{ padding: 0 }}>
                      <Box bgcolor='gray' p={2} style={rowStyle}>
                        {x?.dimensions[0]}px x {x?.dimensions[0]}px
                      </Box>
                    </TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={<Checkbox checked={x?.ajuste} onChange={() => handleAjustar(i)} />}
                        label="Sí"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDelete(i)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                );
              })}

              {!data?.length && (
                <StyledTableRow>
                  <TableCell colSpan="99">
                    <Typography align="center" variant="h6">
                      No existen archivos
                    </Typography>
                  </TableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </Grid>

      <Grid item md={12} style={{ paddingTop: 0 }}>
        <FormControlLabel
          control={<Checkbox checked={props.values.accept1} onChange={props.handleChange} name="accept1" />}
          label="Acepto el uso de los archivos."
        />
      </Grid>
    </Grid>
  );
}

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

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200]
  },
}))(TableRow);

export default function Archivos(props) {
  const [data, setData] = useState(props?.values?.archivos || []);
  const { openAlert } = useAlertDispatch();

  const handleUpload = ({ target }) => {
    if (!target?.files?.length) {
      return;
    }

    const tipo = data.length < 1 ? 28 : 45;
    const file = target.files[0];
    target.value = '';
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const img = new Image();

      img.onload = () => {
        const dimensions = [img.width, img.height];
        if (dimensions[0] < 2560 || dimensions[1] < 1706) {
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

        console.log(item)

        const event = { target: { name: 'archivos', value: [...data, item] } };
        props.handleChange(event);
        setData([...data, item]);
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
          <Box px={2} py={.5} bgcolor="primary.main" style={{ color: 'white' }}>
            Fotografía de Portada
          </Box>
          <Box px={2} py={.5} bgcolor="gray" style={{ color: 'white' }}>
            Fotografía detalle
          </Box>
          <Box px={2} py={.5} bgcolor="#808080c2" style={{ color: 'white' }}>
            Video
          </Box>
        </Box>
        <Box bgcolor="#8080801f" p={3}>
          <Typography variant="subtitle" gutterBottom paragraph>
            Es la fotografía principal de la experiencia, se utilizará en catálogo, colecciones, en la
            confeccción del Dossier, en ventas y en campañas de difusión. Por lo tanto le
            sugerimos que sea muy representativa de su trabajo
          </Typography>

          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="contained-button-file"
            type="file"
            multiple
            onChange={handleUpload}
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
      </Grid>

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
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((x, i) => {
                const rowStyle = { backgroundColor: '#80808033', border: '1px solid #80808054' };

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
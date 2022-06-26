import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Spinner from "../spinner/Spinner";
import API from '../../api';
import * as IO5 from "react-icons/io5";
import * as GI from "react-icons/gi";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Box from '@material-ui/core/Box';
import { createTheme } from "@material-ui/core/styles";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import green from '@material-ui/core/colors/green';

export default function ActionAreas(props) {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState(props.values?.area || null);

  const tecnicas = {
    "Creaciones Cuánticas": ['Espectáculo', 'Obra de Teatro', 'Show escénico'],
    "Felicidad Organizacional": ['Autocuidado', 'Pausa activa', 'Terapias'],
    "Universidad Creativa": ['Taller artístico', 'Taller de oficio', 'Charlas y Seminarios'],
    "Galaxia Musical": ['Mi propuesta musical', 'Banda musical', 'Orquestas']
  };

  const onSelectArea = area => {
    setSelectedArea(area);
    const event = { target: { name: 'area', value: area } };
    props.handleChange(event);
  }

  useEffect(() => {
    (async () => {
      try {
        let result = await API.Area.getAll();
        result = await Promise.all(
          result.map(async (area) => {
            let icono = null;

            if (/\//.test(area.icono)) {
              let [prefix, name] = area.icono.split("/");

              if (prefix === "gi") icono = GI[name];
              if (prefix === "io5") icono = IO5[name];
            }

            const serviceResult = await API.Servicio.getAll({
              params: { area: area.id, "estado.id": 12 },
            });

            const tecnicas = new Set(
              serviceResult
                ?.reduce(
                  (acc, curr) => [...acc, ...curr.tecnica_artisticas],
                  []
                )
                ?.map((x) => x.nombre)
            );

            return {
              ...area,
              tecnicas,
              icon: icono,
            };
          })
        );
        setAreas(result);
        props.values.storagesDeeps['Area'] = result;
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item md={12}>
        <Typography color="primary" variant="h1" gutterBottom>
          La experiencia artística corresponde a:
        </Typography>

        <Typography gutterBottom>
          Elige una área, según el servicio que deseas subir al catálogo:
        </Typography>
      </Grid>

      {areas.map(x => {
        const areaTheme = createTheme({
          palette: {
            primary: { main: x.colorPrimario },
          },
        });

        const CheckIcon = selectedArea?.id === x.id ? CheckCircleIcon : CheckCircleOutlineIcon;
        const active = selectedArea?.id === x.id;

        return (
          <Grid item xs={8} md={3} key={x.id}>
            <Card>
              <CardActionArea onClick={() => onSelectArea(x)}>
                <CardContent style={{ backgroundColor: areaTheme.palette.primary.dark }}>
                  <Box display="flex" justifyContent="space-between">
                    <Box style={{ flexBasis: '80%' }}>
                      <Typography style={{ color: '#fff', lineHeight: 1, fontWeight: 700 }}>
                        Quiero subir:
                      </Typography>

                      {tecnicas[x.nombre].map(tecnica => (
                        <Typography
                          key={tecnica}
                          style={{
                            color: '#fff',
                            lineHeight: 1
                          }}>
                          {tecnica}
                        </Typography>
                      ))}
                    </Box>

                    <CheckIcon style={{ color: active ? green[500] : '#fff' }} />
                  </Box>
                </CardContent>
                <CardContent style={{ backgroundColor: areaTheme.palette.primary.main }}>
                  {x.icon && <x.icon size={"2rem"} style={{ color: '#fff' }} />}

                  {x.nombre.split(/\s/).map((text, i) => (
                    <Typography
                      key={i}
                      style={{
                        color: '#fff',
                        lineHeight: 1,
                        fontSize: i > 0 ? 22 : 18,
                        marginTop: i === 0 ? 8 : 0
                      }}>
                      <strong>{text}</strong>
                    </Typography>
                  ))}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

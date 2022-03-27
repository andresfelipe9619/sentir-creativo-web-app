import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import API from "../api";
import { useParams } from "react-router-dom";
import DossierModal from "../components/modals/DossierModal";
import Spinner from "../components/spinner/Spinner";

export default function Servicios() {
  const [selectedService, setSelectedService] = useState(null);
  const [showDossier, setShowDossier] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id: serviceId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const serviceResult = await API.Servicio.get(serviceId);
        setSelectedService(serviceResult);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [serviceId]);

  const handleCloseDossier = () => {
    setShowDossier(false);
    setSelectedService(null);
  };

  if (loading) return <Spinner />;
  if (!selectedService) return null;
  const color = selectedService.colorPrimario;

  return (
    <Grid mt={3} container justifyContent="center">
      <DossierModal
        open={!!showDossier}
        handleClose={handleCloseDossier}
        service={selectedService}
      />
      {/* <ServicioModal
        open={!!selectedId}
        handleClose={handleCloseModal}
        service={selectedService}
      /> */}
      <Grid item sm={12} md={6}>
        <Typography
          variant="h1"
          align="center"
          paragraph
          gutterBottom
          style={{ color }}
        >
          {selectedService.nombre}
        </Typography>
        <Typography paragraph gutterBottom>
          {selectedService.descripcion}
        </Typography>
      </Grid>
    </Grid>
  );
}

export const useStyles = makeStyles((theme) => ({
  title: { fontWeight: "bold" },
  root: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

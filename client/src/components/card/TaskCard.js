import React from "react";
import { formatDate } from "../../utils";
import Typography from "@material-ui/core/Typography";
import IconStar from "@material-ui/icons/Star";
import orange from "@material-ui/core/colors/orange";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";
import yellow from "@material-ui/core/colors/yellow";
import AdminCard, { DenseTable, createData } from "./AdminCard";
import BoltIcon from '@mui/icons-material/Bolt';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

export default function TaskCard({
  nombre = 'Confeccionar vestuario',
  avatar = ''
}) {
  const rows = [
    createData("Síntesis", 'Se debe crear un vestuario que permita la obra de teatro.'),
    createData("Staff", 'Andrés Espinoza'),
    createData("Dirección", 'Avda. Juan Pablo II #446'),
    createData("Bitácora", 'Probar otros colores'),
    createData("Sprint", ' Semana 3 Junio'),
  ];

  const handleViewClick = () => { }

  const getScoreColor = (score = 0) => {
    if (score === 100) {
      return green['A700']
    }

    if (score >= 70) {
      return orange[800]
    }

    if (score > 5) {
      return red[700]
    }

    return grey[700]
  };

  return (
    <AdminCard
      id={1}
      color={yellow}
      statusColor={red[500]}
      chips={['email1@gmail.com', '+569 684 9912']}
      status={'En ejecución'}
      title={nombre}
      avatar={avatar}
      handleViewClick={handleViewClick}
      subheaderChip={'Obra de teatro • Minvu • Mejillones'}
      superheader={formatDate(Date.now(), true)}
      subheader={<>
        <Typography
          display="inline"
          variant="caption"
          style={{ color: red[500], marginRight: 4 }}
        >
          Prioridad Alta
        </Typography>
        <Typography
          display="inline"
          variant="caption"
          >
          • 3 Horas • Diseñar
        </Typography>
      </>}
      floatingHeader={{
        color: '#00a3bc',
        icon: BoltIcon,
        label: "Tarea",
        score: '10%',
        scoreColor: getScoreColor(1)
      }}
      renderHighlights={() => (
        <DenseTable rows={rows} nombre={nombre} color={yellow} />
      )}
      buttonActions={[
        {
          icon: (
            <EventAvailableIcon
              fontSize="large"
              style={{ color: "#2f5bc5" }}
              onClick={() => {}}
            />
          ),
          label: "Calendario",
        },
        {
          icon: (
            <IconStar
              fontSize="large"
              style={{ color: "#ffab00" }}
              onClick={() => {}}
            />
          ),
          label: "Destacar",
        }
      ]}
    />
  );
}

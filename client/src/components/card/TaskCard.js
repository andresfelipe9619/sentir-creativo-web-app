import { useState } from "react";
import { useHistory } from "react-router-dom";
import { formatDate, getScoreColor } from "../../utils";
import Typography from "@material-ui/core/Typography";
import yellow from "@material-ui/core/colors/yellow";
import AdminCard, { DenseTable, createData } from "./AdminCard";
import BoltIcon from '@mui/icons-material/Bolt';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import API from "../../api";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import StarIcon from "@material-ui/icons/Star";
import { useAlertDispatch } from "../../providers/context/Alert";
import { FileTypes, DEFAULT_AVATAR } from "../../providers/globals";

export default function TaskCard(props) {
  const {
    id,
    nombre,
    estado_tarea,
    stafs = [],
    sprint,
    fechaInicio,
    prioridad,
    duracion,
    tipo_tarea,
    proyecto,
    avance,
    sintesis,
    direccion,
    bitacoras = []
  } = props;

  const [destacado, setDestacado] = useState(props.destacado);
  const history = useHistory();
  const { openAlert } = useAlertDispatch();

  const rows = [
    createData("Síntesis", sintesis),
    createData("Staff", stafs.length && stafs?.map(x => x.nombre)),
    createData("Dirección", direccion),
    createData("Bitácora", bitacoras.length && bitacoras?.map(x => x.accion)),
    createData("Sprint", sprint?.nombre)
  ];

  const IconStar = destacado ? StarIcon : StarOutlineIcon;
  const archivoAvatar = stafs.length ? stafs[0]?.archivos.filter((a) => a.tipo_archivo === FileTypes["AVATAR"]) : [];
  const avatar =
    archivoAvatar.length
      ? archivoAvatar[0].path
      : DEFAULT_AVATAR;

  const handleClick = () => {
    history.push(`/admin/tareas/${id}`);
  };

  const handleStared = async () => {
    try {
      setDestacado(!destacado);
      await API.Tarea.update(id, { destacado: !destacado });
    } catch {
      setDestacado(!destacado);

      openAlert({
        variant: "error",
        message: "Ha ocurrido un error inesperado, intentalo de nuevo!",
      });
    }
  };

  return (
    <AdminCard
      id={id}
      color={yellow}
      statusColor={estado_tarea?.color}
      chips={[stafs[0]?.email, stafs[0]?.celular]}
      status={estado_tarea?.nombre}
      title={nombre}
      avatar={avatar}
      handleViewClick={handleClick}
      subheaderChip={`${proyecto?.nombre} • ${proyecto?.audiencia?.organizacion?.nombre} • ${proyecto?.ciudad?.nombre}`}
      superheader={formatDate(new Date(fechaInicio), true)}
      subheader={<>
        <Typography
          display="inline"
          variant="caption"
          style={{ color: prioridad?.color, marginRight: 4 }}
        >
          {prioridad?.nombre}
        </Typography>
        <Typography
          display="inline"
          variant="caption"
        >
          • {duracion} Horas • {tipo_tarea?.nombre}
        </Typography>
      </>}
      floatingHeader={{
        color: '#00a3bc',
        icon: BoltIcon,
        label: "Tarea",
        score: avance + '%',
        scoreColor: getScoreColor(avance)
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
              onClick={() => { }}
            />
          ),
          label: "Calendario",
        },
        {
          icon: (
            <IconStar
              fontSize="large"
              style={{ color: "#ffab00" }}
              onClick={() => handleStared()}
            />
          ),
          label: "Destacar",
        },
      ]}
    />
  );
}

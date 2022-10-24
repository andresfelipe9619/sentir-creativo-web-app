import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function AudienciaTable({ data = [], title = "Audiencias" }) {
  return (
    <Table aria-label={title + " Table"}>
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>Nombre</TableCell>
          <TableCell>Estado</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Estado Proyecto</TableCell>
          <TableCell>Organizacion</TableCell>
          <TableCell>Rubro</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data?.map((x) => (
          <StyledTableRow key={x.id}>
            <TableCell>{x.id}</TableCell>
            <TableCell>{x?.nombre} {x?.apellido}</TableCell>
            <TableCell>{x?.estado?.nombre || 'Sin asignar'}</TableCell>
            <TableCell>{x?.email}</TableCell>
            <TableCell>{x?.proyectos?.reverse()[0]?.estado_proyecto?.nombre || 'Sin asignar'}</TableCell>
            <TableCell>{x?.organizacion?.nombre || 'Sin asignar'}</TableCell>
            <TableCell>{x?.organizacion?.rubro?.nombre || 'Sin asignar'}</TableCell>
          </StyledTableRow>
        ))}

        {!data?.length && (
          <StyledTableRow>
            <TableCell colSpan="99">
              <Typography align="center" variant="h6">
                No existen {title.toLowerCase()}
              </Typography>
            </TableCell>
          </StyledTableRow>
        )}
      </TableBody>
    </Table>
  );
}

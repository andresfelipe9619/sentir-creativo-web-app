import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import { formatDate } from "../../utils";

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  chip: {
    background: theme.palette.grey[700],
    color: theme.palette.background.default,
  },
}));

export default function BitacoraTable({ data = [], title = "Bitácoras" }) {
  const classes = useStyles();

  return (
    <Table aria-label={title + " Table"}>
      <TableHead>
        <TableRow>
          <TableCell>Fecha</TableCell>
          <TableCell>Acción</TableCell>
          <TableCell>Vía</TableCell>
          <TableCell>Relación</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data?.map((x) => (
          // TODO: Check item props, these are not the finals props
          <StyledTableRow key={x.id}>
            <TableCell>
              <Chip
                label={formatDate(x.fecha, false)}
                className={classes.chip}
              />
            </TableCell>
            <TableCell>{x.accion}</TableCell>
            <TableCell>{x.via}</TableCell>
            <TableCell>{x.realcion}</TableCell>
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

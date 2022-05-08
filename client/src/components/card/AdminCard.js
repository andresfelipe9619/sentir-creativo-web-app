import React, { memo, useState } from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Avatar from "@mui/material/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import { Chip, Tooltip } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import useStyles from "./styles";
import { grey } from "@material-ui/core/colors";
import CopyClipboard from "../clipboard";

function AdminCard({
  id,
  chips,
  color,
  status,
  title,
  avatar,
  statusColor,
  superheader,
  subheader,
  subheaderChip,
  buttonActions,
  floatingHeader,
  handleViewClick,
  renderContent,
  renderHighlights,
}) {
  const classes = useStyles(floatingHeader);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const cardColor = color[500];

  const text = (
    <Box display="flex" flexDirection="column">
      <Typography variant="caption" gutterBottom>
        {superheader}
      </Typography>
      <Typography variant="h3">{title}</Typography>
    </Box>
  );
  return (
    <Card className={classes.root} elevation={2}>
      {floatingHeader && (
        <FloatingHeader {...floatingHeader} classes={classes} />
      )}
      <FloatingID id={id} />
      <CardHeader
        component={Box}
        title={text}
        avatar={
          <Avatar alt={title} src={avatar} sx={{ width: 60, height: 60 }} />
        }
        classes={{ content: classes.ellipsedHeader }}
        subheader={
          <Box display="flex" flexDirection="column">
            <Typography variant="caption" gutterBottom>
              {subheader}
            </Typography>
            {subheaderChip && <Chip label={subheaderChip} />}
          </Box>
        }
      />

      <CardContent classes={{ root: classes.content }}>
        {status && (
          <Box
            alignItems="center"
            color="white"
            display="flex"
            textAlign="center"
            style={{ backgroundColor: statusColor || "LightCoral" }}
            justifyContent="center"
            p={1}
          >
            <Typography variant="h5" component="h3" align="center">
              {status}
            </Typography>
          </Box>
        )}
        <Box
          alignItems="center"
          display="flex"
          justifyContent="center"
          px={2}
          py={1}
        >
          {renderContent && renderContent()}
        </Box>
        <Box
          alignItems="center"
          bgcolor={cardColor}
          color="black"
          display="flex"
          justifyContent="center"
          px={4}
        >
          <Typography variant="h5" component="h3" align="right">
            Highlights
          </Typography>
          <IconButton
            color={"inherit"}
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {renderHighlights && renderHighlights()}
          {Array.isArray(chips) && (
            <Box px={4} style={{ overflow: "auto", whiteSpace: "nowrap" }}>
              {(chips || [])
                .filter((n) => !!n)
                .map((c) => (
                  <CopyClipboard>
                    {({ copy }) => (
                      <Chip
                        key={c}
                        label={c}
                        style={{ backgroundColor: color[300], marginRight: 8 }}
                        onClick={() => copy(c)}
                      />
                    )}
                  </CopyClipboard>
                ))}
            </Box>
          )}
        </Collapse>
      </CardContent>

      <CardActions>
        <Box display="flex" width="100%" mt={1} p={1}>
          <Button
            size="small"
            color={"primary"}
            variant="outlined"
            onClick={handleViewClick}
            style={{ marginRight: "auto" }}
          >
            VER & EDITAR
          </Button>
          {(buttonActions || []).map((b, i) => (
            <Tooltip title={b.label} key={b.label}>
              <IconButton
                size="small"
                href={b.url || null}
                disabled={b.disabled || false}
                color={"primary"}
                variant="contained"
                onClick={b.handleClick}
                style={{ marginRight: i === buttonActions.length - 1 ? 0 : 16 }}
              >
                {b.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </CardActions>
    </Card>
  );
}

const idStyle = {
  float: "right",
  color: "#fff",
};

const FloatingID = memo(function FloatingID({ id }) {
  return (
    <Box
      display="flex"
      borderRadius="50%"
      width={30}
      height={30}
      p={2}
      mr={2}
      justifyContent="center"
      alignItems="center"
      bgcolor={grey[600]}
      style={idStyle}
    >
      {id}
    </Box>
  );
});

const headerStyle = {
  height: 16,
  top: -10,
  position: "relative",
  left: 10,
  zIndex: 1000,
};

const FloatingHeader = memo(function FloatingHeader({
  icon: Icon,
  label,
  score,
  classes,
  color,
  scoreColor = grey[700]
}) {
  return (
    <Box display="flex" style={headerStyle} alignItems="center">
      {Icon && (
        <Box
          display="flex"
          borderRadius="50%"
          width={45}
          height={45}
          p={2}
          mx={2}
          justifyContent="center"
          alignItems="center"
          className={classes.floatingIcon}
        >
          <Icon style={{ color }} />
        </Box>
      )}
      {label && (
        <Chip
          label={label}
          style={{
            backgroundColor: color,
            color: "white",
            marginRight: 8,
          }}
        />
      )}
      <Chip
        label={score}
        style={{ backgroundColor: scoreColor, color: "white" }}
      />
    </Box>
  );
});

export const Stat = memo(function Stat({ label, value, color }) {
  return (
    <Grid
      item
      xs={4}
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography align="center" variant="caption" style={{ lineHeight: 1.3 }}>
        {label}
      </Typography>
      <Box
        my={1}
        display="flex"
        borderRadius="50%"
        color="white"
        width={50}
        height={50}
        justifyContent="center"
        alignItems="center"
        bgcolor={color}
      >
        {value}
      </Box>
    </Grid>
  );
});

export const StyledTableRow = withStyles(() => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: (props) => props.color,
    },
  },
}))(TableRow);

export const DenseTable = memo(function DenseTable({ nombre, rows, color }) {
  return (
    <Box p={1} my={2}>
      <TableContainer>
        <Table aria-label={`${nombre} highlights`} size="small">
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.label} color={color[50]}>
                <TableCell component="th" scope="row">
                  {row.label}
                </TableCell>
                <TableCell align="right">{row.value || "N/A"}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
});

export function createData(label, value) {
  return { label, value };
}

export default memo(AdminCard);

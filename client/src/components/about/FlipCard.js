import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import clsx from "clsx";

const COLORS = {
  purple: "#b522b4",
  blue: "#3b53b3",
  text: "#4f4f4f",
  bg: "#ffeb12",
  orange: "#ff6c00",
};

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    width: "20rem",
    height: "25rem",
    margin: "auto",
    boxShadow: "none",
    overflow: "visible",
    cursor: "pointer"
  },
  content: {
    position: "relative",
    width: "100%",
    height: "100%",
    textAlign: "center",
    transition: "transform 1s",
    transformStyle: "preserve-3d",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: theme.spacing(1),
      zIndex: 1,
      borderRadius: theme.spacing(1),
      border: "1px solid " + theme.palette.common.white,
    },
  },
  rotate: {
    transform: "rotateY(180deg)",
  },
  sides: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    top: 0,
    left: 0,
    padding: "2rem",
    color: "white",
    boxShadow: "0 8px 8px 0 rgb(0 0 0 / 25%)",
    borderRadius: "12px",
  },
  back: {
    transform: "rotateY(180deg)",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: "1rem 2rem",
  },
  backIcon: {
    width: "2rem",
    height: "2rem",
  },
  backIconTop: {
    margin: "0 auto auto 0",
  },
  backIconBottom: {
    margin: "auto 0 0 auto",
    transform: "rotate(180deg)",
  },
  chips: {
    color: "white",
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontSize: 12,
  },
  contentIcon: {
    color: "white",
    width: "7rem",
    height: "7rem",
    marginBottom: theme.spacing(3),
  },
}));

export default function FlipCard({
  chips = ["Técnicas artísticas"],
  color = COLORS.blue,
  title,
  detail,
  icon: Icon,
  background,
  style,
}) {
  const classes = useStyles();
  const [rotate, setRotate] = useState(false);

  return (
    <Card
      className={classes.root}
      style={style}
      onClick={() => setRotate(!rotate)}
    >
      <CardContent className={clsx(classes.content, rotate && classes.rotate)}>
        <Box
          className={clsx(classes.sides)}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          style={{ background }}
        >
          <Icon className={classes.contentIcon} />

          <Typography align='center' gutterBottom style={{ fontSize: 36, lineHeight: 1, fontWeight: 700 }}>
            {title}
          </Typography>

          <Typography align='center' style={{ fontSize: 18, fontWeight: 500, fontStyle: 'italic'}}>
            {detail}
          </Typography>
        </Box>

        <Box className={clsx(classes.sides, classes.back)}>
          <Icon
            color={color}
            className={clsx(classes.backIcon, classes.backIconTop)}
          />

          <Box display="flex" flexWrap="wrap" justifyContent="center">
            {chips.map((x) => (
              <Chip
                key={"key_" + x}
                label={x}
                style={{ background: color }}
                size="small"
                className={classes.chips}
              />
            ))}
          </Box>

          <Icon
            color={color}
            className={clsx(classes.backIcon, classes.backIconBottom)}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

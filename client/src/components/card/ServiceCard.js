import React, { memo, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import {
  useTheme,
  createTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
// import StarIcon from '@material-ui/icons/Star'
import clsx from "clsx";
import * as IO5 from "react-icons/io5";
import * as GI from "react-icons/gi";
import { getFileFromS3 } from "../../utils/aws";

const BucketName = process.env.REACT_APP_BUCKET_NAME;

const isFromS3 = (path) => path?.includes(`${BucketName}.s3`);

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 1),
    overflow: "visible",
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(4, 0),
    },
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(4, 1),
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    paddingTop: 6,
    paddingBottom: 6,
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  content: {
    padding: 0,
    width: "100%",
  },
  avatar: {
    display: "flex",
    alignItems: "center",
    borderRadius: "50%",
    color: "white",
  },
  tags: {
    marginTop: theme.spacing(0.25),
    marginBottom: 0,
    lineHeight: "1.15",
    fontWeight: 400,
    color: "#424242",
  },
  header: {
    paddingTop: 8,
    paddingBottom: 8,
  },
}));

function ServiceCard({
  color,
  service,
  imageTitle,
  handleClick,
  handleClickPrimary,
  handleClickSecundary,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  const {
    area,
    tags,
    sintesis,
    archivos,
    ocasions,
    nombre: title,
    tecnica_artisticas,
  } = service;

  const [imageUrl, setImageUrl] = React.useState((archivos || [])[0]?.path);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    async function signFiles() {
      if (isFromS3(imageUrl)) {
        const path = await getFileFromS3(imageUrl);
        setImageUrl(path);
      }
    }
    signFiles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardColor = color || theme.palette.primary.main;
  const areaTheme = createTheme({
    ...theme,
    palette: {
      primary: { main: cardColor },
    },
  });

  const [prefix, name] = (area?.icono || "").split("/");
  let Icon = null;

  if (prefix === "gi") Icon = GI[name];
  if (prefix === "io5") Icon = IO5[name];

  return (
    <ThemeProvider theme={areaTheme}>
      <Card className={classes.root} elevation={5}>
        <FloatingHeader icon={Icon} color={cardColor} />
        <CardHeader
          className={classes.header}
          component={Box}
          title={
            <Typography
              variant="h3"
              style={{
                fontStyle: "italic",
                fontWeight: areaTheme.typography.fontWeightBold,
                color: areaTheme.palette.common.black,
              }}
            >
              {title}
            </Typography>
          }
          // action={
          //   <IconButton aria-label='favoritos'>
          //     <StarIcon fontSize='large' style={{ color: '#ffab00' }} />
          //   </IconButton>
          // }
          subheader={
            <Typography
              variant="caption"
              color="textSecondary"
              paragraph
              className={classes.tags}
            >
              {tags
                .slice(0, 3)
                .map((t) => t.nombre)
                .join(" • ")}
            </Typography>
          }
        />
        <CardActionArea onClick={handleClick}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
            justifyContent="flex-end"
            style={{
              bottom: 5,
              position: "absolute",
              right: 10,
              zIndex: 0,
            }}
          >
            {tecnica_artisticas.slice(0, 4).map((t, i) => (
              <Box
                key={i}
                bgcolor="primary.dark"
                color="white"
                py={0.2}
                px={0.5}
                m={0.25}
                width="fit-content"
              >
                <Typography variant="caption" style={{ fontWeight: "bold" }}>
                  {t?.nombre || ""}
                </Typography>
              </Box>
            ))}
          </Box>
          <CardMedia
            className={classes.media}
            image={imageUrl}
            title={imageTitle || ""}
          />
        </CardActionArea>
        <CardContent classes={{ root: classes.content }}>
          <Box
            display="flex"
            px={4}
            justifyContent="center"
            alignItems="center"
            color="white"
            bgcolor="primary.dark"
          >
            <Typography variant="h6" component="h6" align="right">
              Síntesis
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
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              p={0}
            >
              <Box pt={0} pb={2} px={4} color="white" bgcolor="primary.dark">
                <Typography variant="body2">{sintesis}</Typography>
              </Box>
              <Box py={2} px={4} color="white" bgcolor="primary.main">
                <Typography variant="h6">Ideal para:</Typography>
                {ocasions.map((x) => x.nombre).join(" • ")}
              </Box>
            </Box>
          </Collapse>
        </CardContent>
        <CardActions classes={{ root: classes.buttons }}>
          <Button
            size="small"
            color={"primary"}
            variant="outlined"
            onClick={handleClickSecundary}
          >
            Solicitar dossier
          </Button>
          <Button
            size="small"
            color={"primary"}
            style={{ backgroundColor: areaTheme.palette.primary.dark }}
            variant="contained"
            onClick={handleClickPrimary}
          >
            Cotizar
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}

const headerStyle = {
  height: 20,
  top: -10,
  position: "relative",
  left: 10,
  zIndex: 1000,
};

function FloatingHeader({ icon: Icon, color }) {
  return (
    <Box display="flex" style={headerStyle} alignItems="center">
      {Icon && (
        <Box
          display="flex"
          borderRadius="50%"
          p={1.5}
          mx={2}
          style={{ background: color }}
          justifyContent="center"
          alignItems="center"
        >
          <Icon style={{ color: "white" }} size="1.5em" />
        </Box>
      )}
    </Box>
  );
}

export default memo(ServiceCard);

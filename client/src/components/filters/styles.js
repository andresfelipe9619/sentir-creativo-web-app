import { alpha, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: { fontWeight: "bold", fontSize: "24rm" },
  slogan: { fontSize: "24em" },
  toolbar: { background: "#F5F5F5", zIndex: 1 },
  accordion: {
    color: "white",
    background: theme.palette.primary.dark,
    borderTop: [[1, "solid", "white"]],
    borderBottom: [[1, "solid", "white"]],
  },
  accordionDetails: {
    padding: 2,
    fontSize: 12,
  },
  root: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    "&:hover": {
      backgroundColor: alpha(theme.palette.background.paper, 1),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  chips: {
    padding: 4,
    width: "80%",
    overflow: "auto",
    whiteSpace: "nowrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  paginationRoot: {
    display: "flex",
    width: "100%",
    backgroundColor: theme.palette.primary.dark,
    justifyContent: "flex-end",
    padding: theme.spacing(0, 4),
  },
  paginationUL: {
    padding: 4,
    color: theme.palette.background.paper,
    "& > li": {
      backgroundColor: theme.palette.primary.dark,
    },
    "& > li > button": {
      fontWeight: "bold",
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.background.paper,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.paper,
      },
    },
    "& > li > button.Mui-selected": {
      opacity: 0.8,
      backgroundColor: theme.palette.background.paper,
      "&:hover": {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.primary.dark,
      },
    },
  },
}));

export default useStyles;

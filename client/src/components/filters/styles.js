import { alpha, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: { fontWeight: "bold", fontSize: "24rm" },
  slogan: { fontSize: "24em" },
  toolbar: { background: "#F5F5F5", zIndex: 1 },
  accordion: {
    color: "white",
    background: theme.palette.primary.main,
    borderTop: [[1, "solid", "white"]],
    borderBottom: [[1, "solid", "white"]],
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
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  pagination: {
    padding: 4,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default useStyles;

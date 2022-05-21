import { lazy } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import BarChartIcon from "@material-ui/icons/BarChart";
import ArchiveIcon from "@material-ui/icons/Archive";
import LabelIcon from "@material-ui/icons/Label";
import BusinessIcon from "@material-ui/icons/Business";
import HailIcon from "@mui/icons-material/Hail";
import WorkIcon from "@mui/icons-material/Work";
import SurfingIcon from "@mui/icons-material/Surfing";
import BoltIcon from "@mui/icons-material/Bolt";

const Home = lazy(() => import(/* webpackChunkName: "home" */ "../pages/Home"));
const Areas = lazy(() =>
  import(/* webpackChunkName: "areas" */ "../pages/Areas")
);
const Servicios = lazy(() =>
  import(/* webpackChunkName: "servicios" */ "../pages/Servicios")
);
const About = lazy(() =>
  import(/* webpackChunkName: "about" */ "../pages/About")
);
const Contact = lazy(() =>
  import(/* webpackChunkName: "contact" */ "../pages/Contact")
);
const Blog = lazy(() => import(/* webpackChunkName: "blog" */ "../pages/Blog"));
const Dashboard = lazy(() =>
  import(/* webpackChunkName: "dashboard" */ "../pages/Dashboard")
);
const Login = lazy(() =>
  import(/* webpackChunkName: "login" */ "../pages/Login")
);
const Register = lazy(() =>
  import(/* webpackChunkName: "register" */ "../pages/Register")
);

export const DashboardRoutes = [
  { path: "/admin/audiencia", name: "Audiencia", icon: HailIcon },
  {
    path: "/admin/organizaciones",
    name: "Organizaciones",
    icon: BusinessIcon,
  },
  { path: "/admin/servicios", name: "Servicios", icon: ShoppingCartIcon },
  { path: "/admin/proyectos", name: "Proyectos", icon: WorkIcon },
  { path: "/admin/archivos", name: "Archivos", icon: ArchiveIcon },
  { path: "/admin/tags", name: "Tags", icon: LabelIcon },
  { path: "/admin/staff", name: "Staff", icon: SurfingIcon },
  { path: "/admin/colecciones", name: "Colecciones", icon: LabelIcon },
  { path: "/admin/reportes", name: "Reportes", icon: BarChartIcon },
  { path: "/admin/tareas", name: "Tareas", icon: BoltIcon },
];

const RouterConfig = [
  {
    path: "/",
    component: Home,
    name: "Home",
    exact: true,
    strict: true,
  },
  {
    path: "/creaciones",
    component: Areas,
    name: "Areas",
    exact: true,
    strict: true,
  },
  {
    path: "/felicidad",
    component: Areas,
    name: "Areas",
    exact: true,
    strict: true,
  },
  {
    path: "/universidad",
    component: Areas,
    name: "Areas",
    exact: true,
    strict: true,
  },
  {
    path: "/galaxia",
    component: Areas,
    name: "Areas",
    exact: true,
    strict: true,
  },
  {
    path: "/servicios/:id",
    component: Servicios,
    name: "Servicios",
    exact: true,
    strict: true,
  },
  {
    path: "/somos",
    component: About,
    name: "About",
    exact: true,
    strict: true,
  },
  {
    path: "/contact",
    component: Contact,
    name: "Contact",
    exact: true,
    strict: true,
  },
  {
    path: "/blog",
    component: Blog,
    name: "Blog",
    exact: true,
    strict: true,
  },
  {
    path: "/login",
    name: "Inicio",
    component: Login,
  },
  {
    path: "/register",
    name: "Registro",
    component: Register,
  },
  {
    path: "/admin",
    name: "Admin",
    private: true,
    component: Dashboard,
    routes: DashboardRoutes,
  },
];

export default RouterConfig;

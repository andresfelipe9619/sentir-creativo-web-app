import { lazy } from 'react'
const Home = lazy(() => import(/* webpackChunkName: "home" */ '../pages/Home'))
const Areas = lazy(() =>
  import(/* webpackChunkName: "areas" */ '../pages/Areas')
)
const About = lazy(() =>
  import(/* webpackChunkName: "about" */ '../pages/About')
)
const Contact = lazy(() =>
  import(/* webpackChunkName: "contact" */ '../pages/Contact')
)
const Blog = lazy(() => import(/* webpackChunkName: "blog" */ '../pages/Blog'))
const Dashboard = lazy(() =>
  import(/* webpackChunkName: "dashboard" */ '../pages/Dashboard')
)
const Login = lazy(() =>
  import(/* webpackChunkName: "login" */ '../pages/Login')
)
const Register = lazy(() =>
  import(/* webpackChunkName: "register" */ '../pages/Register')
)

const routerConfig = [
  {
    path: '/',
    component: Home,
    name: 'Home',
    exact: true,
    strict: true
  },
  {
    path: '/areas/:id',
    component: Areas,
    name: 'Areas',
    exact: true,
    strict: true
  },
  {
    path: '/about',
    component: About,
    name: 'About',
    exact: true,
    strict: true
  },
  {
    path: '/contact',
    component: Contact,
    name: 'Contact',
    exact: true,
    strict: true
  },
  {
    path: '/blog',
    component: Blog,
    name: 'Blog',
    exact: true,
    strict: true
  },
  {
    path: '/login',
    name: 'Inicio',
    component: Login
  },
  {
    path: '/register',
    name: 'Registro',
    component: Register
  },
  {
    path: '/admin',
    name: 'Admin',
    private: true,
    component: Dashboard,
    routes: [
      {
        path: '/admin/audiencia',
        name: 'Audiencia'
      },
      {
        path: '/admin/servicios',
        name: 'Servicios'
      },
      {
        path: '/admin/proyectos',
        name: 'Proyectos'
      },
      {
        path: '/admin/tags',
        name: 'Tags'
      },
      {
        path: '/admin/archivos',
        name: 'Archivos'
      }
    ]
  }
]

export default routerConfig

import { lazy } from "react";
const Home = lazy(() => import(/* webpackChunkName: "home" */ "../pages/Home"));
const About = lazy(() =>
  import(/* webpackChunkName: "about" */ "../pages/About")
);
const Contact = lazy(() =>
  import(/* webpackChunkName: "contact" */ "../pages/Contact")
);
const Blog = lazy(() => import(/* webpackChunkName: "blog" */ "../pages/Blog"));

const routerConfig = [
  {
    path: "/",
    component: Home,
    name: "Home",
    exact: true,
    strict: true,
  },
  {
    path: "/about",
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
  // {
  //   path: "/risks",
  //   component: Risks,
  //   name: "Risks",
  //   routes: [
  //     {
  //       path: "/risks/:id",
  //       name: "Risks Id",
  //     },
  //   ],
  // },
];

export default routerConfig;

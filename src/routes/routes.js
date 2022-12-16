import login from "pages/login";
import register from "pages/register";
import home from "pages/home";
import dashboard from "pages/dashboard";

const routes = [
  {
    title: "login",
    path: "login",
    element: login,
    isPrivate: false,
    childes: [],
  },
  {
    title: "register",
    path: "register",
    element: register,
    isPrivate: false,
    childes: [],
  },
  {
    title: "home",
    path: "/",
    element: home,
    isPrivate: false,
    childes: [],
  },
  {
    title: "dashboard",
    path: "/dashboard",
    element: home,
    isPrivate: false,
    childes: [],
  },
];

export default routes;

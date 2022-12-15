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
  },
  {
    title: "register",
    path: "register",
    element: register,
    isPrivate: false,
  },
  {
    title: "home",
    path: "/",
    element: home,
    isPrivate: false,
    childes: [
      {
        title: "dashboard",
        path: "dashboard",
        element: dashboard,
        isPrivate: true,
      },
    ],
  },
];

export default routes;

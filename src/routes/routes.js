import login from "pages/login";
import register from "pages/register";
import home from "pages/home";
import dashboard from "pages/dashboard";
import membership from "pages/membership";
import payments from "pages/payments";
import loans from "pages/loans";
import guarantees from "pages/guarantees";
import userInfo from "pages/userInfo";

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
    element: dashboard,
    isPrivate: false,
    childes: [],
  },
  {
    title: "membership",
    path: "/membership",
    element: membership,
    isPrivate: false,
    childes: [],
  },
  {
    title: "payments",
    path: "/payments",
    element: payments,
    isPrivate: false,
    childes: [],
  },
  {
    title: "loans",
    path: "/loans",
    element: loans,
    isPrivate: false,
    childes: [],
  },
  {
    title: "guarantees",
    path: "/guarantees",
    element: guarantees,
    isPrivate: false,
    childes: [],
  },
  ,
  {
    title: "userInfo",
    path: "/userInfo",
    element: userInfo,
    isPrivate: false,
    childes: [],
  }
];

export default routes;

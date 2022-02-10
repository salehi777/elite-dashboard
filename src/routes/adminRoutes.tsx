import React from "react";

import Dashboard from "views/Dashboard";
import Projects from "views/Projects";

import { IRoute } from "./RoutesHandler";

const routes: IRoute[] = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/projects/archive",
    component: Projects,
  },
  {
    path: "/projects/draft",
    component: Projects,
  },
  {
    path: "/tasks",
    component: Dashboard,
  },
  {
    path: "/tasks/:id",
    component: Dashboard,
  },
];

export default routes;

import Dashboard from "views/Dashboard";
import Invoice from "views/Invoice";

import { IRoute } from "./RoutesHandler";

const routes: IRoute[] = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/analytics",
    component: Dashboard,
  },
  {
    path: "/invoice",
    component: Invoice,
  },
  {
    path: "/schedule",
    component: Dashboard,
  },
  {
    path: "/calendar",
    component: Dashboard,
  },
  {
    path: "/messages",
    component: Dashboard,
  },
  {
    path: "/notification",
    component: Dashboard,
  },
  {
    path: "/settings",
    component: Dashboard,
  },
];

export default routes;

import Dashboard from "views/Dashboard";
import Analytics from "views/Analytics";
import Invoice from "views/Invoice";
import AddInvoice from "views/Invoice/AddInvoice";
import EditInvoice from "views/Invoice/EditInvoice";

import { IRoute } from "./RoutesHandler";

const routes: IRoute[] = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/analytics",
    component: Analytics,
  },
  {
    path: "/invoice",
    component: Invoice,
  },
  {
    path: "/invoice/add",
    component: AddInvoice,
  },
  {
    path: "/invoice/edit/:_id",
    component: EditInvoice,
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

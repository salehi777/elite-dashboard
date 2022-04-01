import Dashboard from "views/Dashboard";
import Analytics from "views/Analytics";
import Invoice from "views/Invoice";
import AddInvoice from "views/Invoice/AddInvoice";
import EditInvoice from "views/Invoice/EditInvoice";
import NotImplemented from "views/NotImplemented";

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
    component: NotImplemented,
  },
  {
    path: "/calendar",
    component: NotImplemented,
  },
  {
    path: "/messages",
    component: NotImplemented,
  },
  {
    path: "/notification",
    component: NotImplemented,
  },
  {
    path: "/settings",
    component: NotImplemented,
  },
];

export default routes;

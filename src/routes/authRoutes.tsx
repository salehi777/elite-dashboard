import Login from "views/Auth/Login";
import Signup from "views/Auth/Signup";

import { IRoute } from "./RoutesHandler";

const routes: IRoute[] = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/signup",
    component: Signup,
  },
];

export default routes;

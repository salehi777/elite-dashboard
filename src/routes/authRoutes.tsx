import Login from "views/Auth/Login";
import Recovery from "views/Auth/Recovery";
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
  {
    path: "/recovery",
    component: Recovery,
  },
];

export default routes;

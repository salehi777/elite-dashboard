import React from "react";
import {
  AttachmentIcon,
  ChatIcon,
  AtSignIcon,
  CalendarIcon,
  BellIcon,
  EmailIcon,
  SettingsIcon,
  QuestionIcon,
} from "@chakra-ui/icons";

import Dashboard from "views/Dashboard";
import Projects from "views/Projects";

import { IRoute } from "./RoutesHandler";

const routes: IRoute[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <AttachmentIcon />,
    component: Dashboard,
    inMainMenu: true,
  },
  {
    path: "/projects",
    name: "Projects",
    icon: <ChatIcon />,
    inMainMenu: true,
    menuSubRoutes: [
      {
        path: "/projects/archive",
        name: "Archive",
        icon: <AtSignIcon />,
        component: Projects,
      },
      {
        path: "/projects/draft",
        name: "Draft",
        icon: <CalendarIcon />,
        component: Projects,
      },
    ],
  },
  {
    path: "/tasks",
    name: "Tasks",
    icon: <BellIcon />,
    component: Dashboard,
    inMainMenu: true,
  },
];

export default routes;

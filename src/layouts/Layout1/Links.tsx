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

export interface ILink {
  href: string;
  title: string;
  icon: React.ReactNode;
  subLinks?: ILink[];
}

const links: ILink[] = [
  {
    href: "/dashboard",
    title: "Dashboard",
    icon: <AttachmentIcon />,
  },
  {
    href: "",
    title: "Projects",
    icon: <ChatIcon />,
    subLinks: [
      {
        href: "/projects/archive",
        title: "Archive",
        icon: <AtSignIcon />,
      },
      {
        href: "/projects/draft",
        title: "Draft",
        icon: <CalendarIcon />,
      },
    ],
  },
  {
    href: "/tasks",
    title: "Tasks",
    icon: <BellIcon />,
  },
];

export default links;

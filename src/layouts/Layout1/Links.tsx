import { ReactComponent as CategoryIcon } from "assets/icons/Category.svg";
import { ReactComponent as ChartIcon } from "assets/icons/Chart.svg";
import { ReactComponent as TicketIcon } from "assets/icons/Ticket.svg";
import { ReactComponent as DocumentIcon } from "assets/icons/Document.svg";
import { ReactComponent as CalendarIcon } from "assets/icons/Calendar.svg";
import { ReactComponent as ActivityIcon } from "assets/icons/Activity.svg";
import { ReactComponent as NotificationIcon } from "assets/icons/Notification.svg";
import { ReactComponent as SettingIcon } from "assets/icons/Setting.svg";

export interface ILink {
  href: string;
  title: string;
  icon: React.FC;
}

export const sidebarLinks: ILink[] = [
  {
    href: "/dashboard",
    title: "Dashboard",
    icon: CategoryIcon,
  },
  {
    href: "/analytics",
    title: "Analytics",
    icon: ChartIcon,
  },
  {
    href: "/invoice",
    title: "Invoice",
    icon: TicketIcon,
  },
  {
    href: "/schedule",
    title: "Schedule",
    icon: DocumentIcon,
  },
  // {
  //   href: "/calendar",
  //   title: "Calendar",
  //   icon: CalendarIcon,
  // },
  {
    href: "/messages",
    title: "Messages",
    icon: ActivityIcon,
  },
  {
    href: "/notification",
    title: "Notification",
    icon: NotificationIcon,
  },
  {
    href: "/settings",
    title: "Settings",
    icon: SettingIcon,
  },
];

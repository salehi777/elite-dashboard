import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import styles from "./menu.module.css";
import clsx from "clsx";

import { ReactComponent as MenuIcon } from "assets/icons/Menu.svg";

interface MenuProps {
  options: Array<{
    icon: JSX.Element;
    title: string;
    onClick?: () => void;
    color?: string;
    bgcolor?: string;
  }>;
}

export default function MenuComponent({ options }: MenuProps) {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<MenuIcon />}
        variant="ghost"
      />
      <MenuList className={clsx("text-sm", styles.menulist)}>
        {options.map((option) => (
          <MenuItem
            key={option.title}
            icon={option.icon}
            onClick={() => option.onClick?.()}
            style={{ color: option.color, background: option.bgcolor }}
          >
            {option.title}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

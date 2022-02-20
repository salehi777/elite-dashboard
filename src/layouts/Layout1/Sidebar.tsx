import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { sidebarLinks } from "./Links";
import { Button } from "@chakra-ui/react";
import { Avatar } from "components/Avatars";
import styles from "./layout1.module.css";

// recoil
import authAtom from "store/auth";
import { useSetRecoilState } from "recoil";

import { ReactComponent as LogoIcon } from "assets/icons/logo.svg";
import { ReactComponent as LogoutIcon } from "assets/icons/Logout.svg";
import LampImage from "assets/images/lamp.png";

export default function Sidebar() {
  const setAuthState = useSetRecoilState(authAtom);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-center gap-4 px-8 py-8 text-xl">
        <LogoIcon />
        <span>Base</span>
      </div>

      <ul className={styles.list}>
        {sidebarLinks.map((item) => (
          <li key={item.href}>
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                clsx(
                  "flex items-center my-1 py-3 px-8 text-main-secondary transition font-semibold",
                  isActive && "text-primary-400 active"
                )
              }
              style={({ isActive }) => ({
                background: isActive
                  ? "linear-gradient(90deg, #ACA9FF4d 0%, #aca9ff1a 90%)"
                  : "transparent",
              })}
            >
              {({ isActive }) => (
                <>
                  <i className="flex mr-3">
                    <item.icon />
                  </i>
                  {item.title}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="grow" />

      <div className="flex flex-col justify-center px-8">
        <img src={LampImage} />

        <div className="relative flex justify-center -top-14">
          <Button colorScheme="primary" className="!w-10/12">
            Upgrade Now
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between px-8 mb-8">
        <Avatar />
        <div>
          <div className="mb-1 text-sm text-black">Easin Arafat</div>
          <div className="text-xs text-blackAlpha-600">Free Account</div>
        </div>
        <i className="cursor-pointer" onClick={() => setAuthState(null)}>
          <LogoutIcon />
        </i>
      </div>
    </div>
  );
}

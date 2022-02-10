import { useState, useRef, useMemo } from "react";
import { NavLink, useLocation, matchPath } from "react-router-dom";
import { useDisclosure, Collapse } from "@chakra-ui/react";
import clsx from "clsx";
import links, { ILink } from "./Links";

import { TriangleDownIcon } from "@chakra-ui/icons";

type MenuItemProps = {
  item: ILink;
  isActive: boolean;
  className?: string;
};
type CollapseItemProps = {
  item: ILink;
};

const MenuItem = ({ item, isActive, className }: MenuItemProps) => (
  <span className="flex my-1 grow">
    <span
      className={clsx(
        "rounded-r-xl w-2 transition",
        isActive && "bg-green-500"
      )}
    />
    <span
      className={clsx(
        "flex py-3 px-4 grow text-gray-500 transition",
        isActive && "text-green-500",
        className
      )}
    >
      <i className="mr-2">{item.icon}</i>
      {item.title}
    </span>
  </span>
);

const CollapseItem = ({ item }: CollapseItemProps) => {
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const location = useLocation();

  const isActive = useMemo(() => {
    const isActive = Boolean(
      item?.subLinks?.find((item) => matchPath(item.href, location.pathname))
    );
    if (isActive) onOpen();
    else onClose();
    return isActive;
  }, [location]);

  return (
    <div className="flex flex-col">
      <div
        className={clsx(
          "flex items-center cursor-pointer pr-4 text-gray-500",
          isActive && "text-green-500"
        )}
        onClick={onToggle}
      >
        <MenuItem item={item} isActive={isActive} />
        <TriangleDownIcon />
      </div>
      <Collapse in={isOpen} animateOpacity>
        {item?.subLinks?.map((item) => (
          <NavLink to={item.href}>
            {({ isActive }) => (
              <MenuItem item={item} isActive={isActive} className="pl-8" />
            )}
          </NavLink>
        ))}
      </Collapse>
    </div>
  );
};

export default function Sidebar() {
  return (
    <div className="h-full py-4 bg-gray-100 border-r">
      <div className="px-4">Logo</div>

      <div>
        <h3 className="px-4 py-2">Menu</h3>
        <ul>
          {links.map((item) => (
            <li className="flex">
              {item.subLinks ? (
                <div className="grow">
                  <CollapseItem item={item} />
                </div>
              ) : (
                <NavLink to={item.href} className="grow">
                  {({ isActive }) => (
                    <MenuItem item={item} isActive={isActive} />
                  )}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

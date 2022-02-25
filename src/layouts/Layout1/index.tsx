import { useRef } from "react";
import Sidebar from "./Sidebar";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";

import { ReactComponent as MenuIcon } from "assets/icons/Menu-White.svg";

type Layout1Props = {
  children: JSX.Element;
};

export default function Layout1({ children }: Layout1Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="fixed hidden min-h-screen lg:block w-60">
        <Sidebar />
      </div>

      <div className="px-4 py-4 lg:hidden">
        <IconButton
          ref={btnRef}
          aria-label="close form"
          colorScheme="primary"
          icon={<MenuIcon />}
          onClick={onOpen}
        />

        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent className="overflow-auto">
            <Sidebar onClose={onClose} />
          </DrawerContent>
        </Drawer>
      </div>

      <main className="p-8 lg:min-h-screen grow lg:ml-60">{children}</main>
    </div>
  );
}

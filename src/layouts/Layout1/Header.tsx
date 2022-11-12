import i18next from "i18next";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ReactComponent as ArrowDownIcon } from "assets/icons/Arrow-Down.svg";
import { languages } from "utils/constants";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between h-full px-5 bg-white">
      <div />

      <Menu>
        <MenuButton as={Button} rightIcon={<ArrowDownIcon />}>
          {t("language")}
        </MenuButton>
        <MenuList>
          {languages.map((l) => (
            <MenuItem
              key={l.code}
              onClick={() => {
                i18next.changeLanguage(l.code);
                if (l.rtl) {
                  document.querySelector("html")?.setAttribute("dir", "rtl");
                } else {
                  document.querySelector("html")?.setAttribute("dir", "ltr");
                }
              }}
            >
              {l.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
}

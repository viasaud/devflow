"use client";

import { RiMoonFill, RiSunFill } from "@remixicon/react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { THEME_MENU_ICON_SIZE, THEME_OPTIONS } from "@/constants/constants";
import { useTheme } from "@/context/ThemeProvider";

const Theme = () => {
  const { mode, setMode } = useTheme();
  return (
    <Menubar className="relative border-none shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="hover:bg-hover data-[state=open]:bg-active text-primary cursor-pointer rounded-full p-1">
          {mode === "light" ? <RiSunFill /> : <RiMoonFill />}
        </MenubarTrigger>
        <MenubarContent className="border-primary bg-primary absolute -right-10 mt-[.70rem] min-w-28 rounded-md border">
          {THEME_OPTIONS.map((theme) => (
            <MenubarItem
              key={theme.value}
              className={`cursor-pointer ${mode === theme.value ? "bg-active" : "text-primary hover:bg-hover"} flex items-center gap-2 rounded-sm px-2.5 py-2`}
              onClick={() => {
                setMode(theme.value);

                if (theme.value !== "system") {
                  localStorage.theme = theme.value;
                } else {
                  localStorage.removeItem("theme");
                }
              }}
            >
              {mode === theme.value ? (
                <theme.iconFilled
                  size={THEME_MENU_ICON_SIZE}
                  className="text-primary"
                />
              ) : (
                <theme.icon
                  size={THEME_MENU_ICON_SIZE}
                  className="text-primary"
                />
              )}
              <p className={`text-primary text-sm`}>{theme.label}</p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;

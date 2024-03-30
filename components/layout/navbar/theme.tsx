"use client";

import { RiMoonFill, RiSunFill } from "@remixicon/react";
import React from "react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  DEFAULT_THEME_MENU_ICON_SIZE,
  THEME_OPTIONS,
} from "@/constants/constants";
import { useTheme } from "@/context/ThemeProvider";

const Theme = () => {
  const { mode, setMode } = useTheme();
  return (
    <Menubar className="relative border-none shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="hover:bg-hover data-[state=open]:bg-select text-default rounded-3xl">
          {mode === "light" ? <RiSunFill /> : <RiMoonFill />}
        </MenubarTrigger>
        <MenubarContent className="border-default bg-default absolute right-[-2.5rem] mt-[.70rem] min-w-28 rounded-md border">
          {THEME_OPTIONS.map((theme) => (
            <MenubarItem
              key={theme.value}
              className={`${mode === theme.value ? "bg-select" : "text-default hover:bg-hover"} flex items-center gap-2 rounded-sm px-2.5 py-2`}
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
                  size={DEFAULT_THEME_MENU_ICON_SIZE}
                  className="text-default"
                />
              ) : (
                <theme.icon
                  size={DEFAULT_THEME_MENU_ICON_SIZE}
                  className="text-default"
                />
              )}
              <p className={`font-body-regular text-default`}>{theme.label}</p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;

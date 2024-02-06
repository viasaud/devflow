"use client";

import React from "react";
import { useTheme } from "@/context/ThemeProvider";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { themes } from "@/constants/constants";
import { RiMoonLine, RiSunLine } from "@remixicon/react";

const Theme = () => {
  const { mode, setMode } = useTheme();
  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="hover:bg-light-800_dark-300 rounded-lg focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          {mode === "light" ? (
            <RiSunLine className="text-light-400" />
          ) : (
            <RiMoonLine className="text-light-400" />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-2.5rem] mt-3 min-w-[120px] rounded-md border py-2 dark:border-dark-400 dark:bg-dark-200">
          {themes.map((theme) => (
            <MenubarItem
              key={theme.value}
              className="hover:bg-light-800_dark-400 focus:bg-light-700_dark-300 flex items-center gap-4 rounded-lg px-2.5 py-2 dark:focus:bg-dark-400"
              onClick={() => {
                setMode(theme.value);

                if (theme.value !== "system") {
                  localStorage.theme = theme.value;
                } else {
                  localStorage.removeItem("theme");
                }
              }}
            >
              <theme.icon
                size={22}
                className={`${mode === theme.value ? "active-theme" : "text-light-400"}`}
              />
              <p
                className={`font-body-regular ${mode === theme.value ? "text-primary-500" : "text-dark-100_light-900"}`}
              >
                {theme.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;

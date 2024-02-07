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
        <MenubarTrigger className="hover:bg-hover rounded-3xl data-[state=open]:bg-light-900  dark:data-[state=open]:bg-dark-200">
          {mode === "light" ? (
            <RiSunLine className="text-dark-300_light-900" />
          ) : (
            <RiMoonLine className="text-dark-300_light-900" />
          )}
        </MenubarTrigger>
        <MenubarContent className="border-zinc bg-light-850_dark-100 absolute right-[-2.5rem] mt-3 min-w-28 rounded-lg border py-2">
          {themes.map((theme) => (
            <MenubarItem
              key={theme.value}
              className={`${mode === theme.value && "bg-select"} hover:bg-hover flex items-center gap-2 rounded-lg px-2.5 py-2`}
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
                className={`${mode === theme.value ? "active-theme" : "text-dark-300_light-900"}`}
              />
              <p
                className={`font-body-regular ${mode === theme.value ? "text-primary-500" : "text-dark-300_light-900"}`}
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

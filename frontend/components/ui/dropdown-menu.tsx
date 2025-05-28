"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { ArrowDown, ArrowUp } from "lucide-react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function DropdownMenu({
  setShow,
}: {
  setShow: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const t = useTranslations("navbar");
  const token = useSelector((state: RootState) => state.user.token);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch

  const changeLanguage = (lang: string) => {
    setCookie("locale", lang, { path: "/" }); // Store language in cookies
    router.refresh(); // Reload page to apply new locale
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: "50%", maxWidth: 360 }}
      className="md:hidden bg-transparent backdrop-blur-xl rounded-lg"
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {[
        { href: "/atoz", label: t("atoz") },
        { href: "/login", label: token ? t("account") : t("login") },
        token && { href: "/admin", label: t("admin") },
      ]
        .filter((item): item is { href: string; label: string } =>
          Boolean(item)
        )
        .map(({ href, label }) => (
          <ListItemButton
            key={href}
            onClick={() => {
              setShow(false);
              router.push(href);
            }}
          >
            <ListItemText primary={label} />
          </ListItemButton>
        ))}

      <ListItemButton
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <ListItemText
          primary={theme === "dark" ? "Light Theme" : "Dark Theme"}
        />
        {theme === "dark" ? <Moon /> : <Sun />}
      </ListItemButton>

      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Language" />
        {open ? <ArrowUp /> : <ArrowDown />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => changeLanguage("en")}>
            <ListItemIcon>EN</ListItemIcon>
            <ListItemText primary="English" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => changeLanguage("bn")}>
            <ListItemIcon>BN</ListItemIcon>
            <ListItemText primary="Bangla" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}

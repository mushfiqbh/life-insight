"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./language-switcher";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Navbar = () => {
  const pathname = usePathname();
  const t = useTranslations("navbar");
  const token = useSelector((state: RootState) => state.user.token);

  return (
    <nav className="bg-transparent border-gray-300 gap-5 hidden md:flex items-center ml-4 pl-4 border-l">
      {[
        { href: "/atoz", label: t("atoz") },
        { href: "/about", label: t("about") },
        { href: "/login", label: token ? t("account") : t("login") },
        token && { href: "/admin", label: t("admin") },
      ]
        .filter((item): item is { href: string; label: string } =>
          Boolean(item)
        )
        .map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`pb-1 border-b-4 transition-all ${
              pathname === href
                ? "font-bold border-deep_blue"
                : "border-transparent hover:border-primary_red"
            }`}
          >
            {label}
          </Link>
        ))}

      <LanguageSwitcher />
    </nav>
  );
};

export default Navbar;

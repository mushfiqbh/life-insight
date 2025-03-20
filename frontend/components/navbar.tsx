"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { assets } from "@/assets/assets";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ThemeSwitcher } from "./ui/theme-switcher";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./ui/language-switcher";

const Navbar: React.FC = () => {
  const token = useSelector((state: RootState) => state.users.token);
  const pathname = usePathname();
  const t = useTranslations("navbar");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full bg-transparent transition-all duration-300 ${
        scrolled ? "p-5" : "p-0"
      }`}
    >
      <nav className="flex h-20 items-center justify-between px-10 rounded-lg shadow-md backdrop-blur-xl">
        <Link href="/search" className="block md:hidden">
          <Image src={assets.menu} alt="menu" className="w-10" />
        </Link>

        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            {/* <Image
              src={assets.brand}
              alt="brand"
              className="w-48 cursor-pointer hover:opacity-70"
            /> */}
            BRAND
          </Link>
          <nav className="hidden md:flex items-center ml-4 border-l border-gray-300 pl-4 space-x-4">
            {[
              { href: "/atoz", label: t("atoz") },
              { href: "/therapy", label: t("therapy") },
              { href: "/living-well", label: t("living") },
              { href: "/relationship", label: t("relate") },
              { href: "/psychology", label: t("psych") },
              { href: "/about", label: t("about") },
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
          </nav>
        </div>

        <div className="flex gap-3">
          <LanguageSwitcher />
          <Link href="/search" className="flex items-center cursor-pointer">
            <Image
              src={assets.search}
              alt="search"
              className="w-8 hover:opacity-70"
            />
          </Link>
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

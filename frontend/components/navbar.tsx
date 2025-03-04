"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { assets } from "@/assets/assets";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ThemeSwitcher } from "./ui/theme-switcher";

const Navbar: React.FC = () => {
  const token = useSelector((state: RootState) => state.users.token);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full shadow-md backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-10">
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
              { href: "/atoz", label: "এটুজেড" },
              { href: "/therapy", label: "থেরাপি" },
              { href: "/living-well", label: "জীবন" },
              { href: "/relationship", label: "সম্পর্ক" },
              { href: "/psychology", label: "মনোবিজ্ঞান" },
              { href: "/about", label: "আমাদের" },
              token && { href: "/admin", label: "এডমিন প্যানেল" },
            ]
              .filter((item): item is { href: string; label: string } =>
                Boolean(item)
              )
              .map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`pb-1 font-semibold border-b-3 transition-all ${
                    pathname === href
                      ? "border-deep"
                      : "border-transparent hover:border-red"
                  }`}
                >
                  {label}
                </Link>
              ))}
          </nav>
        </div>

        <div className="flex gap-3">
          <Link href="/search" className="flex items-center cursor-pointer">
            <Image
              src={assets.search}
              alt="search"
              className="w-8 hover:opacity-70"
            />
          </Link>

          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";
import Navbar from "./ui/navbar";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import DropdownMenu from "./ui/dropdown-menu";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [show, setShow] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <header
      className={`fixed top-0 z-50 w-full bg-transparent transition-all duration-300 ${
        scrolled ? "p-1 md:p-5" : "p-0"
      }`}
    >
      <div className="flex h-20 items-center justify-between md:px-10 rounded-lg shadow-md backdrop-blur-xl">
        <div className="px-3 block md:hidden" onClick={() => setShow(!show)}>
          <Menu />
        </div>

        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src={assets.verywellmind}
              alt="brand"
              className="w-48 cursor-pointer hover:opacity-70"
            />
          </Link>

          <Navbar />
        </div>

        <div className="flex gap-3">
          <div
            className="hidden md:block cursor-pointer p-2 rounded-full hover:bg-mint_green"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Moon /> : <Sun />}
          </div>
          <Link
            href="/search"
            className="flex items-center cursor-pointer mx-3"
          >
            <Image
              src={assets.search}
              alt="search"
              className="w-8 hover:opacity-70"
            />
          </Link>
        </div>
      </div>

      {show && <DropdownMenu setShow={setShow} />}
    </header>
  );
};

export default Header;

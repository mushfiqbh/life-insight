"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../ui/navbar";
import { Menu, Moon, Sun, Search, Bell, User } from "lucide-react";
import { useTheme } from "next-themes";
import DropdownMenu from "../ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "@/assets/assets";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
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
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg border-b border-gray-200/20 p-2 md:p-4"
          : "bg-transparent p-4 md:p-6"
      }`}
    >
      <motion.div
        className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-6 rounded-2xl"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Mobile Menu Button */}
        <motion.div className="block md:hidden" whileTap={{ scale: 0.95 }}>
          <button
            onClick={() => setShow(!show)}
            className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
        </motion.div>

        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                priority
                src={assets.verywellmind}
                alt="LifeInsight Brand"
                className="h-10 md:h-12 w-auto group-hover:opacity-80 transition-opacity duration-300"
                width={200}
                height={48}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <Navbar />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Search Button */}
          <motion.button
            onClick={() => setShowSearch(!showSearch)}
            className="relative p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-primary_green/20 hover:border-primary_green/30 transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-primary_green transition-colors" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary_red rounded-full animate-pulse"></span>
          </motion.button>

          {/* Notifications */}
          <motion.button
            className="hidden md:flex relative p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-primary_blue/20 hover:border-primary_blue/30 transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-primary_blue transition-colors" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary_red rounded-full"></span>
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-yellow-500/20 hover:border-yellow-500/30 transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-yellow-500 transition-colors" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors" />
            )}
          </motion.button>

          {/* User Profile */}
          <Link href="/login">
            <motion.button
              className="hidden md:flex p-3 rounded-full bg-primary_green/20 border border-primary_green/30 hover:bg-primary_green/30 transition-all duration-300 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <User className="w-5 h-5 text-primary_green group-hover:text-white transition-colors" />
            </motion.button>
          </Link>

          {/* CTA Button */}
          <Link href="/conditions">
            <motion.button
              className="hidden lg:flex items-center px-6 py-3 bg-gradient-to-r from-primary_green to-primary_blue text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Help
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Expandable Search Bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-4 md:px-6 mt-4"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 shadow-xl">
              <div className="flex items-center space-x-4">
                <Search className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search for mental health topics, articles, or conditions..."
                  className="flex-1 bg-transparent outline-none text-gray-700 dark:text-gray-300 placeholder-gray-500"
                  autoFocus
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DropdownMenu setShow={setShow} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

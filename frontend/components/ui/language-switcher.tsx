"use client";

import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export default function LanguageSwitcher() {
  const router = useRouter();

  const changeLanguage = (lang: string) => {
    setCookie("locale", lang, { path: "/" }); // Store language in cookies
    localStorage.setItem("locale", lang);
    router.refresh(); // Reload page to apply new locale
  };

  return (
    <select
      onChange={(event) => changeLanguage(event.target.value)}
      className="px-5 py-1 bg-background rounded-md focus:outline-none"
      defaultValue={localStorage.getItem("locale") || "en"}
    >
      <option value="en">English</option>
      <option value="bn">বাংলা</option>
    </select>
  );
}

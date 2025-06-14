import { franc } from "franc-min";

export const detectLanguage = (text: string) => {
  const langCode = franc(text);
  const langMap: Record<string, string> = {
    eng: "en",
    ben: "bn",
    hin: "hi",
    spa: "es",
    fra: "fr",
  };
  return langMap[langCode] || "en";
};

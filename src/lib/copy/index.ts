import type { Lang } from "./types";
import { de } from "./de";
import { en } from "./en";
import { fr } from "./fr";
import { ki } from "./ki";
import { sw } from "./sw";

export const LANGS: { id: Lang; native: string }[] = [
  { id: "en", native: "English" },
  { id: "sw", native: "Kiswahili" },
  { id: "de", native: "Deutsch" },
  { id: "fr", native: "Français" },
  { id: "ki", native: "Gĩkũyũ" },
];

export const copy = { en, sw, de, fr, ki } as const;

export const EMAIL = "mbuthibrian2@gmail.com";
export const PHONE = "+254 791 372 851";
export const PHONE_TEL = "+254791372851";
export const SITE = "https://khabibjnr.github.io";

export function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ""));
}

const STORAGE_KEY = "bm-lang";

export function readStoredLang(): Lang {
  if (typeof window === "undefined") return "en";
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === "en" || raw === "sw" || raw === "de" || raw === "fr" || raw === "ki") return raw;
  return "en";
}

export function storeLang(lang: Lang) {
  window.localStorage.setItem(STORAGE_KEY, lang);
}

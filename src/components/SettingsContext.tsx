"use client";
import { createContext, useContext } from "react";
import type { SiteSettings } from "@/lib/settings-config";
import { SETTING_DEFAULTS } from "@/lib/settings-config";

const SettingsContext = createContext<SiteSettings>(SETTING_DEFAULTS);

export function SettingsProvider({ children, value }: { children: React.ReactNode; value: SiteSettings }) {
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  return useContext(SettingsContext);
}

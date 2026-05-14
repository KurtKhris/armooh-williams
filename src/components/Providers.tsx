"use client";
import { Provider } from "react-redux";
import { store } from "@/store";
import { SettingsProvider } from "./SettingsContext";
import type { SiteSettings } from "@/lib/settings-config";
import { SETTING_DEFAULTS } from "@/lib/settings-config";

export default function Providers({
  children,
  settings = SETTING_DEFAULTS,
}: {
  children: React.ReactNode;
  settings?: SiteSettings;
}) {
  return (
    <Provider store={store}>
      <SettingsProvider value={settings}>
        {children}
      </SettingsProvider>
    </Provider>
  );
}

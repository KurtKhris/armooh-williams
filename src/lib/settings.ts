export type { SiteSettings, SettingKey } from "./settings-config";
export { SETTING_KEYS, SETTING_DEFAULTS } from "./settings-config";

import { db } from "@/lib/db";
import { siteSettings } from "@/lib/schema";
import { SETTING_DEFAULTS } from "./settings-config";
import type { SiteSettings } from "./settings-config";

export async function getSettings(): Promise<SiteSettings> {
  try {
    const rows = await db.select().from(siteSettings);
    const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return { ...SETTING_DEFAULTS, ...map } as SiteSettings;
  } catch {
    return SETTING_DEFAULTS;
  }
}

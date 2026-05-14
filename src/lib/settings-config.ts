export const SETTING_KEYS = [
  "phone", "whatsapp", "email", "address",
  "linkedin", "facebook", "instagram", "twitter",
] as const;

export type SettingKey = typeof SETTING_KEYS[number];

export interface SiteSettings {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  twitter: string;
}

export const SETTING_DEFAULTS: SiteSettings = {
  phone: "+1 (703) 220-4504",
  whatsapp: "17035978170",
  email: "info@armooh-williams.com",
  address: "2611 South Clark Street, Suite 600\nArlington, Virginia 22202",
  linkedin: "",
  facebook: "",
  instagram: "",
  twitter: "",
};

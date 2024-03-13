import { Preferences } from "@capacitor/preferences";

export async function getSettings() {
  const { value } = await Preferences.get({ key: "settings" });
  return value ? JSON.parse(value) : [];
}

export async function setSettings(settings) {
  await Preferences.set({ key: "settings", value: JSON.stringify(settings) });
}

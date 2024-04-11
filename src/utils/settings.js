import { Preferences } from "@capacitor/preferences";

/**
 * Gets the settings from the database
 * @returns {Object} settings array
 */
export async function getSettings() {
  const { value } = await Preferences.get({ key: "settings" });
  return value ? JSON.parse(value) : {};
}

/**
 * Sets the settings from the database
 * @param {Object} settings Settings data
 */
export async function setSettings(settings) {
  await Preferences.set({ key: "settings", value: JSON.stringify(settings) });
}

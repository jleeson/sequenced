import { Preferences } from "@capacitor/preferences";

export interface Settings {
  lastNotification?: number;
  hasRemindedToday?: boolean;
  sendDailyReminders?: boolean;
  sendDailyRemindersOverride?: boolean;
  sendDailyRemindersTime?: string
}

/* Gets the settings from the database */
export async function getSettings(): Promise<Settings> {
  const { value } = await Preferences.get({ key: "settings" });
  return value ? JSON.parse(value) : {};
}

/* Sets the settings from the database */
export async function setSettings(settings: Settings): Promise<void> {
  return await Preferences.set({
    key: "settings",
    value: JSON.stringify(settings),
  });
}

import { LocalNotificationSchema, LocalNotifications, PendingResult, PermissionStatus } from "@capacitor/local-notifications";
import { getSettings, setSettings } from "./settings";

/* Checks if a user has been reminded */
export async function hasRemindedToday(): Promise<boolean> {
  const settings = await getSettings();

  if (settings.lastNotification) {
    const last = new Date(settings.lastNotification);
    const current = new Date();

    if (last.getDate() == current.getDate()) return true;
    else return false;
  }

  return false;
}

/* Runs all the checks for the notifications */
export async function initializeNotifications() {
  let checked = await checkPermissions();
  if (checked.display == "prompt" || checked.display == "prompt-with-rationale")
    await requestPermissions();

  const sendingDaily: boolean = await checkSendingDaily();
  if (!sendingDaily) setDailyReminders();
}

/* Sets daily reminders */
export async function setDailyReminders() {
  const timeBuilder = new Date();
  timeBuilder.setHours(8, 0, 0, 0);
  timeBuilder.setDate(timeBuilder.getDate() + 1);

  scheduleNotification({
    title: "Sequenced: ADHD Manager",
    id: new Date().getTime(),
    body: "Don't forget to check your task-list!",
    schedule: {
      at: timeBuilder,
      every: "day",
    },
  });
}

/* Checks if the system is sending daily notifications */
export async function checkSendingDaily(): Promise<boolean> {
  const { notifications: pending } = await getPending();
  const isPending = pending.filter((notif) => notif?.schedule?.every == "day");
  if (isPending.length > 0) return true;

  return false;
}

/* Gets pending notifications */
export async function getPending(): Promise<PendingResult> {
  return await LocalNotifications.getPending();
}

/* Sets the state of the daily reminder checker */
export async function setHasRemindedToday(state: boolean): Promise<Boolean> {
  const settings = await getSettings();
  settings.hasRemindedToday = state || true;
  await setSettings(settings);
  
  return settings.hasRemindedToday;
}

/* Sets the notification settings into the config */
export async function setNotificationConfig() {
  const settings = await getSettings();
  settings.lastNotification = new Date().getTime();

  await setHasRemindedToday(true);
  await setSettings(settings);
}

/* Checks if system can send notifications */
export async function checkPermissions(): Promise<PermissionStatus> {
  return await LocalNotifications.checkPermissions();
}

/* Requests the ability to request permissions from the user */
export async function requestPermissions(): Promise<PermissionStatus> {
  return await LocalNotifications.requestPermissions();
}

/* Schedules many notifications */
export async function scheduleNotification(...options: LocalNotificationSchema[]) {
  await setNotificationConfig();

  const checked = await checkPermissions();

  if (checked.display == "granted") {
    await LocalNotifications.schedule({
      notifications: [...options],
    });
  } else {
    console.log(`Unable to send notification: Missing Permissions`);
  }
}

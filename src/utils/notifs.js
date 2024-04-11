import { LocalNotifications } from "@capacitor/local-notifications";
import { getSettings, setSettings } from "./settings";

/**
 * Checks if a user has been reminded
 * @returns boolean if user was reminded today
 */
export async function hasRemindedToday() {
  const settings = await getSettings();

  if (settings.lastNotification) {
    const last = new Date(settings.lastNotification);
    const current = new Date();

    if (last.getDate() == current.getDate()) return true;
    else return false;
  }

  return false;
}

/**
 * Runs all the checks for the notifications
 */
export async function initializeNotifications() {
  let checked = await checkPermissions();
  if (checked.display == "prompt" || checked.display == "prompt-with-rationale")
    await requestPermissions();

  const sendingDaily = await checkSendingDaily();
  if (!sendingDaily) setDailyReminders();
}

/**
 * Sets daily reminder
 */
export async function setDailyReminders() {
  let timeBuilder = new Date();
  timeBuilder.setHours(8, 0, 0, 0);
  timeBuilder.setDate(timeBuilder.getDate() + 1);

  sendStandardNotification({
    body: "Don't forget to check your task-list!",
    schedule: {
      at: timeBuilder,
      every: "day",
    },
  });
}

/**
 * Checks if the system is sending daily notifications
 * @returns boolean stating if the system is sending dailies
 */
export async function checkSendingDaily() {
  const { notifications: pending } = await getPending();
  const isPending = pending.filter((notif) => notif?.schedule?.every == "day");
  if (isPending.length > 0) return true;

  return false;
}

/**
 * Gets pending notifications
 * @returns array of pending notifications
 */
export async function getPending() {
  return await LocalNotifications.getPending();
}

/**
 * Sets the state of the daily reminder checker
 * @param {boolean} state state of reminder
 * @returns Returns the set state
 */
export async function setHasRemindedToday(state) {
  const settings = await getSettings();
  const decoy = {
    ...settings,
  };

  decoy.hasRemindedToday = state || true;

  await setSettings(decoy);

  return decoy.hasRemindedToday;
}

/**
 * Sets the notification settings into the config
 */
export async function setNotificationConfig() {
  const settings = await getSettings();
  const decoy = {
    ...settings,
  };

  decoy.lastNotification = new Date().getTime();

  await setHasRemindedToday(true);
  await setSettings(decoy);
}

/**
 * Checks if system can send notifications
 * @returns boolean state on ability to send notifications
 */
export async function checkPermissions() {
  return await LocalNotifications.checkPermissions();
}

/**
 * Requests the ability to request permissions from the user
 */
export async function requestPermissions() {
  await LocalNotifications.requestPermissions();
}

/**
 * Sends a notification under Sequenced
 * @param {Object} notification notification data
 */
export async function sendStandardNotification(notification) {
  const notifBuilder = {
    ...notification,
  };

  if (!notifBuilder.title) notifBuilder.title = "Sequenced: ADHD Manager";

  if (!notifBuilder.id) notifBuilder.id = new Date().getTime();

  scheduleNotification(notifBuilder);
}

/**
 * Schedules many notifications
 * @param  {...any} options notification options
 */
export async function scheduleNotification(...options) {
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

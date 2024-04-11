import { matchDate } from "./date";

/**
 * Sorts array by dates in order from soonest to farthest
 * @param {Array} arr array to sort
 * @returns sorted array
 */
export function sortByDate(arr) {
  return arr.sort((a, b) => (a.date < b.date ? -1 : 1));
}

/**
 * Checks if one date is greater than the other
 * @param {Date} a 
 * @param {Date} b 
 * @returns 
 */
export function isDateGreater(a, b) {
  if (a.getMonth() == b.getMonth()) {
    if (a.getDate() <= b.getDate()) return true;
  } else if (a.getMonth() < b.getMonth()) return true;

  return false;
}

/**
 * Checks if the first date is within the second based on mode
 * @param {'daily'|'weekly'|'bi-weekly'|'monthly'} mode Mode to check
 * @param {Date} a first date
 * @param {Date} b second date
 * @returns true/false if within proximity
 */
export function isDateWithinProximity(mode, a, b) {
  let tempDate = new Date(a.date);

  switch (mode) {
    case "daily":
      tempDate = new Date(a.date);
      if (isDateGreater(tempDate, b)) return true;

    case "weekly":
      tempDate = new Date(a.date);
      for (let i = 0; i < 100; i++) {
        tempDate.setDate(new Date(a.date).getDate() + i * 7);
        if (matchDate(tempDate, b)) {
          return true;
        }
      }

      return false;

    case "bi-weekly":
      tempDate = new Date(a.date);
      for (let i = 0; i < 100; i++) {
        tempDate.setDate(new Date(a.date).getDate() + i * 14);
        if (matchDate(tempDate, b)) {
          return true;
        }
      }

      return false;

    case "monthly":
      tempDate = new Date(a.date);
      for (let i = 0; i < 12; i++) {
        tempDate.setMonth(tempDate.getMonth() + i);
        if (
          tempDate.getFullYear() == b.getFullYear() &&
          tempDate.getMonth() == b.getMonth() &&
          tempDate.getDate() == b.getDate()
        ) {
          return true;
        }
      }

      return false;
  }
}

/**
 * 
 * @param {Object} task task
 * @param {Object} activeDate context date
 * @returns 
 */
export function isTaskDone(task, activeDate) {
  if (Array.isArray(task.done)) {
    if (task.done.length == 0) return true;
    else if (task.done.length > 0) {
      return !task.done.find((task) =>
        matchDate(new Date(task), new Date(activeDate))
      );
    }
  } else {
    return task.done == false;
  }

  return false;
}

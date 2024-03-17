import { matchDate } from "./date";

export function sortByDate(arr) {
  return arr.sort((a, b) => (a.date < b.date ? -1 : 1));
}

export function isDateGreater(a, b) {
  if (a.getMonth() == b.getMonth()) {
    if (a.getDate() <= b.getDate()) return true;
  } else if (a.getMonth() < b.getMonth()) return true;

  return false;
}

export function isDateWithinProximity(mode, a, b) {
  let tempDate = new Date(a.date);

  switch (mode) {
    case "daily":
      tempDate = new Date(a.date);
      if (isDateGreater(tempDate, b)) return true;

    case "weekly":
      tempDate = new Date(a.date);
      for (let i = 0; i < 100; i++) {
        tempDate.setDate(tempDate.getDate() + i * 7);
        if (
          tempDate.getFullYear() == b.getFullYear() &&
          tempDate.getMonth() == b.getMonth() &&
          tempDate.getDate() == b.getDate()
        ) {
          return true;
        }
      }

      return false;

    case "two-weekly":
      tempDate = new Date(a.date);
      for (let i = 0; i < 100; i++) {
        tempDate.setDate(tempDate.getDate() + i * 14);
        if (
          tempDate.getFullYear() == b.getFullYear() &&
          tempDate.getMonth() == b.getMonth() &&
          tempDate.getDate() == b.getDate()
        ) {
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

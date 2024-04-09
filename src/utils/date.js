export function getYearProper(date) {
  return date
    .getFullYear()
    .toLocaleString("en-US", { minimumIntegerDigits: 4, useGrouping: false });
}

export function getMonthProper(date) {
  return (date.getMonth() + 1).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

export function getDateProper(date) {
  return date
    .getDate()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
}

export function getHoursProper(date) {
  return date
    .getHours()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
}

export function getMinutesProper(date) {
  return date
    .getMinutes()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
}

export function getSecondsProper(date) {
  return date
    .getSeconds()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
}

export function formatDate(date) {
  return `${getYearProper(date)}-${getMonthProper(date)}-${getDateProper(
    date
  )}`;
}

export function formatShortDate(date) {
  return `${getMonthProper(date)}-${getDateProper(date)}`;
}

export function formatMonthYear(date) {
  return `${getYearProper(date)}-${getMonthProper(date)}`;
}

export function formatDateTime(date) {
  return `${getYearProper(date)}-${getMonthProper(date)}-${getDateProper(
    date
  )}T${getHoursProper(date)}:${getMinutesProper(date)}`;
}

export function formatDateTimeClean(date) {
  return `${getYearProper(date)}-${getMonthProper(date)}-${getDateProper(
    date
  )}T00:00:00`;
}

export function formatDateClean(date) {
  if (!date) return "No Date Set";

  let month = getMonthProper(date);
  let day = getDateProper(date);
  let year = getYearProper(date);

  let hours = getHoursProper(date);
  let minutes = getMinutesProper(date);

  return `${month}/${day}/${year} ${hours}:${minutes}`;
}

export function generateWeek(startingDate, dayStart) {
  let week = [];

  let dateSet = new Date(startingDate);

  if (startingDate.getDay() != dayStart) {
    dateSet.setDate(
      startingDate.getDate() - (startingDate.getDay() - dayStart)
    );
  }

  for (let i = 0; i < 7; i++) {
    let tempDate = new Date(dateSet);
    tempDate.setDate(tempDate.getDate() + i);

    week.push(tempDate);
  }

  return week;
}

/**
 * Checks if a date is overdue in relation to the second date
 * @param {Date} a Date to check
 * @param {Date} b Date to compare to
 * @returns Overdue status as a boolean
 */
export function isOverdue(a, b) {
  const dateOne = new Date(a);
  const dateTwo = new Date(b);
  
  return (
    dateOne.getFullYear() <= dateTwo.getFullYear() &&
    dateOne.getMonth() <= dateTwo.getMonth() &&
    dateOne.getDate() < dateTwo.getDate()
  );
}

export function matchDate(dateOne, dateTwo) {
  return (
    dateOne.getFullYear() == dateTwo.getFullYear() &&
    dateOne.getMonth() == dateTwo.getMonth() &&
    dateOne.getDate() == dateTwo.getDate()
  );
}

export function getNameByDate(date) {
  switch (date) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
}

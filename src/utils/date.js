/**
 * Gets year in US YYYY format
 * @param {Date} date Date to format
 * @returns YYYY formatted date
 */
export function getYearProper(date) {
  return date
    .getFullYear()
    .toLocaleString("en-US", { minimumIntegerDigits: 4, useGrouping: false });
}

/**
 * Ensures date in US MM format
 * @param {Date} date Date to format
 * @returns MM formatted date
 */
export function getMonthProper(date) {
  return (date.getMonth() + 1).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

/**
 * Ensures date in US DD format
 * @param {Date} date Date to format
 * @returns DD formatted date
 */
export function getDateProper(date) {
  return date
    .getDate()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
}

/**
 * Ensures date in US hh format
 * @param {Date} date Date to format
 * @returns hh formatted date
 */
export function getHoursProper(date) {
  return date
    .getHours()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
}

/**
 * Ensures date in US mm format
 * @param {Date} date Date to format
 * @returns mm formatted date
 */
export function getMinutesProper(date) {
  return date
    .getMinutes()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
}

/**
 * Ensures date in US ss format
 * @param {Date} date Date to format
 * @returns ss formatted date
 */
export function getSecondsProper(date) {
  return date
    .getSeconds()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
}

/**
 * Formats date in YYYY-MM-DD format
 * @param {Date} date Date to format
 * @returns YYYY-MM-DD date
 */
export function formatDate(date) {
  return `${getYearProper(date)}-${getMonthProper(date)}-${getDateProper(
    date
  )}`;
}

/**
 * Formats date in MM-DD format
 * @param {Date} date Date to format
 * @returns MM-DD date
 */
export function formatShortDate(date) {
  return `${getMonthProper(date)}-${getDateProper(date)}`;
}

/**
 * Formats date in YYYY-MM format
 * @param {Date} date Date to format
 * @returns YYYY-MM date
 */
export function formatMonthYear(date) {
  return `${getYearProper(date)}-${getMonthProper(date)}`;
}

/**
 * Formats date in YYYY-MM-DDThh:mm format
 * @param {Date} date Date to format
 * @returns YYYY-MM-DDThh:mm date
 */
export function formatDateTime(date) {
  return `${getYearProper(date)}-${getMonthProper(date)}-${getDateProper(
    date
  )}T${getHoursProper(date)}:${getMinutesProper(date)}`;
}

/**
 * Formats date in YYYY-MM-DDT00:00:00 format
 * @param {Date} date Date to format
 * @returns YYYY-MM-DDT00:00:00 date
 */
export function formatDateTimeClean(date) {
  return `${getYearProper(date)}-${getMonthProper(date)}-${getDateProper(
    date
  )}T00:00:00`;
}

/**
 * Formats date in MM/DD/YYYY hh:mm format
 * @param {Date} date Date to format
 * @returns MM/DD/YYYY hh:mm date
 */
export function formatDateClean(date) {
  if (!date) return "No Date Set";

  const month = getMonthProper(date);
  const day = getDateProper(date);
  const year = getYearProper(date);

  const hours = getHoursProper(date);
  const minutes = getMinutesProper(date);

  return `${month}/${day}/${year} ${hours}:${minutes}`;
}

/**
 * Generates an array of 7 dates within range of the starting date, with the dayStart as the first index
 * @param {Date} startingDate Date to generate around
 * @param {Number} dayStart Day of the week as the first index
 * @returns array of 7 dates
 */
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

/**
 * Checks if two dates are equal
 * @param {Date} dateOne first date
 * @param {Date} dateTwo second date
 * @returns true/false if they are equal
 */
export function matchDate(dateOne, dateTwo) {
  return (
    dateOne.getFullYear() == dateTwo.getFullYear() &&
    dateOne.getMonth() == dateTwo.getMonth() &&
    dateOne.getDate() == dateTwo.getDate()
  );
}

/**
 * Gets day of the week in name format | 0: Sunday - 6: Saturday
 * @param {Date} date Date to convert
 * @returns name of the day
 */
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

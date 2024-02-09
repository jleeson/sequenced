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

export function formatDate(date) {
  return `${getYearProper(date)}-${getMonthProper(date)}-${getDateProper(
    date
  )}`;
}

export function formatDateTime(date) {
  return `${getYearProper(date)}-${getMonthProper(date)}-${getDateProper(
    date
  )}T${getHoursProper(date)}:${getMinutesProper(date)}`;
}

export function formatDateClean(date) {
  if (!date) return "No Date Set";

  console.log(date);

  let month = getMonthProper(date);
  let day = getDateProper(date);
  let year = getYearProper(date);

  let hours = getHoursProper(date);
  let minutes = getMinutesProper(date);

  return `${month}/${day}/${year} ${hours}:${minutes}`;
}
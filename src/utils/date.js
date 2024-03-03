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

export function formatDateTimeClean(date){
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

export function generateWeek(startingDate, dayStart){
  let week = [];

  let dateSet = new Date(startingDate);

  if(startingDate.getDay() != dayStart){
    dateSet.setDate(startingDate.getDate() - ((startingDate.getDay()) - (dayStart)));
  }

  for(let i = 0; i < 7; i++){
    let tempDate = new Date(dateSet);
    tempDate.setDate(tempDate.getDate() + i);

    week.push(tempDate);
  }

  return week;
}
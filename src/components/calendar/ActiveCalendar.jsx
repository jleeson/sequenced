import { useState } from "react";

export default function ActiveCalendar({ activeDate, setActiveDate }) {
  const [calendarSize, setCalendarSize] = useState(7);
  const [activeWeek, setActiveWeek] = useState(null);

  function generateDates() {
    let week = [];

    for (let i = 0; i < calendarSize; i++) {
      let newDate = new Date();
      newDate.setDate(newDate.getDate() + i);

      week.push(newDate);
    }

    return week;
  }

  function convertMonth(num) {
    switch (num) {
      case 0:
        return "January";
      case 1:
        return "Febuary";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
    }
  }

  function convertDay(num) {
    switch (num) {
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

  const changeDate = (date) => {
    setActiveDate(date);
  };

  const dates = generateDates();

  let currentDate = new Date().getDate();

  return (
    <div className="w-full flex flex-row justify-between px-4">
      {dates.map((date, key) => {
        return (
          <div
            key={key}
            className={`${
              activeDate.getDate() == date.getDate()
                ? "bg-accent-blue-700"
                : "bg-transparent"
            } rounded-lg px-2 py-2`}
            onClick={(e) => changeDate(date, e)}
          >
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-center">
                {convertDay(date.getDay()).slice(0, 3)}
              </h1>
              <h1 className="text-center">{date.getDate()}</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
}

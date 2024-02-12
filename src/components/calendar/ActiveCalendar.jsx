import { useState } from "react";
import CalendarArrow from "./CalendarArrow";
import { formatMonthYear } from "@/utils/date";
import CalendarItem from "./CalendarItem";

export default function ActiveCalendar({ context, setContext }) {
  const [calendarSize, setCalendarSize] = useState(7);
  const [activeWeek, setActiveWeek] = useState(0);

  const activeDate = context.todo.active.date;
  const activeMonth = context.todo.active.month;

  function generateDates() {
    let week = [];

    for (let i = 0; i < calendarSize; i++) {
      let newDate = new Date();
      if (newDate.getMonth() != activeMonth) newDate.setMonth(activeMonth);
      newDate.setDate(newDate.getDate() + i + activeWeek);

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
    let tempContext = {
      ...context,
    };

    tempContext.todo.active = {
      date: date,
      month: date.getMonth(),
      year: date.getFullYear(),
    };

    setContext(tempContext);

    // setActiveDate(date);
  };

  const dates = generateDates();

  // let currentMonth = new Date();
  // if (currentMonth.getMonth() != activeMonth)
  //   currentMonth.setMonth(activeMonth);

  function changeActiveWeek(e) {
    setActiveWeek(e);
  }

  function changeActiveMonth(e) {
    let activeData = e.target.value.split("-");

    let tempContext = {
      ...context,
    };

    tempContext.todo.active.month = activeData[1] - 1;
    setContext(tempContext);
  }

  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-center my-3">
        <div className="w-2/3 py-1 flex justify-center border border-accent-white rounded-lg">
          <input
            type="month"
            value={formatMonthYear(new Date(new Date().setMonth(activeMonth)))}
            onChange={changeActiveMonth}
            className="bg-transparent text-accent-black invert px-1 m-0 text-center text-xl "
          />
        </div>
      </div>
      <div className="w-full h-full flex flex-row items-center">
        <CalendarArrow
          direction="left"
          activeWeek={activeWeek}
          changeActiveWeek={changeActiveWeek}
        />
        <div className="w-full flex flex-row justify-between px-4">
          {dates.map((date, key) => (
            <CalendarItem
              key={key}
              date={date}
              activeDate={activeDate}
              changeDate={changeDate}
            />
          ))}
        </div>
        <CalendarArrow
          direction="right"
          activeWeek={activeWeek}
          changeActiveWeek={changeActiveWeek}
        />
      </div>
    </div>
  );
}

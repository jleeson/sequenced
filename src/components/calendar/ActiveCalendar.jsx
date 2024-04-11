import { useState } from "react";
import CalendarArrow from "./CalendarArrow";
import {
  formatDate,
  formatDateClean,
  formatMonthYear,
  generateWeek,
} from "@/utils/date";
import CalendarItem from "./CalendarItem";

export default function ActiveCalendar({ context, setContext, setActiveDate }) {
  const [calendarSize, setCalendarSize] = useState(7);
  const [activeWeek, setActiveWeek] = useState(0);

  const activeDate = context.task.active.date;
  const dates = generateWeek(activeDate || new Date(), 0);

  const changeDate = (date) => {
    let tempContext = {
      ...context,
    };

    tempContext.task.active = {
      date: date,
      month: date.getMonth(),
      year: date.getFullYear(),
    };

    setActiveDate(date);
    setContext(tempContext);
  };

  function changeActiveMonth(e) {
    let activeData = e.target.value.split("-");

    let tempContext = {
      ...context,
    };

    const tempYear = activeData[0];
    const tempMonth = activeData[1] - 1;
    const tempDay = activeData[2];

    tempContext.task.active.date = new Date();
    tempContext.task.active.date.setFullYear(tempYear);
    tempContext.task.active.date.setMonth(tempMonth);
    tempContext.task.active.date.setDate(tempDay);

    tempContext.task.active.month = activeData[1] - 1;
    setContext(tempContext);
  }

  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-center my-3">
        <div className="w-2/3 py-1 flex justify-center border border-accent-white rounded-lg">
          <input
            type="date"
            value={formatDate(activeDate)}
            onChange={changeActiveMonth}
            className="bg-transparent text-accent-black invert px-1 m-0 text-center text-xl "
          />
        </div>
      </div>
      <div className="w-full h-full flex flex-row items-center">
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
      </div>
    </div>
  );
}

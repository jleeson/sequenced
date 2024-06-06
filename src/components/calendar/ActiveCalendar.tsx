import { useState } from "react";
import CalendarArrow from "./CalendarArrow";
import {
  formatDate,
  generateWeek,
} from "@/utils/date";
import CalendarItem from "./CalendarItem";

export default function ActiveCalendar({ context, setContext, setActiveDate }: {context: React.Context<Object>}) {
  const [calendarSize, setCalendarSize] = useState(7);
  const [activeWeek, setActiveWeek] = useState(0);
  
  const activeDate = context.activeDate;
  const dates = generateWeek(activeDate || new Date(), 0);

  const changeDate = (date) => {
    let tempContext = {
      ...context,
    };

    tempContext.activeDate = date;

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

    tempContext.activeDate = new Date();
    tempContext.activeDate.setFullYear(tempYear);
    tempContext.activeDate.setMonth(tempMonth);
    tempContext.activeDate.setDate(tempDay);

    setActiveDate(tempContext.activeDate);
    setContext(tempContext);
  }

  return (
    <div className="w-full h-full px-2">
      <div className="w-full flex justify-center my-3">
        <div className="w-2/3 py-1 flex justify-center border border-accent-white rounded-lg hover:bg-accent-black-900">
          <input
            type="date"
            value={formatDate(activeDate)}
            onChange={changeActiveMonth}
            className="bg-transparent text-accent-black invert px-1 m-0 text-center text-xl"
          />
        </div>
      </div>
      <div className="w-full h-full flex flex-row items-center justify-center">
        <div className="w-full md:w-[90%] flex flex-row justify-between px-4">
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

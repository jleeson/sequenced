import { useState } from "react";
import CalendarArrow from "./CalendarArrow";
import { formatDate, generateWeek } from "@/utils/date";
import CalendarItem from "./CalendarItem";

import { TaskContext } from "@/hooks/contexts";

import CalendarIcon from "@/assets/calendar.svg";

export default function ActiveCalendar({
  context,
  setContext,
  setActiveDate,
}: {
  context: TaskContext;
}) {
  const [calendarSize, setCalendarSize] = useState(7);
  const [activeWeek, setActiveWeek] = useState(0);
  const [swipeCounter, setSwipeCounter] = useState<number>(0);

  let touchstartX = 0;
  let touchendX = 0;

  const activeDate = context.activeDate;

  const dates = generateWeek(activeDate || new Date(), 0);

  const changeDate = (date: Date) => {
    let tempContext = {
      ...context,
    };

    tempContext.activeDate = date;

    setActiveDate(date);
    setContext(tempContext);
  };

  function changeActiveMonth(e: React.ChangeEvent<HTMLInputElement>) {
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

  const checkDirection = () => {
    if (touchendX < touchstartX) return -1;
    if (touchendX > touchstartX) return 1;

    return 0;
  };

  const touchstart = (e) => {
    touchstartX = e.changedTouches[0].screenX;
  };

  const touchend = (e) => {
    touchendX = e.changedTouches[0].screenX;
    const direction = checkDirection();

    const tempDate = activeDate;

    if (direction == 1) tempDate.setDate(tempDate.getDate() + 7);
    else if (direction == -1) tempDate.setDate(tempDate.getDate() - 7);

    changeDate(tempDate);
  };

  return (
    <div className="w-full h-full px-2">
      <div className="w-full flex justify-center my-3">
        <div className="flex flex-row w-[90%] justify-center">
          <div className="flex justify-center w-full py-1 border border-accent-white rounded-lg hover:bg-accent-black-900">
            <input
              type="date"
              value={formatDate(activeDate)}
              onChange={changeActiveMonth}
              className="bg-transparent text-accent-black invert px-1 m-0 text-center text-xl"
            />
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-row items-center justify-center">
        <div
          className="w-full md:w-[90%] flex flex-row justify-between px-4"
          onTouchStart={touchstart}
          onTouchEnd={touchend}
        >
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

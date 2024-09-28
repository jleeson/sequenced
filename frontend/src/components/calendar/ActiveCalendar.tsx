import { useState } from "react";
import CalendarArrow from "./CalendarArrow";
import { formatDate, generateWeek } from "@/utils/date";
import CalendarItem from "./CalendarItem";

import CalendarIcon from "@/assets/calendar.svg";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

export default function ActiveCalendar({ appData, setAppData, setActiveDate }) {
  const [calendarSize, setCalendarSize] = useState(7);
  const [activeWeek, setActiveWeek] = useState(0);
  const [swipeCounter, setSwipeCounter] = useState<number>(0);

  let touchstartX = 0;
  let touchendX = 0;

  const activeDate = appData.activeDate;

  const dates = generateWeek(activeDate || new Date(), 0);

  const changeDate = (date: Date) => {
    let tempData = {
      ...appData,
    };

    tempData.activeDate = date;

    setActiveDate(date);
    setAppData(tempData);
  };

  function changeActiveMonth(e: React.ChangeEvent<HTMLInputElement>) {
    let activeData = e.target.value.split("-");

    let tempData = {
      ...appData,
    };

    const tempYear = activeData[0];
    const tempMonth = activeData[1] - 1;
    const tempDay = activeData[2];

    tempData.activeDate = new Date();
    tempData.activeDate.setFullYear(tempYear);
    tempData.activeDate.setMonth(tempMonth);
    tempData.activeDate.setDate(tempDay);

    setActiveDate(tempData.activeDate);
    setAppData(tempData);
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
        <div className="flex flex-row w-full h-full justify-evenly items-center">
          <ChevronLeftIcon
            className="hidden lg:flex w-10 h-10 fill-accent-black-100 hover:fill-accent-black-300"
            onClick={(e) => {
              const tempDate = activeDate;
              tempDate.setDate(tempDate.getDate() - 7);
              changeDate(tempDate);
            }}
          />
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
          <ChevronRightIcon
            className="hidden lg:flex w-10 h-10 fill-accent-black-100 hover:fill-accent-black-300"
            onClick={(e) => {
              const tempDate = activeDate;
              tempDate.setDate(tempDate.getDate() + 7);
              changeDate(tempDate);
            }}
          />
        </div>
      </div>
    </div>
  );
}

import today_icon from "@/assets/today.svg";
import { isDateGreater } from "@/utils/data";
import { isOverdue } from "@/utils/date";
import { formatDigits } from "@/utils/math";

export default function TaskItemDate({ date }) {
  const checkRelative = (date) => {
    const today = new Date();
    const checkedDate = new Date(date);
    const relative = checkedDate.getDate() - today.getDate();

    const getTime = (date) => {
      let timeHours = date.getHours();
      let timeprint = "a.m";

      if (timeHours >= 12) {
        timeprint = "p.m";
        timeHours -= 12;
      }

      return `${formatDigits(timeHours, 2)}:${formatDigits(
        date.getMinutes(),
        2
      )} ${timeprint}`;
    };

    if (relative >= 0 && relative <= 1) {
      if (relative == 1) {
        return `Tomorrow`;
      } else {
        return `Today`;
      }
    } else {
      return `${formatDigits(checkedDate.getMonth() + 1, 2)}/${formatDigits(
        checkedDate.getDate(),
        2
      )}`;
    }
  };

  return (
    <div className="w-full h-full flex flex-row gap-2 justify-center items-center">
      <div
        className={`w-full flex justify-end items-center h-6 ${
          isOverdue(date, new Date()) ? "text-red-400" : "text-accent-white"
        }`}
      >
        <h1 className="text-lg text-right">{checkRelative(date)}</h1>
      </div>
      <img src={today_icon} className="invert w-4 h-4" width="16" height="16" />
    </div>
  );
}

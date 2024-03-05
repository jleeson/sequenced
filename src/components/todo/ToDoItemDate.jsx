import today_icon from "@/assets/today.svg";
import { formatDigits } from "@/utils/math";

export default function ToDoItemDate({ date }) {
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
      return `${formatDigits(checkedDate.getMonth(), 2)}/${formatDigits(
        checkedDate.getDate(),
        2
      )}`;
    }
  };

  return (
    <div className="flex flex-row gap-1 items-center">
      <img src={today_icon} className="invert w-4 h-4" width="16" height="16" />
      <div>
        <h1 className="text-lg">{checkRelative(date)}</h1>
      </div>
    </div>
  );
}

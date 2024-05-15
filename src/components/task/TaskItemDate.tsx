import today_icon from "@/assets/today.svg";
import { TaskContext, taskContext } from "@/hooks/contexts";
import { isOverdue } from "@/utils/date";
import { formatDigits } from "@/utils/math";
import { useContext } from "react";

export default function TaskItemDate({ task }) {
  const [context] = useContext<TaskContext>(taskContext);

  const taskDate: Date = new Date(task.date);
  let date: Date = taskDate;

  if (task.repeater) {
    date = new Date();
    date.setHours(
      taskDate.getHours(),
      taskDate.getMinutes(),
      taskDate.getSeconds()
    );
  }

  const checkRelative = (date: Date) => {
    const today = new Date();
    const checkedDate = new Date(date);
    const relative = checkedDate.getDate() - today.getDate();

    if (relative >= 0 && relative <= 1) {
      const hourDifference = checkedDate.getHours() - today.getHours();
      const minuteDifference = checkedDate.getMinutes() - today.getMinutes();

      if (relative == 1) {
        return `Tomorrow`;
      } else {
        if (hourDifference == 0)
          if (minuteDifference < 0) return `${minuteDifference * -1} mins ago`;
          else return `${minuteDifference} mins`;

        if (hourDifference < 0) return `${hourDifference * -1} hours ago`;
        return `${hourDifference} hours`;
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

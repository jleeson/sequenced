import { getNameByDate, matchDate } from "@/utils/date";
import TaskContainer from "../menus/TaskContainer/TaskContainer";
import { isDateWithinProximity } from "@/utils/data";

export default function DayTasks({ day, tasks, setIsInspecting }) {
  const getDayTasks = () => {
    const dayTasks = [];

    for (let task of tasks) {
      if (task.repeater) {
        let isProxim = isDateWithinProximity(task.repeater, task, day);
        if (isProxim) {
          dayTasks.push(task);
        }
      } else {
        if (matchDate(new Date(task.date), day)) {
          dayTasks.push(task);
        }
      }
    }

    return dayTasks;
  };

  return (
    <TaskContainer
      identifier="daily"
      activeFilter="generalTasks"
      title={`${getNameByDate(day.getDay())}'s Tasks`}
      tasks={getDayTasks()}
      setIsInspecting={setIsInspecting}
    />
  );
}

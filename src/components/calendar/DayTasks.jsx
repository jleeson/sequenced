import { getNameByDate, matchDate } from "@/utils/date";
import TaskContainer from "../menus/TaskContainer/TaskContainer";

export default function DayTasks({ day, tasks }) {
  return (
    <TaskContainer
      activeFilter="generalTasks"
      title={`${getNameByDate(day.getDay())}'s Tasks`}
      tasks={tasks.filter(
        (task) => matchDate(new Date(task.date), day)
      )}
    />
  );
}

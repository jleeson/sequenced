import { matchDate } from "@/utils/date";
import TaskContainer from "../menus/TaskContainer/TaskContainer";

export default function DayTasks({ day, tasks }) {
  return (
    <TaskContainer
      activeFilter="generalTasks"
      title={`${day.getMonth() + 1}/${day.getDate()}'s Tasks`}
      tasks={tasks.filter(
        (task) => matchDate(new Date(task.date), day)
      )}
    />
  );
}

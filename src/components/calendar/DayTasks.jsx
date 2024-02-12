import TaskContainer from "../menus/TaskContainer";

export default function DayTasks({ day, tasks }) {
  return (
    <TaskContainer
      title={`${day.getMonth() + 1}/${day.getDate()}'s Tasks`}
      tasks={tasks.filter(
        (task) => new Date(task.date).getDate() == day.getDate()
      )}
    />
  );
}

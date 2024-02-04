import TaskMenu from "../tasks/TaskMenu";

export default function DayTasks({ day, tasks }) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl mt-2 mb-1">
        {`${day.getMonth() + 1}/${day.getDate()}`}'s Tasks
      </h1>
      <TaskMenu tasks={tasks.filter((task) => new Date(task.date).getDate() == day.getDate())} />
    </div>
  );
}

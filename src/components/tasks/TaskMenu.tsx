import { TaskItem } from "../task/TaskItem";

export default function TaskMenu({ tasks, setIsInspecting, taskFilter }) {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <ul className="w-full gap-3 flex flex-col justify-start items-center overflow-y-scroll py-4">
        {tasks.length > 0 &&
          tasks.map((task, key) => (
            <li key={key} className="w-full h-full">
              <TaskItem item={task} setIsInspecting={setIsInspecting} taskFilter={taskFilter} />
            </li>
          ))}
        {tasks.length == 0 && (
          <h1 className="text-lg text-accent-blue">No Tasks</h1>
        )}
      </ul>
    </div>
  );
}

import { ToDoItem } from "../todo/ToDoItem";

export default function TaskMenu({ tasks }) {
  console.log(tasks);
  
  return (
    <div className="flex flex-col items-center">
      <ul className="w-full max-h-[30em] gap-3 flex flex-col justify-start items-center overflow-y-scroll py-4">
        {tasks.length > 0 &&
          tasks.map((task) => (
            <li key={task.id} className="w-[95%]">
              <ToDoItem item={task} />
            </li>
          ))}
        {tasks.length == 0 && (
          <h1 className="text-lg text-accent-blue">No Tasks</h1>
        )}
      </ul>
    </div>
  );
}

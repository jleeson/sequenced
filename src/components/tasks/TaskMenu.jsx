import { ToDoItem } from "../todo/ToDoItem";

export default function TaskMenu({ tasks }) {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <ul className="w-full gap-3 flex flex-col justify-start items-center overflow-y-scroll py-4">
        {tasks.length > 0 &&
          tasks.map((task, key) => (
            <li key={key} className="w-full h-full">
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

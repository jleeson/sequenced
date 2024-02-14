import { useDeleteTask, useUpdateTask } from "@/hooks/tasks";
import { formatShortDate } from "@/utils/date";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ToDoItem({ item }) {
  const navigate = useNavigate();

  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleMarkComplete = (e) => {
    e.stopPropagation();
    updateTask({ id: item.id, data: { ...item, done: !item.done } });
  };

  const handleInteractive = () => {
    navigate(`/todo/view/${item.id}`);
  };

  return (
    <div
      className={`grid grid-cols-7 w-full h-12 justify-between items-center bg-accent-black-900 text-white rounded-xl px-1 py-2 box-border ${
        item.done ? "line-through" : "no-underline"
      }`}
      onClick={handleInteractive}
    >
      <div className="col-span-1 flex flex-row justify-center">
        <div className="w-6 h-6 flex justify-evenly items-center bg-red-50 rounded-full bg-transparent border border-white">
          <div className="w-4 h-4 flex justify-center items-center">
            <input
              type="checkbox"
              checked={item.done}
              className="appearance-none w-full h-full rounded-full bg-transparent checked:bg-accent-blue-500"
              onClick={(e) => e.stopPropagation()}
              onChange={handleMarkComplete}
            />
          </div>
        </div>
      </div>

      <div className="col-span-3 flex flex-col justify-start text-left">
        <h1 className="text-left grow truncate text-md">{item.title}</h1>
      </div>
      <div className="col-span-1 w-16 mx-2 text-lg">
        <h1 className="text-sm">
          {item.date && formatShortDate(new Date(item.date))}
        </h1>
      </div>
      <div className="w-full flex justify-center col-span-2 text-sm">
        {!isDeleting && (
          <button
            onClick={(e) => {
              e.stopPropagation();

              setIsDeleting(true);
            }}
            className="bg-red-400 text-accent-white border px-3 py-1.5 rounded-xl"
          >
            Delete
          </button>
        )}
        {isDeleting && (
          <div className="w-full flex flex-row justify-center items-center gap-4">
            <div
              className="flex justify-center items-center bg-red-600 p-1.5 rounded-md"
              onClick={(e) => {
                e.stopPropagation();
                setIsDeleting(false);
              }}
            >
              <span>N</span>
            </div>
            <div
              className="flex justify-center items-center bg-green-600 p-1.5 rounded-md"
              onClick={(e) => {
                e.stopPropagation();

                deleteTask(item);
              }}
            >
              Y
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

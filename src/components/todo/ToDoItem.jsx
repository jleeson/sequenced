import { useDeleteTask, useUpdateTask } from "@/hooks/tasks";
import { formatShortDate } from "@/utils/date";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ToDoItem({ item }) {
  const navigate = useNavigate();

  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();

  const handleMarkComplete = (e) => {
    e.stopPropagation();
    updateTask({ id: item.id, data: { ...item, done: !item.done } });
  };

  const handleInteractive = () => {
    navigate(`/todo/view/${item.id}`);
  };

  return (
    <div
      className={`flex flex-row w-full h-14 justify-between items-center bg-accent-black-900 text-white rounded-xl px-4 py-2 box-border ${
        item.done ? "line-through" : "no-underline"
      }`}
      onClick={handleInteractive}
    >
      <div className="w-6 h-6 flex justify-center items-center bg-red-50 rounded-full bg-transparent border border-white">
        <input
          type="checkbox"
          checked={item.done}
          className="appearance-none w-6 h-6 rounded-full bg-transparent checked:bg-accent-blue-900"
          onClick={(e) => e.stopPropagation()}
          onChange={handleMarkComplete}
        />
      </div>
      <div className="flex flex-col justify-start text-left mx-4">
        <h1 className="text-left w-32 truncate text-md">
          {item.title}
        </h1>
      </div>
      <div className="w-16 mx-2 text-lg">
        <h1 className="text-sm">
          {item.date && formatShortDate(new Date(item.date))}
        </h1>
      </div>
      <div className="mx-2 text-sm">
        <button
          onClick={(e) => {
            e.stopPropagation();

            deleteTask(item);
          }}
          className="text-red-400 bg-accent-black-900 border px-3 py-1.5 rounded-xl"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

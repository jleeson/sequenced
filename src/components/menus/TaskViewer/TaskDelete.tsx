import { useDeleteTask } from "@/hooks/tasks";
import { useState } from "react";

export function TaskDelete({ task, closeMenu }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate: deleteTask } = useDeleteTask();

  const setDeleteTask = () => {
    deleteTask(task);

    setIsDeleting(false);

    closeMenu();
  };

  if (isDeleting)
    return (
      <div className="flex flex-col w-80 p-2 gap-2">
        <h1 className="text-md text-center text-accent-white my-2">
          Are you sure you want to delete this?
        </h1>
        <div className="flex w-full justify-center items-center gap-8">
          <button
            className="w-16 h-8 text-lg rounded-md bg-accent-red-600 text-accent-white"
            onClick={() => setDeleteTask()}
          >
            Yes
          </button>
          <button
            className="w-16 h-8 text-lg rounded-md bg-accent-blue-600 text-accent-white"
            onClick={() => setIsDeleting(false)}
          >
            No
          </button>
        </div>
      </div>
    );

  return (
    <button
      className="bg-red-600 text-accent-white border border-accent-white py-1 px-4 rounded-md"
      onClick={() => setIsDeleting(true)}
    >
      Delete Task
    </button>
  );
}

import { useTaskById } from "@/hooks/tasks";
import { useNavigate, useParams } from "react-router-dom";
import { formatDateClean } from "@/utils/date";
import ToDoItemSpec from "./ToDoItemSpec";
import { useState } from "react";

export default function ToDoViewer() {
  const { id } = useParams();

  const task = useTaskById(id);
  const navigate = useNavigate();

  const [isSaving, setIsSaving] = useState(false);

  function closeMenu() {
    setIsSaving(true);
    navigate(-1);
  }

  return (
    <>
      {task.isLoading && <span>Loading...</span>}
      {task.isError && <span>{task.error.message}</span>}
      {task.isSuccess && (
        <div className="w-full flex flex-col items-center text-accent-white">
          <div className="w-3/5 flex flex-col items-center">
            <ToDoItemSpec
              task={task}
              text="Title"
              value="title"
              immediateSave={isSaving}
            />
            <ToDoItemSpec
              task={task}
              text="Description"
              value="description"
              backup="No Description Provided"
              immediateSave={isSaving}
            />
            <ToDoItemSpec
              task={task}
              text="Due Date"
              type="date"
              value="date"
              immediateSave={isSaving}
            />
            <ToDoItemSpec
              task={task}
              text="Is Complete?"
              type="bool"
              value="done"
              disabled
            />
          </div>
          <div className="my-4">
            <button
              className="bg-accent-blue rounded-lg text-xl px-4 py-1 text-accent-white my-2"
              onClick={() => closeMenu()}
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </>
  );
}

import { useTaskById } from "@/hooks/tasks";
import { useNavigate, useParams } from "react-router-dom";
import { formatDateClean } from "@/utils/date";

function ToDoItemSpec({ text, value }) {
  return (
    <div className="w-full h-full flex flex-col items-center gap-1">
      <h1 className="text-xl text-accent-white mt-4">{text}</h1>
      <div className="w-full h-full bg-accent-black-800 text-center px-2 rounded-lg">
        <span className="text-lg text-accent-white">{value}</span>
      </div>
    </div>
  );
}

export default function ToDoViewer() {
  const { id } = useParams();

  const task = useTaskById(id);
  const navigate = useNavigate();

  function closeMenu() {
    navigate(-1);
  }

  return (
    <>
      {task.isLoading && <span>Loading...</span>}
      {task.isError && <span>{task.error.message}</span>}
      {task.isSuccess && (
        <div className="w-full flex flex-col items-center text-accent-white">
          <div className="w-3/5 flex flex-col items-center">
            <ToDoItemSpec text="Title" value={task.data.title} />
            <ToDoItemSpec text="ID" value={task.data.id} />
            <ToDoItemSpec
              text="Description"
              value={task.data.description || "No Set Description"}
            />
            <ToDoItemSpec text="Date" value={formatDateClean(new Date(task.data.date))} />
            <ToDoItemSpec
              text="Is Complete?"
              value={task.data.done ? "Yes" : "No"}
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

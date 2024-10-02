import { useDeleteTask } from "@/hooks/tasks";

export function TaskInfoMenuDelete({
  task,
  closeMenu,
  isDeleting,
  setIsDeleting,
  parent
}) {
  const { mutate: deleteTask } = useDeleteTask();

  const setDeleteTask = () => {
    console.log("TASK", task);
    deleteTask(task);

    setIsDeleting(false);

    closeMenu();
  };

  if (isDeleting)
    return (
      <div className="w-full">
        <button
          className={`${
            isDeleting && "blur-sm"
          } bg-red-600 text-accent-white border border-accent-white px-1 py-1 rounded-md hover:bg-red-700`}
          onClick={() => setIsDeleting(true)}
        >
          Delete
        </button>
        <div className="absolute inset-50 bottom-1/4 left-1/4 flex flex-col w-1/2 p-2 gap-2 bg-accent-black-800 border-accent-white border rounded-md">
          <h1 className="text-lg text-center text-accent-white my-2">
            Are you sure you want to delete this?
          </h1>
          <div className="flex w-full justify-center items-center gap-8">
            <button
              className="px-6 py-2 text-lg rounded-md bg-accent-red-600 text-accent-white hover:bg-red-700"
              onClick={() => setDeleteTask()}
            >
              Yes
            </button>
            <button
              className="px-6 py-2 text-lg rounded-md bg-accent-blue-600 text-accent-white hover:bg-blue-700"
              onClick={() => setIsDeleting(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <button
      className="bg-red-600 text-accent-white px-1 py-1 rounded-md hover:bg-red-700 px-6 py-2"
      onClick={() => setIsDeleting(true)}
    >
      Delete
    </button>
  );
}

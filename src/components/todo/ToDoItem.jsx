import { useDeleteTask, useUpdateTask } from "@/hooks/tasks";
import { formatShortDate } from "@/utils/date";
import { Dialog, Popover } from "@headlessui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ToDoItem({ item }) {
  if (!item) item = {};

  const navigate = useNavigate();

  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isManaging, setIsManaging] = useState(false);

  const handleMarkComplete = (e) => {
    e.stopPropagation();
    updateTask({ id: item.id, data: { ...item, done: !item.done } });
  };

  const handleInteractive = () => {
    navigate(`/todo/view/${item.id}`);
  };

  const handleDelete = () => {
    deleteTask(item);
  };

  return (
    <div
      className={`grid grid-cols-7 w-full h-12 justify-between items-center bg-accent-black-900 text-white rounded-xl px-1 py-2 box-border ${
        item.done ? "line-through" : "no-underline"
      }`}
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
        <Dialog open={isManaging} onClose={() => setIsManaging(false)}>
          <div className="fixed inset-0 flex w-screen items-center justify-center">
            <Dialog.Panel className="bg-accent-white p-4 rounded-lg">
              <Dialog.Title className="text-lg text-accent-black my-1">
                Manage Task
              </Dialog.Title>
              <div className="w-32 flex flex-col bg-accent-white gap-2">
                <a
                  className="w-32 h-6 text-md text-accent-white bg-accent-blue text-center rounded-md"
                  onClick={handleInteractive}
                >
                  View
                </a>
                <a
                  className="w-32 h-6 text-md text-accent-white bg-accent-red-500 text-center rounded-md"
                  onClick={() => setIsDeleting(true)}
                >
                  Delete
                </a>
                <a className="w-32 h-6 text-md text-accent-white bg-purple-500 text-center rounded-md text-wrap">
                  Mark Complete
                </a>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
        {/* <Popover className="relative">
          <Popover.Button className="bg-accent-purple-400 text-accent-white border w-14 h-7 rounded-xl flex justify-center items-center">
            More
          </Popover.Button>

          <Popover.Panel className="absolute z-10">
            <div className="w-32 flex flex-col bg-accent-white">
              <a className="text-md text-accent-black">View</a>
              <a className="text-md text-accent-black">Delete</a>
              <a className="text-md text-accent-black">Mark Complete</a>
            </div>
          </Popover.Panel>
        </Popover> */}
        <button
          onClick={(e) => {
            // e.stopPropagation();

            setIsManaging(true);
          }}
          className="bg-accent-purple-400 text-accent-white border w-14 h-7 rounded-xl flex justify-center items-center"
        >
          More
        </button>
        <Dialog
          open={isDeleting}
          onClose={() => setIsDeleting(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center">
            <Dialog.Panel className="flex flex-col gap-2 p-4 bg-accent-white rounded-lg">
              <Dialog.Title className="text-xl">Delete Task</Dialog.Title>
              <Dialog.Description className="text-lg">
                This will delete the tapped task.
              </Dialog.Description>

              <div className="my-2">
                <p className="text-lg mb-4">
                  Are you sure you want to delete this task?
                </p>
                <div className="flex flex-row gap-8 justify-center">
                  <button
                    onClick={handleDelete}
                    className="bg-accent-red-400 px-4 py-2 rounded-lg text-accent-white"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setIsDeleting(false)}
                    className="bg-accent-blue-400 px-4 py-2 rounded-lg text-accent-white"
                  >
                    No
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

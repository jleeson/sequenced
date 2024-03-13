import { Dialog, Transition } from "@headlessui/react";
import { useReducer } from "react";
import { formatDateTime } from "@/utils/date";
import { useAddTask } from "@/hooks/tasks";

import ToDoAddMenuItem from "./ToDoAddMenuItem";

const reducer = (data, payload) => ({ ...data, ...payload });

export default function ToDoAddMenu({ isOpen, setIsOpen }) {
  const [task, setTask] = useReducer(reducer, {
    title: "",
    description: "",
    date: new Date(Date.now()),
  });

  const { mutate: addTask } = useAddTask();

  const ResetForm = () => {
    setTask({
      title: "",
      description: "",
      date: new Date(Date.now()),
    });

    setIsOpen(false);
  };

  const SubmitForm = () => {
    addTask(task);

    ResetForm();
  };

  const CancelForm = (e) => {
    ResetForm();
  };

  return (
    <Transition
      as={Dialog}
      show={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50 flex items-center justify-center"
    >
      <div className="flex flex-row items-end justify-center fixed inset-0 w-full h-full">
        <Transition.Child
          as={Dialog.Panel}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className="flex flex-col w-full bg-accent-white px-2 py-1 rounded-t-xl pb-8 items-center"
        >
          <div className="flex flex-col w-3/4">
            <div className="flex flex-col items-center text-xl py-1 my-1">
              <Dialog.Title>New Item</Dialog.Title>
              <hr className="bg-black w-24 h-0.5 my-2" />
              <Dialog.Description className="flex grow-0 text-center text-base">
                Be able to add items using the provided details
              </Dialog.Description>
            </div>

            <div className="flex flex-col gap-1">
              <form id="todo-addmenu">
                <ToDoAddMenuItem
                  name="Name"
                  value={task.title}
                  onChange={(e) => setTask({ title: e.target.value })}
                />
                <ToDoAddMenuItem
                  name="Description"
                  type="textarea"
                  value={task.description}
                  onChange={(e) => setTask({ description: e.target.value })}
                />
                <ToDoAddMenuItem
                  name="Due Date"
                  type="datetime-local"
                  value={formatDateTime(task.date)}
                  onChange={(e) => setTask({ date: new Date(e.target.value) })}
                />
              </form>
            </div>

            <div className="flex flex-row justify-evenly mt-6">
              <button
                className="border border-accent-black w-32 h-10 rounded-lg text-lg bg-green-600 text-accent-white"
                onClick={SubmitForm}
              >
                Create
              </button>
              <button
                className="border border-accent-black w-32 h-10 rounded-lg text-lg bg-red-600 text-accent-white"
                onClick={CancelForm}
              >
                Cancel
              </button>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
}

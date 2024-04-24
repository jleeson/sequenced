import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { useContext, useReducer, useRef } from "react";
import { formatDateTime, matchDate } from "@/utils/date";
import { useAddTask, useTasks } from "@/hooks/tasks";

import TaskAddMenuItem from "./TaskAddMenuItem";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import TaskAddMenuItemCustom from "./TaskAddMenuItemCustom";
import { taskContext } from "@/hooks/contexts";
import { createID } from "@/utils/id";

const reducer = (data: any, payload: any) => ({ ...data, ...payload });

export default function TaskAddMenu({
  isOpen,
  setIsOpen,
}) {
  const [context, setContext] = useContext(taskContext);
  const tasks = useTasks();

  const [task, setTask] = useReducer(reducer, {
    title: "",
    description: "",
    date: new Date(context.activeDate),
  });

  if (!matchDate(new Date(task.date), new Date(context.activeDate)))
    setTask({ date: new Date(context.activeDate) });

  const { mutate: addTask } = useAddTask();

  const ChangeDate = (e) => {

  }

  const ResetForm = () => {
    setTask({
      title: "",
      description: "",
      date: new Date(context.activeDate),
    });

    setIsOpen(false);
  };

  const SubmitForm = () => {
    task.id = createID(20);

    addTask(task);

    ResetForm();
  };

  const CancelForm = (e) => {
    ResetForm();
  };

  const ref = useRef(null);

  return (
    <Transition
      as={Dialog}
      show={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50 flex items-center justify-center"
      initialFocus={ref}
      ref={ref}
    >
      <div className="flex flex-row items-end justify-center fixed inset-0 w-full h-full">
        <Transition.Child
          as={Dialog.Panel}
          enter="transition duration-500"
          enterFrom="translate-y-96"
          enterTo="translate-y-0"
          leave="ease-in duration-200"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-96"
          className="flex flex-col w-full bg-accent-black-900 text-accent-white border border-accent-white px-2 py-1 rounded-t-xl pb-8 items-center"
        >
          <div className="flex flex-col w-3/4">
            <div className="flex flex-col items-center text-xl py-1 my-1">
              <Dialog.Title>New Item</Dialog.Title>
              <hr className="bg-black w-24 h-0.5 my-2" />
              <Dialog.Description className="flex grow-0 text-center text-base">
                Be able to add items using the provided details
              </Dialog.Description>
            </div>

            <div className="flex flex-col gap-3">
              <TaskAddMenuItem
                name="Name"
                value={task.title}
                onChange={(e) => setTask({ title: e.target.value })}
              />
              <TaskAddMenuItem
                name="Description"
                type="textarea"
                value={task.description}
                onChange={(e) => setTask({ description: e.target.value })}
              />
              <TaskAddMenuItem
                name="Due Date"
                type="datetime-local"
                value={formatDateTime(context.activeDate)}
                onChange={(e) => {
                  ChangeDate(new Date(e.target.value));
                  setTask({ date: new Date(e.target.value) });
                }}
              />
              <TaskAddMenuItemCustom name="Repeating">
                <select
                  className="border border-accent-white bg-accent-black-500 px-2 py-1"
                  value={task.repeater}
                  onChange={(e) => {
                    setTask({ repeater: e.target.value });
                  }}
                >
                  <option value="">Do Not Repeat</option>
                  <option value="daily">Every Day</option>
                  <option value="weekly">Every Week</option>
                  <option value="bi-weekly">Every 2 Weeks</option>
                  <option value="monthly">Every Month</option>
                </select>
              </TaskAddMenuItemCustom>
            </div>

            <div className="flex flex-row justify-evenly mt-6">
              <button
                className="border border-accent-black w-32 h-10 rounded-lg text-lg bg-red-600 text-accent-white"
                onClick={CancelForm}
              >
                Cancel
              </button>
              <button
                className="border border-accent-black w-32 h-10 rounded-lg text-lg bg-green-600 text-accent-white"
                onClick={SubmitForm}
              >
                Create
              </button>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
}

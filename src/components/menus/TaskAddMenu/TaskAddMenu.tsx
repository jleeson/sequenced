import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { useContext, useReducer, useRef } from "react";
import { formatDateTime, matchDate } from "@/utils/date";
import { Task, useAddTask, useTasks } from "@/hooks/tasks";

import TaskAddMenuItem from "./TaskAddMenuItem";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import TaskAddMenuItemCustom from "./TaskAddMenuItemCustom";
import { TaskContext, taskContext } from "@/hooks/contexts";
import { createID } from "@/utils/id";
import { getPending, scheduleNotification } from "@/utils/notifs";
import TaskAddMenuSelect from "./TaskAddMenuSelect";

const reducer = (data: any, payload: any) => ({ ...data, ...payload });

export default function TaskAddMenu({ isOpen, setIsOpen }) {
  const [context, setContext] = useContext<TaskContext>(taskContext);
  const tasks = useTasks();

  const [task, setTask] = useReducer(reducer, {
    title: "",
    description: "",
    date: new Date(context.tempActiveDate || context.activeDate),
  });

  const { mutate: addTask } = useAddTask();

  const ChangeDate = (date: Date) => {
    setContext({
      ...context,
      activeDate: date,
    });
  };

  const ChangeTempDate = (date: Date) => {
    setContext({
      ...context,
      tempActiveDate: date,
    });
  };

  const ResetForm = () => {
    setTask({
      title: "",
      description: "",
      date: new Date(context.activeDate),
    });

    setIsOpen(false);
  };

  const SubmitForm = () => {
    if (!task.id) task.id = createID(20);

    addTask(task);
    SetNotification(task);

    ResetForm();
  };

  const CancelForm = (e) => {
    ResetForm();
  };

  const CloseMenu = (e) => {
    if (e) e.stopPropagation();
    setIsOpen(false);
  };

  const ref = useRef(null);

  const SetNotification = async (task: Task) => {
    if (!task || task.reminder == "") return;

    const setDate: Date = task.date || new Date();

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    switch (task.reminder) {
      case "15":
        setDate.setTime(setDate.getTime() - 15 * minute);
        break;

      case "30":
        setDate.setTime(setDate.getTime() - 30 * minute);
        break;

      case "45":
        setDate.setTime(setDate.getTime() - 45 * minute);
        break;

      case "60":
        setDate.setTime(setDate.getTime() - 1 * hour);
        break;

      case "120":
        setDate.setTime(setDate.getTime() - 2 * hour);
        break;

      case "720":
        setDate.setTime(setDate.getTime() - 12 * hour);
        break;

      case "1440":
        setDate.setTime(setDate.getTime() - 1 * day);
        break;
    }


    const notif = await scheduleNotification({
      id: Math.floor(Math.random() * 2147483647),
      title: "Sequenced: Do Your Task",
      body: `Task: ${task.title}`,
      schedule: {
        at: setDate,
      },
    });

    console.log("NOTIFI", notif);
  };

  return (
    <Transition
      as={Dialog}
      show={isOpen}
      onClose={(e) => CloseMenu(e)}
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
          className="flex flex-col w-full bg-accent-black-900 text-accent-white shadow-inner shadow-accent-black-400 px-2 py-1 rounded-t-xl pb-8 items-center"
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
                onChange={(e) => setTask({ ...task, title: e.target.value })}
              />
              <TaskAddMenuItem
                name="Description"
                type="textarea"
                value={task.description}
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
              />
              {task.date.getTime() != 0 && (
                <TaskAddMenuItem
                  name="Due Date"
                  type="datetime-local"
                  value={formatDateTime(context.activeDate)}
                  onChange={(e) => {
                    ChangeDate(new Date(e.target.value));
                    setTask({ ...task, date: new Date(e.target.value) });
                  }}
                />
              )}
              <div className={`my-2`}>
                <button
                  onClick={() => {
                    if (task.date.getTime() != 0) {
                      ChangeTempDate(new Date(0));
                      setTask({ ...task, date: new Date(0) });
                    } else {
                      ChangeDate(new Date());
                      setTask({ ...task, date: new Date() });
                    }
                  }}
                  className={`px-2 py-2 ${
                    task.date.getTime() != 0 && "bg-accent-red-500"
                  } ${
                    task.date.getTime() == 0 && "bg-accent-blue-500"
                  } w-40 text-center rounded-md`}
                >
                  {task.date.getTime() != 0 && "Remove Due Date"}
                  {task.date.getTime() == 0 && "Add Due Date"}
                </button>
              </div>
              <TaskAddMenuSelect
                name="Remind Me"
                value={task.reminder}
                onChange={async (e) => {
                  setTask({ reminder: e.target.value });
                }}
                options={[
                  { name: "Do not remind", value: "" },
                  { name: "0min before", value: "0" },
                  { name: "15min before", value: "15" },
                  { name: "30min before", value: "30" },
                  { name: "45min before", value: "45" },
                  { name: "1hr Before", value: "60" },
                  { name: "2hr Before", value: "120" },
                  { name: "12hr before", value: "720" },
                  { name: "1 day before", value: "1440" },
                ]}
              />
              <TaskAddMenuSelect
                name="Repeating"
                value={task.repeater}
                onChange={(e) => {
                  setTask({ repeater: e.target.value });
                }}
                options={[
                  { name: "Do Not Repeat", value: "" },
                  { name: "Every Day", value: "daily" },
                  { name: "Every Week", value: "weekly" },
                  { name: "Every 2 Weeks", value: "bi-weekly" },
                  { name: "Every Month", value: "monthly" },
                ]}
              />
            </div>

            <div className="flex flex-row justify-left mt-6 gap-3">
              <div className="flex grow justify-start">
                <button
                  className="border border-accent-white w-full h-10 rounded-lg text-lg bg-red-600 text-accent-white"
                  onClick={CancelForm}
                >
                  Cancel
                </button>
              </div>

              <div className="flex grow justify-end">
                <button
                  className="border border-accent-white w-full h-10 rounded-lg text-lg bg-green-600 text-accent-white"
                  onClick={SubmitForm}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
}

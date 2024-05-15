import { useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { TaskText } from "./TaskText";
import { TaskDelete } from "./TaskDelete";
import { useUpdateTask } from "@/hooks/tasks";
import { scheduleNotification } from "@/utils/notifs";

export default function TaskViewer({ context, setContext, isOpen, setIsOpen }) {
  const { mutate: updateTask } = useUpdateTask();
  const [isDeleting, setIsDeleting] = useState(false);

  const task = context?.activeTask;
  const ref = useRef(null);

  const update = (data) => {
    const mergedData = {
      ...context.activeTask,
      ...data,
    };

    updateTask({
      id: task.id,
      data: mergedData,
    });

    setContext({
      ...context,
      activeTask: mergedData,
    });
  };

  function closeMenu() {
    setContext({
      ...context,
      activeTask: null,
    });
    setIsOpen(false);
  }

  const ChangeTask = (data) => {
    setContext({
      ...context,
      activeTask: data,
    });
  };

  const CheckTime = (task) => {
    if (new Date(task?.date).getTime() != 0) return true;

    return false;
  };

  const SetNotification = (data) => {
    if (!data || data == "") return;

    const setDate: Date = task.date;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    switch (data) {
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

    scheduleNotification({
      id: task.id,
      title: "Sequenced: Do Your Task",
      body: `Task: ${task.title}`,
      schedule: {
        at: setDate,
      },
    });
  };

  return (
    <Transition
      as={Dialog}
      show={isOpen}
      onClose={() => {}}
      className="relative z-50 flex items-center justify-center"
      initialFocus={ref}
      ref={ref}
    >
      {task && (
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
            <div
              className={`inset-0 w-64 h-fit bg-accent-black-900 flex flex-col items-center p-4 rounded-t-xl`}
            >
              <div className={`${isDeleting && "blur-sm"} `}>
                <Dialog.Title className="text-xl text-accent-white my-2">
                  Viewing Task
                </Dialog.Title>
                <div className="flex flex-col gap-2">
                  <TaskText
                    name="Title"
                    value={task?.title}
                    handleSave={(data) => update({ title: data })}
                  />
                  <TaskText
                    name="Description"
                    value={task?.description}
                    handleSave={(data) => update({ description: data })}
                    size="medium"
                  />
                  {CheckTime(task) && (
                    <TaskText
                      name="Due Date"
                      type="datetime-local"
                      value={new Date(task?.date)}
                      handleSave={(data) => update({ date: data })}
                    />
                  )}
                  <div className={`my-2`}>
                    <button
                      onClick={() => {
                        if (CheckTime(task)) {
                          ChangeTask({ ...task, date: new Date(0) });
                          update({ date: new Date(0) });
                        } else {
                          ChangeTask({ ...task, date: new Date() });
                          update({ date: new Date() });
                        }
                      }}
                      className={`px-2 py-2 ${
                        CheckTime(task) && "bg-accent-red-500"
                      } ${
                        !CheckTime(task) && "bg-accent-blue-500"
                      } w-40 text-center rounded-md`}
                    >
                      {CheckTime(task) && "Remove Due Date"}
                      {!CheckTime(task) && "Add Due Date"}
                    </button>
                  </div>
                  <TaskText
                    name="Remind Me"
                    type="select"
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
                    value={task?.reminder}
                    onChange={(e) => {
                      SetNotification(e.target.value);
                    }}
                    handleSave={(data) => SetNotification(data)}
                    className="capitalize"
                  />
                  <TaskText
                    name="Repeating"
                    type="select"
                    options={[
                      { name: "Do not Repeat", value: "" },
                      { name: "Every Day", value: "daily" },
                      { name: "Every Week", value: "weekly" },
                      { name: "Every 2 Weeks", value: "bi-weekly" },
                      { name: "Every Month", value: "monthly" },
                    ]}
                    value={task?.repeater}
                    onChange={(e) => {
                      update({ repeater: e.target.value });
                    }}
                    handleSave={(data) => update({ repeater: data })}
                    className="capitalize"
                  />
                </div>
              </div>
              <div className="w-64 flex flex-row justify-left mt-6 gap-3">
                <div
                  className={`flex grow justify-end ${isDeleting && "blur-sm"}`}
                >
                  <button
                    onClick={() => closeMenu()}
                    className="w-full bg-blue-600 text-accent-white border border-accent-white px-1 py-1 rounded-md"
                  >
                    Close
                  </button>
                </div>
                <div className="flex grow justify-start">
                  <TaskDelete
                    task={task}
                    closeMenu={closeMenu}
                    isDeleting={isDeleting}
                    setIsDeleting={setIsDeleting}
                  />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      )}
    </Transition>
  );
}

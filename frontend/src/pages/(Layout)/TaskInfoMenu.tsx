import { useApp } from "@/hooks/app";

import {
  Task,
  createInitialTaskData,
  useAddTask,
  useTaskById,
  useUpdateTask,
} from "@/hooks/tasks";

import { createID } from "@/utils/id";
import { scheduleNotification } from "@/utils/notifs";

import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";

import { Dispatch, SetStateAction, useReducer, useRef, useState } from "react";
import { formatDateTime } from "@/utils/date";
import { TaskInfoMenuDelete } from "./(TaskInfoMenu)/TaskInfoMenuDelete";

import TaskInfoMenuItem from "./(TaskInfoMenu)/TaskInfoMenuItem";
import TaskInfoMenuSelect from "./(TaskInfoMenu)/TaskInfoMenuSelect";
import TaskInfoMenuSubtaskMenu from "./(TaskInfoMenu)/TaskInfoMenuSubtaskMenu";

interface TaskInfoMenuSettings {
  type?: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function TaskInfoMenu({
  type,
  isOpen,
  setIsOpen,
}: TaskInfoMenuSettings) {
  const [appData, setAppData] = useApp();

  const [isDeleting, setIsDeleting] = useState(false);

  const reducer = (
    data: Record<string, any>,
    payload: Record<string, any>
  ) => ({ ...data, ...payload });

  const { mutate: addTask } = useAddTask();
  const { mutate: updateTask } = useUpdateTask();

  const initialData: Task = {
    ...createInitialTaskData(),
    date: new Date(appData.tempActiveDate ?? appData.activeDate),
  };

  const [tempData, setTempData] = useReducer(reducer, initialData);

  if (type == "edit") {
    if (
      appData.activeTask?.id != undefined &&
      tempData.id != appData.activeTask?.id
    ) {
      setTempData({
        ...appData.activeTask,
        date: new Date(appData?.activeTask?.date),
      });

      console.log("SET TEMP DATA", {
        ...appData.activeTask,
        id: undefined,
        date: new Date(appData?.activeTask?.date),
      });
    }
  }

  const changeAppDate = (date: Date) => {
    setAppData({
      ...appData,
      activeDate: date,
    });
  };

  const changeTempAppDate = (date: Date) => {
    setAppData({
      ...appData,
      tempActiveDate: date,
    });
  };

  const createNotification = async (task: Task) => {
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

  const resetForm = () => {
    setTempData(null);
    setIsOpen(false);
  };

  const submitForm = () => {
    if (type == "edit") {
      saveAll();
      resetForm();
      return;
    }

    if (!tempData.id) tempData.id = createID(20);

    addTask(tempData);
    createNotification(tempData);

    resetForm();
  };

  const closeMenu = (e?: React.MouseEvent<any>) => {
    if (e) e.stopPropagation();

    setIsOpen(false);
  };

  const oldTask = useTaskById(tempData.id);

  const saveAll = () => {
    if (appData.activeParent) {
      const subTaskData = tempData;

      console.log("Sub Task Data", subTaskData);

      const parentData = appData.activeParent;

      console.log("Parent Data", parentData);

      const newSubs = appData.activeParent.subtasks;

      console.log("Old Subtasks", newSubs);

      for (let i = 0; i < newSubs.length; i++) {
        if (newSubs[i].id == subTaskData.id) newSubs[i] = subTaskData;
      }

      console.log("New Subtasks", newSubs);

      updateTask({
        id: parentData.id,
        data: {
          ...parentData,
          subtasks: newSubs,
        },
      });

      return;
    }

    const taskData = oldTask.data;

    console.log("Task Data", taskData);
    console.log("Temp Data", tempData);

    updateTask({
      id: tempData.id,
      data: {
        ...tempData,
      },
    });

    console.log("Data To Add", {
      tempData,
    });
  };

  const ref = useRef(null);

  return (
    <Transition
      show={isOpen}
      enter="transition duration-500"
      // enterFrom="translate-y-96"
      // enterTo="translate-y-0"
      // leave="ease-in duration-200"
      // leaveFrom="translate-y-0"
      // leaveTo="-translate-y-96"
    >
      <Dialog
        onClose={() => closeMenu()}
        initialFocus={ref}
        ref={ref}
        className="relative z-50 flex items-center justify-center"
      >
        {/* TODO: Change MT-36 to be dynamic with AD */}
        <div
          className={`flex flex-row items-end justify-center fixed bottom-0 inset-0 w-full h-full pt-36`}
        >
          <DialogPanel className="flex flex-col w-full h-full overflow-y-scroll bg-accent-black-900 text-accent-white shadow-inner shadow-accent-black-400 px-2 py-1 rounded-t-xl pb-8 items-center">
            <div className="flex flex-col w-3/4 gap-6">
              <div
                className={`${
                  isDeleting && "blur-sm"
                } flex flex-col items-center text-xl py-1 my-1`}
              >
                <DialogTitle>
                  {type == "add" ? "New Item" : "Viewing Item"}
                </DialogTitle>
                <hr className="bg-black w-24 h-0.5 my-2" />
                <Description className="flex grow-0 text-center text-base">
                  Be able to {type == "add" ? "add" : "edit"} items using the
                  provided details
                </Description>
              </div>
              <div className={`flex flex-col gap-3 ${isDeleting && "blur-sm"}`}>
                <TaskInfoMenuItem
                  name="Name"
                  value={tempData?.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTempData({ ...tempData, title: e.target.value })
                  }
                />

                {/* <TaskInfoMenuSelect
                  name="Task Type"
                  value={tempData.type}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTempData({ type: e.target.value });
                  }}
                  options={[
                    { name: "Standard", value: "" },
                    { name: "Group", value: "group" },
                  ]}
                /> */}

                {tempData.type == "group" && (
                  <TaskInfoMenuSubtaskMenu
                    subtasks={tempData.subtasks}
                    tempData={tempData}
                    setTempData={setTempData}
                    setIsOpen={setIsOpen}
                  />
                )}

                <TaskInfoMenuItem
                  name="Description"
                  type="textarea"
                  value={tempData.description}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTempData({ ...tempData, description: e.target.value })
                  }
                />

                {tempData.date.getTime() != 0 && (
                  <TaskInfoMenuItem
                    name="Due Date"
                    type="datetime-local"
                    value={formatDateTime(appData.activeDate)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      changeAppDate(new Date(e.target.value));
                      setTempData({
                        ...tempData,
                        date: new Date(e.target.value),
                      });
                    }}
                  />
                )}

                {/* TODO: Make Component [DELETE DUE DATE] */}
                <div className={`my-2`}>
                  <button
                    onClick={() => {
                      if (tempData.date.getTime() != 0) {
                        changeTempAppDate(new Date(0));
                        setTempData({ ...tempData, date: new Date(0) });
                      } else {
                        changeAppDate(new Date());
                        setTempData({ ...tempData, date: new Date() });
                      }
                    }}
                    className={`px-2 py-2 ${
                      tempData.date.getTime() != 0 &&
                      "bg-accent-red-500 hover:bg-accent-red-600"
                    } ${
                      tempData.date.getTime() == 0 &&
                      "bg-accent-blue-500 hover:bg-accent-blue-600"
                    } w-40 text-center rounded-md`}
                  >
                    {tempData.date.getTime() != 0 && "Remove Due Date"}
                    {tempData.date.getTime() == 0 && "Add Due Date"}
                  </button>
                </div>

                <TaskInfoMenuSelect
                  name="Remind Me"
                  value={tempData.reminder}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTempData({ reminder: e.target.value });
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

                <TaskInfoMenuSelect
                  name="Repeating"
                  value={tempData.repeater}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTempData({ repeater: e.target.value });
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
              {type == "edit" && (
                <div className="">
                  <TaskInfoMenuDelete
                    parent={appData.activeParent}
                    task={tempData}
                    closeMenu={closeMenu}
                    isDeleting={isDeleting}
                    setIsDeleting={setIsDeleting}
                  />
                </div>
              )}
              <div
                className={`flex flex-row justify-left gap-3 ${
                  isDeleting && "blur-sm"
                }`}
              >
                <div className="flex grow justify-start">
                  <button
                    className="w-full h-10 rounded-lg text-lg bg-red-600 text-accent-white hover:bg-red-700"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                </div>

                <div className="flex grow justify-end">
                  <button
                    className={`w-full h-10 rounded-lg text-lg ${
                      type == "add"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-accent-white`}
                    onClick={submitForm}
                  >
                    {type == "add" ? "Create" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
}

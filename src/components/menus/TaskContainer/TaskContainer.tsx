import { useContext, useState } from "react";
import TaskMenu from "../../tasks/TaskMenu";

import dropdown_icon from "@/assets/dropdown.svg";
import dropup_icon from "@/assets/dropup.svg";

import visible_icon from "@/assets/visible.svg";
import invisible_icon from "@/assets/invisible.svg";

import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";

import { taskContext } from "@/hooks/contexts";
import { Disclosure, Menu } from "@headlessui/react";
import TaskMenuItem from "./TaskMenuItem";
import { matchDate } from "@/utils/date";
import { isTaskDone } from "@/utils/data";

export default function TaskContainer({ title, tasks, activeFilter }) {
  const [context, setContext] = useContext(taskContext);
  const [taskFilter, setTaskFilter] = useState("incomplete");

  const baseTasks = tasks;

  let active = context.task.menus[activeFilter];

  const handleClick = () => {
    let tempContext = {
      ...context,
    };

    tempContext.task.menus[activeFilter] = !active;

    setContext(tempContext);
  };

  tasks = tasks.map((task) => {
    if (typeof task.done == "undefined") task.done = false;

    return task;
  });

  let taskDisplay = tasks;

  if (taskFilter == "all") taskDisplay = tasks;
  else if (taskFilter == "incomplete")
    taskDisplay = tasks.filter((task) =>
      isTaskDone(task, context.activeDate)
    );

  return (
    <div className="flex flex-col items-center w-[90%] my-2">
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <Disclosure.Button
              as="div"
              className="w-full flex flex-row items-center bg-transparent border border-accent-white rounded-lg px-2"
            >
              <div className="w-full flex flex-row justify-between">
                <div className="flex flex-row items-center py-1">
                  <ChevronRightIcon
                    className={open ? "rotate-90 transform" : ""}
                    width="32"
                  />
                  <div className="flex flex-row gap-2">
                    <h1 className="text-xl">{title}</h1>
                    {tasks.filter((task) => !task.done).length > 0 && (
                      <h1 className="text-xl text-accent-black-400">
                        ({tasks.filter((task) => !task.done).length}/
                        {baseTasks.length})
                      </h1>
                    )}
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  <Menu>
                    <Menu.Button>
                      <AdjustmentsHorizontalIcon width="32" />
                    </Menu.Button>
                    <div className="relative inset-0 z-50">
                      <Menu.Items className="flex flex-col absolute right-4 top-4 gap-2 bg-black border border-accent-white rounded-lg py-4 px-4">
                        <TaskMenuItem
                          active={taskFilter == "all"}
                          handleClick={() => setTaskFilter("all")}
                        >
                          <span>All</span>
                        </TaskMenuItem>
                        <TaskMenuItem
                          active={taskFilter == "incomplete"}
                          handleClick={() => setTaskFilter("incomplete")}
                        >
                          <span>Incomplete</span>
                        </TaskMenuItem>
                      </Menu.Items>
                    </div>
                  </Menu>
                </div>
              </div>
            </Disclosure.Button>
            <Disclosure.Panel className="w-full h-full">
              {!active && <TaskMenu tasks={taskDisplay} />}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}

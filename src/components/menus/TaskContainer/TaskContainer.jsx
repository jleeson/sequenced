import { useContext, useState } from "react";
import TaskMenu from "../../tasks/TaskMenu";

import dropdown_icon from "@/assets/dropdown.svg";
import dropup_icon from "@/assets/dropup.svg";

import visible_icon from "@/assets/visible.svg";
import invisible_icon from "@/assets/invisible.svg";

import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";

import { ToDoContext } from "@/hooks/contexts";
import { Disclosure } from "@headlessui/react";

export default function TaskContainer({ title, tasks, activeFilter }) {
  const [context, setContext] = useContext(ToDoContext);
  const [hiddenVisible, setHiddenVisible] = useState(false);

  let active = context.todo.menus[activeFilter];

  let imgSrc;
  if (!active) imgSrc = dropdown_icon;
  else imgSrc = dropup_icon;

  let eyeIcon;
  if (hiddenVisible) eyeIcon = visible_icon;
  else eyeIcon = invisible_icon;

  const handleClick = () => {
    let tempContext = {
      ...context,
    };

    tempContext.todo.menus[activeFilter] = !active;

    setContext(tempContext);
  };

  const handleVis = () => {
    setHiddenVisible(!hiddenVisible);
  };

  let taskDisplay = tasks;

  if (hiddenVisible) taskDisplay = tasks;

  return (
    <div className="flex flex-col items-center w-[90%] my-2">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="w-full flex flex-row items-center bg-transparent border border-accent-white rounded-lg px-2">
              <div className="w-full flex flex-row justify-between">
                <div className="flex flex-row items-center py-1">
                  <ChevronRightIcon
                    className={open ? "rotate-90 transform" : ""}
                    width="32"
                  />
                  <h1 className="text-xl">{title}</h1>
                </div>
                <div className="flex flex-row items-center">
                  <AdjustmentsHorizontalIcon width="32" />
                </div>
              </div>
            </Disclosure.Button>
            <Disclosure.Panel>
              {!active && <TaskMenu tasks={taskDisplay} />}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>

    // <div className="flex flex-col items-center w-[90%] my-2">
    //   <div className="flex flex-row">
    //     <div
    //       className="flex flex-row justify-evenly items-center"
    //       onClick={handleClick}
    //     >
    //       <img src={imgSrc} className="mt-1 w-8 h-8 invert" />

    //       <img src={imgSrc} className="mt-1 w-8 h-8 invert" />
    //     </div>
    //     <div className="flex items-center" onClick={handleVis}>
    //       <img src={eyeIcon} className="absolute invert" />
    //     </div>
    //   </div>
    //   {!active && <TaskMenu tasks={taskDisplay} />}
    // </div>
  );
}

import { useContext, useState } from "react";
import TaskMenu from "../tasks/TaskMenu";

import dropdown_icon from "@/assets/dropdown.svg";
import dropup_icon from "@/assets/dropup.svg";
import { ToDoContext } from "@/hooks/contexts";

export default function TaskContainer({ title, tasks, activeFilter }) {
  const [context, setContext] = useContext(ToDoContext);

  let active = context.todo.menus[activeFilter];

  let imgSrc;
  if (active) imgSrc = dropdown_icon;
  else imgSrc = dropup_icon;

  const handleClick = () => {
    let tempContext = {
      ...context,
    };

    tempContext.todo.menus[activeFilter] = !active;

    setContext(tempContext);
  };

  return (
    <div className="flex flex-col items-center w-[90%] my-2">
      <div
        className="flex flex-row justify-evenly items-center"
        onClick={handleClick}
      >
        <img src={imgSrc} className="mt-1 w-8 h-8 invert" />
        <h1 className="text-xl mt-2 mb-1">{title}</h1>
        <img src={imgSrc} className="mt-1 w-8 h-8 invert" />
      </div>
      {active && <TaskMenu tasks={tasks} />}
    </div>
  );
}

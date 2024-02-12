import { useState } from "react";
import TaskMenu from "../tasks/TaskMenu";

import dropdown_icon from "@/assets/dropdown.svg";
import dropup_icon from "@/assets/dropup.svg";

export default function TaskContainer({ title, tasks }) {
  const [active, setActive] = useState(false);

  let imgSrc;
  if (active) imgSrc = dropdown_icon;
  else imgSrc = dropup_icon;

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div className="flex flex-col items-center w-[90%] my-2" onClick={handleClick}>
      <div className="flex flex-row justify-evenly items-center">
        <img src={imgSrc} className="mt-1 w-8 h-8 invert" />
        <h1 className="text-xl mt-2 mb-1">{title}</h1>
        <img src={imgSrc} className="mt-1 w-8 h-8 invert" />
      </div>
      {active && <TaskMenu tasks={tasks} />}
    </div>
  );
}

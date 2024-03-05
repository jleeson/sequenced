import more_icon from "@/assets/more.svg";
import { useState } from "react";
import ToDoItemMenuSelection from "./ToDoItemMenuSelection";
import ToDoItemMenuDeletion from "./ToDoItemMenuDeletion";

export default function ToDoItemMenu({ item }) {
  const [isManaging, setIsManaging] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div>
      <div
        className="w-14 h-7 flex flex-row justify-center items-center border border-accent-black-400 bg-accent-blue-600 rounded-lg mx-1"
        onClick={() => setIsManaging(true)}
      >
        <img src={more_icon} className="invert" />
      </div>
      <div>
        <ToDoItemMenuSelection
          item={item}
          isManaging={isManaging}
          setIsManaging={setIsManaging}
          setIsDeleting={setIsDeleting}
        />
      </div>
      <div>
        <ToDoItemMenuDeletion
          item={item}
          setIsManaging={setIsManaging}
          isDeleting={isDeleting}
          setIsDeleting={setIsDeleting}
        />
      </div>
    </div>
  );
}

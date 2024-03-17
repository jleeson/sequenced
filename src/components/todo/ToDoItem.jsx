import { useDeleteTask, useUpdateTask } from "@/hooks/tasks";
import { formatShortDate, matchDate } from "@/utils/date";
import { Dialog } from "@headlessui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToDoItemShell from "./ToDoItemShell";
import ToDoItemCheckBox from "./ToDoItemCheckbox";
import ToDoItemTitle from "./ToDoItemTitle";
import ToDoItemMenu from "./ToDoItemMenu/ToDoItemMenu";
import ToDoItemDate from "./ToDoItemDate";
import { createID } from "@/utils/id";
import { ToDoContext } from "@/hooks/contexts";

export function ToDoItem({ item }) {
  if (!item) item = {};

  const navigate = useNavigate();

  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isManaging, setIsManaging] = useState(false);
  const [context, setContext] = useContext(ToDoContext);

  const handleMarkComplete = (e) => {
    e.stopPropagation();

    if (item.repeater && item.repeater.length != 0) {
      let newDone = [];
      let activeDate = context.todo.active;

      if (!Array.isArray(item.done)) item.done = newDone;

      let foundDate = [...item.done].find((ite) =>
        matchDate(new Date(ite), new Date(activeDate.date))
      );

      if (!foundDate) newDone.push(new Date(activeDate.date));
      else newDone.splice(newDone.indexOf(activeDate), 1);

      updateTask({ id: item.id, data: { ...item, done: newDone } });
    } else {
      updateTask({ id: item.id, data: { ...item, done: !item.done } });
    }

    setIsManaging(false);
  };

  const handleInteractive = () => {
    navigate(`/todo/view/${item.id}`);
  };

  const handleDelete = () => {
    deleteTask(item);

    setIsDeleting(false);
  };

  return (
    <ToDoItemShell task={item} activeDate={context.todo.active.date}>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <ToDoItemCheckBox
            checked={item.done}
            onChange={handleMarkComplete}
            onClick={(e) => e.stopPropagation()}
          />
          <ToDoItemTitle text={item.title} />
        </div>
        <div className="flex flex-row gap-2">
          <div>
            <ToDoItemDate date={item.date} />
          </div>
          <div className="flex flex-row">
            <ToDoItemMenu item={item} />
          </div>
        </div>
      </div>
    </ToDoItemShell>
  );
}

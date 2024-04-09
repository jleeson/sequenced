import { useDeleteTask, useUpdateTask } from "@/hooks/tasks";
import { matchDate } from "@/utils/date";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToDoItemShell from "./ToDoItemShell";
import ToDoItemCheckBox from "./ToDoItemCheckbox";
import ToDoItemTitle from "./ToDoItemTitle";
import ToDoItemMenu from "./ToDoItemMenu/ToDoItemMenu";
import ToDoItemDate from "./ToDoItemDate";
import { ToDoContext } from "@/hooks/contexts";
import { isTaskDone } from "@/utils/data";

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
      let newDone = item.done || [];
      let activeDate = context.todo.active;

      if (!Array.isArray(item.done)) item.done = newDone;

      let rawDate = new Date(activeDate.date);
      rawDate.setHours(0, 0, 0, 0);

      let foundDate = [...item.done].find((ite) =>
        matchDate(new Date(ite), rawDate)
      );

      if (!foundDate) newDone.push(rawDate);
      else newDone.splice(newDone.indexOf(rawDate), 1);

      console.log(newDone);

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
      <div className="w-full h-full flex flex-row justify-between gap-1">
        <div className="w-1/2 flex flex-row items-center">
          <ToDoItemCheckBox
            checked={!isTaskDone(item, context.todo.active.date)}
            onChange={handleMarkComplete}
            onClick={(e) => e.stopPropagation()}
          />
          <ToDoItemTitle text={item.title} />
        </div>
        <div className="w-1/2 flex flex-row flex-end items-center justify-end gap-1">
          <div className="w-full h-full flex items-center justify-evenly">
            <ToDoItemDate date={item.date} />
          </div>
          <div className="w-14 h-full flex flex-row justify-center">
            <ToDoItemMenu item={item} />
          </div>
        </div>
      </div>
    </ToDoItemShell>
  );
}

import { useDeleteTask, useUpdateTask } from "@/hooks/tasks";
import { formatShortDate } from "@/utils/date";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToDoItemShell from "./ToDoItemShell";
import ToDoItemCheckBox from "./ToDoItemCheckbox";
import ToDoItemTitle from "./ToDoItemTitle";
import ToDoItemMenu from "./ToDoItemMenu/ToDoItemMenu";
import ToDoItemDate from "./ToDoItemDate";

export function ToDoItem({ item }) {
  if (!item) item = {};

  const navigate = useNavigate();

  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isManaging, setIsManaging] = useState(false);

  const handleMarkComplete = (e) => {
    e.stopPropagation();
    updateTask({ id: item.id, data: { ...item, done: !item.done } });

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
    <ToDoItemShell done={item.done}>
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

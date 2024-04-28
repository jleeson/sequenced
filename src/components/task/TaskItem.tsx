import { useDeleteTask, useUpdateTask } from "@/hooks/tasks";
import { matchDate } from "@/utils/date";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskItemShell from "./TaskItemShell";
import TaskItemCheckBox from "./TaskItemCheckbox";
import TaskItemTitle from "./TaskItemTitle";
import TaskItemMenu from "./TaskItemMenu/TaskItemMenu";
import TaskItemDate from "./TaskItemDate";
import { taskContext } from "@/hooks/contexts";
import { isTaskDone } from "@/utils/data";

export function TaskItem({ item, setIsInspecting }) {
  if (!item) item = {};

  const navigate = useNavigate();

  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();

  const [context, setContext] = useContext(taskContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isManaging, setIsManaging] = useState(false);

  const handleMarkComplete = (e) => {
    e.stopPropagation();

    if (item.repeater && item.repeater.length != 0) {
      let newDone = item.done || [];
      let activeDate = context.activeDate;

      if (!Array.isArray(item.done)) item.done = newDone;

      let rawDate = new Date(activeDate);
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

  const handleInteractive = (e) => {
    e.stopPropagation();

    setContext({
      ...context,
      activeTask: item,
    });

    setIsInspecting(true);
  };

  return (
    <TaskItemShell
      task={item}
      activeDate={context.activeDate}
      onClick={(e) => handleInteractive(e)}
    >
      <div className="w-full h-full flex flex-row justify-between gap-1">
        <div className="w-1/2 flex flex-row items-center">
          <TaskItemCheckBox
            checked={!isTaskDone(item, context.activeDate)}
            onChange={handleMarkComplete}
            onClick={(e) => e.stopPropagation()}
          />
          <TaskItemTitle text={item.title} />
        </div>
        <div className="w-1/2 flex flex-row flex-end items-center justify-end gap-1">
          <div className="w-full h-full flex items-center justify-evenly">
            <TaskItemDate date={item.date} />
          </div>
        </div>
      </div>
    </TaskItemShell>
  );
}

import { useContext, useEffect, useState } from "react";
import { useTasks, filterBroken } from "@/hooks/tasks";
import { taskContext } from "@/hooks/contexts";
import { sortByDate } from "@/utils/data";

import DayTasks from "../components/calendar/DayTasks";
import ActiveCalendar from "../components/calendar/ActiveCalendar";
import TaskContainer from "@/components/menus/TaskContainer/TaskContainer";
import TaskViewer from "@/components/menus/TaskViewer/TaskViewer";
import { getPending } from "@/utils/notifs";

export default function Task() {
  const [context, setContext] = useContext(taskContext);
  const [activeDate, setActiveDate] = useState(context.activeDate);
  const [isInspecting, setIsInspecting] = useState(false);

  const tasks = useTasks();

  useEffect(() => {
    (async () => {
      const pending = await getPending();
      console.log("Pending", pending);
    })();
  }, []);

  return (
    <div className="w-full h-full bg-accent-black text-accent-white">
      {tasks.isLoading && <span>Loading...</span>}
      {tasks.isError && <span>{tasks.error.message}</span>}
      {tasks.isSuccess && (
        <div className="pb-12">
          <div className="flex flex-col items-center gap-2">
            <ActiveCalendar
              context={context}
              setContext={setContext}
              setActiveDate={setActiveDate}
            />
            <DayTasks
              setIsInspecting={setIsInspecting}
              day={context.activeDate}
              tasks={sortByDate(tasks.data)}
            />
            <TaskContainer
              setIsInspecting={setIsInspecting}
              title="All Tasks"
              tasks={sortByDate(tasks.data)}
              activeFilter="dailyTasks"
            />
          </div>
          <div>
            <TaskViewer
              context={context}
              setContext={setContext}
              isOpen={isInspecting}
              setIsOpen={setIsInspecting}
            ></TaskViewer>
          </div>
        </div>
      )}
    </div>
  );
}

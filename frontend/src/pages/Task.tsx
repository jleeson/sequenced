import { useEffect, useState } from "react";
import { useTasks, filterBroken } from "@/hooks/tasks";
import { sortByDate } from "@/utils/data";

import DayTasks from "../components/calendar/DayTasks";
import ActiveCalendar from "../components/calendar/ActiveCalendar";
import TaskContainer from "@/components/menus/TaskContainer/TaskContainer";
import { getPending } from "@/utils/notifs";
import { useApp } from "@/hooks/app";
import TaskInfoMenu from "@/pages/(Layout)/TaskInfoMenu";

export default function Task() {
  const [appData, setAppData] = useApp();
  const [activeDate, setActiveDate] = useState(appData.activeDate);
  const [isInspecting, setIsInspecting] = useState(false);

  const tasks = useTasks();

  // TODO: Turn into React Query
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
              appData={appData}
              setAppData={setAppData}
              // TODO: remove this need
              setActiveDate={setActiveDate}
            />
            <DayTasks
              setIsInspecting={setIsInspecting}
              day={appData.activeDate}
              tasks={sortByDate(tasks.data)}
            />
            <TaskContainer
              identifier="all"
              setIsInspecting={setIsInspecting}
              title="All Tasks"
              tasks={sortByDate(tasks.data)}
              activeFilter="dailyTasks"
            />
          </div>
          <div>
            <TaskInfoMenu
              type="edit"
              isOpen={isInspecting}
              setIsOpen={setIsInspecting}
            />
          </div>
        </div>
      )}
    </div>
  );
}

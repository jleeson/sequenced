import { useContext, useState } from "react";
import { useTasks } from "@/hooks/tasks";
import ActiveCalendar from "../components/calendar/ActiveCalendar";
import DayTasks from "../components/calendar/DayTasks";
import { useNavigate } from "react-router-dom";
import TaskContainer from "@/components/menus/TaskContainer/TaskContainer";
import { ToDoContext } from "@/hooks/contexts";
import { sortByDate } from "@/utils/data";

import ToDoAddMenu from "@/components/menus/ToDoAddMenu/ToDoAddMenu";
import { NavBar } from "@/components/navigation/NavBar";

export default function Todo() {
  const tasks = useTasks();
  const navigate = useNavigate();
  const [context, setContext] = useContext(ToDoContext);
  const [isAdding, setIsAdding] = useState(false);
  const [activeDate, setActiveDate] = useState(context.todo.active.date);

  return (
    <div className="w-full h-full bg-accent-black text-accent-white">
      {tasks.isLoading && <span>Loading...</span>}
      {tasks.isError && <span>{tasks.error.message}</span>}
      {tasks.isSuccess && (
        <div className="pb-12">
          <div className="flex flex-col items-center gap-2">
            <ActiveCalendar context={context} setContext={setContext} setActiveDate={setActiveDate} />
            <DayTasks
              day={context.todo.active.date}
              tasks={sortByDate(tasks.data)}
            />
            <TaskContainer
              title="All Tasks"
              tasks={sortByDate(tasks.data)}
              activeFilter="dailyTasks"
            />
          </div>
          <div id="adder">
            <NavBar setIsAdding={setIsAdding} />
            <ToDoAddMenu
              isOpen={isAdding}
              setIsOpen={setIsAdding}
              activeDate={activeDate}
              setActiveDate={setActiveDate}
            />
          </div>
        </div>
      )}
    </div>
  );
}

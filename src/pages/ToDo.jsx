import { useContext, useState } from "react";
import { useTasks } from "@/hooks/tasks";
import ActiveCalendar from "../components/calendar/ActiveCalendar";
import DayTasks from "../components/calendar/DayTasks";
import { useNavigate } from "react-router-dom";
import TaskContainer from "@/components/menus/TaskContainer/TaskContainer";
import { ToDoContext } from "@/hooks/contexts";

import add_icon from "@/assets/add.svg";

export default function Todo() {
  const tasks = useTasks();
  const navigate = useNavigate();
  const [context, setContext] = useContext(ToDoContext);

  return (
    <div className="w-full h-full bg-accent-black text-accent-white">
      {tasks.isLoading && <span>Loading...</span>}
      {tasks.isError && <span>{tasks.error.message}</span>}
      {tasks.isSuccess && (
        <div>
          <div className="flex flex-col items-center gap-2">
            <ActiveCalendar
              context={context}
              setContext={setContext}
            />
            <DayTasks day={context.todo.active.date} tasks={tasks.data} />
            <TaskContainer title="All Tasks" tasks={tasks.data} activeFilter="dailyTasks" />
          </div>
          <div>
            <div className="w-full h-16 flex justify-center items-center fixed bottom-8">
              <button
                onClick={() => navigate("/todo/add")}
                className="flex text-center justify-center items-center w-12 h-12 text-3xl bg-blue-600 rounded-full text-white"
              >
                <div className="flex justify-center items-center w-full h-full">
                  <img src={add_icon} className="invert w-3/4 h-3/4" width="32" height="32" />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

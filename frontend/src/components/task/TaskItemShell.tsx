import { isTaskDone } from "@/utils/data";

export default function TaskItemShell({ children, task, activeDate, ...props }) {
  return (
    <div {...props} className={`flex flex-col w-full h-14 bg-accent-black-900 border border-accent-black-300 px-3 py-3 rounded-md justify-center gap-2 ${!isTaskDone(task, activeDate) && "opacity-60"} hover:bg-accent-black-950`}>
      {children}
    </div>
  );
}

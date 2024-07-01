import { Task } from "@/hooks/tasks";

export interface TaskInfoMenuSubtaskParams {
  task: Task;
  deleteSubtask: CallableFunction;
}

export default function TaskInfoMenuSubtask({
  task,
  deleteSubtask,
}: TaskInfoMenuSubtaskParams) {
  return (
    <div className="flex flex-row items-center gap-2">
      <div className="w-full text-base px-2 py-2 bg-accent-black-500 border border-accent-white rounded-md text-accent-white overflow-x-hidden overflow-y-scroll hover:bg-accent-black-600">
        {task.title || "No Title"}
      </div>
      <div>
        <span
          className="px-5 py-2 bg-accent-red-500 rounded-lg text-lg"
          onClick={(e) => deleteSubtask(task)}
        >
          -
        </span>
      </div>
    </div>
  );
}

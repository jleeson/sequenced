import { Preferences } from "@capacitor/preferences";
import {
  useQueryClient,
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";

export interface Task {
  title?: string;
  description?: string;
  date?: string;
  id?: string;
  done?: string;
}

/* Filters out ghost tasks */
export function filterBroken(tasks: Task[]): Task[] {
  return tasks?.filter((task) => task.id != undefined);
}

/* Loads task array from Preferences database */
export async function loadTasks(): Promise<Task[]> {
  const { value } = await Preferences.get({ key: "tasks" });
  return value ? JSON.parse(value) : [];
}

/* Loads tasks and finds the task with given id */
export async function loadTaskById(id: string): Promise<Task> {
  const tasks = await loadTasks();
  return tasks.find((task) => task.id == id) || {};
}

/* returns query data */
export function useTasks(): UseQueryResult {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: loadTasks,
    staleTime: Infinity,
  });
}

/* Return query data of tasks, and finds specific task from given id */
export function useTaskById(id: string): UseQueryResult {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: () => loadTaskById(id),
    staleTime: Infinity,
  });
}

/* Adds a task to the tasks database */
export function useAddTask(): UseMutationResult {
  const queryClient = useQueryClient();

  const mutationFn = async (task: Task) => {
    const tasks = [...(await loadTasks()), task];
    await Preferences.set({ key: "tasks", value: JSON.stringify(tasks) });
  };

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  return useMutation({ mutationFn, onSuccess });
}

/* Updates specific task */
export function useUpdateTask(): UseMutationResult {
  const queryClient = useQueryClient();

  const mutationFn = async ({ id, data }: { id: string; data: Object }) => {
    const tasks = await loadTasks();
    const index = tasks.indexOf(tasks.find((task) => task.id == id));

    tasks[index] = data;

    await Preferences.set({ key: "tasks", value: JSON.stringify(tasks) });
  };

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  return useMutation({ mutationFn, onSuccess });
}

/* Delete specific task */
export function useDeleteTask(): UseMutationResult {
  const queryClient = useQueryClient();

  const mutationFn = async (task) => {
    const tasks = await loadTasks();
    const realTask = tasks.find((t) => t.id == task.id);
    const realIndex = tasks.indexOf(realTask);
    tasks.splice(realIndex, 1);

    await Preferences.set({ key: "tasks", value: JSON.stringify(tasks) });
  };

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  return useMutation({ mutationFn, onSuccess });
}

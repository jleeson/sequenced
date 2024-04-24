import { Preferences } from "@capacitor/preferences";
import {
  useQueryClient,
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";

// TODO - a task likely should always have these properties when you create it, optional on id is especially bad.
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
  return JSON.parse(value ?? "[]").filter((task: Task) => task.id);
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
export function useAddTask(): UseMutationResult<void, Error, Task, unknown> {
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
export function useUpdateTask(): UseMutationResult<void, Error, { id: string; data: Object; }, unknown> {
  const queryClient = useQueryClient();

  const mutationFn = async ({ id, data }: { id: string; data: Object }) => {
    const tasks = await loadTasks();
    const index = tasks.findIndex((task) => task.id == id);

    tasks[index] = data;

    await Preferences.set({ key: "tasks", value: JSON.stringify(tasks) });
  };

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  return useMutation({ mutationFn, onSuccess });
}

/* Delete specific task */
export function useDeleteTask(): UseMutationResult<void, Error, Task, unknown> {
  const queryClient = useQueryClient();

  const mutationFn = async ({ id }: Task) => {
    const tasks = await loadTasks();
    const index = tasks.findIndex((task) => task.id == id);
    tasks.splice(index, 1);

    await Preferences.set({ key: "tasks", value: JSON.stringify(tasks) });
  };

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  return useMutation({ mutationFn, onSuccess });
}

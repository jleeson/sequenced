import { Preferences } from "@capacitor/preferences";
import {
  useQueryClient,
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";

import { getSync } from "./settings";
import { fetchData } from "@/utils/data";

// TODO - a task likely should always have these properties when you create it, optional on id is especially bad.
export interface Task {
  title?: string;
  description?: string;
  date?: Date;
  id?: string;
  done?: boolean;
  repeater?: string;
  reminder?: string;
  subtasks?: Task[];
  priority?: number;
}

export function createInitialTaskData(): Task {
  return {
    title: "",
    description: "",
    date: new Date(),
    done: false,
    repeater: "",
    reminder: "",
    subtasks: [],
    priority: 0
  };
}

export async function checkMigration() {
  const synced = await getSync();
  if (!synced) await migrateTasks();
}

export async function migrateTasks() {
  const { value } = await Preferences.get({ key: "tasks" });
  const tasks = JSON.parse(value ?? "[]");

  const response = await fetchData("/task/migrate", {
    method: "POST",
    body: tasks
  });

  console.log("Response", response);

  const migration = await response.json();

  if (migration.isSynced) {
    console.log("Loading cloud data");
    await Preferences.set({ key: "sync", value: "true" });
    await Preferences.set({ key: "tasks", value: JSON.stringify(migration.tasks) });
    return null;
  }

  if (migration.sync) {
    console.log("Synced with Cloud");
    await Preferences.set({ key: "sync", value: "true" });
    return null;
  }
}

export function useMigrate() {
  return useMutation({
    mutationFn: checkMigration
  });
}

/* Filters out ghost tasks */
export function filterBroken(tasks: Task[]): Task[] {
  return tasks?.filter((task) => task.id != undefined);
}

/* Loads task array from Preferences database */
export async function loadTasks(): Promise<Task[]> {
  const response = await fetchData(`/task`, {});

  return await response.json();

}

/* Loads tasks and finds the task with given id */
export async function loadTaskById(id: string): Promise<Task> {
  const tasks = await loadTasks();
  return tasks.find((task) => task.id == id) || {};
}

/* returns query data */
export function useTasks(): UseQueryResult<Task[]> {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: loadTasks,
    staleTime: 1000 * 60 * 60,
  });
}

export async function getTasksToday() {
  return await (await fetchData("/task/today", {})).json();
}

export function useTasksToday() {
  return useQuery({
    queryKey: ["tasks", "today"],
    queryFn: getTasksToday,
    staleTime: 1000 * 60 * 60
  });
}

export async function getTasksTomorrow() {
  return await (await fetchData("/task/tomorrow", {})).json();
}

export function useTasksTomorrow() {
  return useQuery({
    queryKey: ["tasks", "tomorrow"],
    queryFn: getTasksTomorrow,
    staleTime: 1000 * 60 * 60
  });
}

export async function getTasksWeek() {
  return await (await fetchData("/task/week", {})).json();
}

export function useTasksWeek() {
  return useQuery({
    queryKey: ["tasks", "week"],
    queryFn: getTasksWeek,
    staleTime: 1000 * 60 * 60
  });
}

export async function getTasksOverdue() {
  return await (await fetchData("/task/overdue", {})).json();
}

export function useTasksOverdue() {
  return useQuery({
    queryKey: ["tasks", "overdue"],
    queryFn: getTasksOverdue,
    staleTime: 1000 * 60 * 60
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
    await fetchData("/task", {
      method: "POST",
      body: task
    });
  };

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  return useMutation({ mutationFn, onSuccess });
}

/* Updates specific task */
export function useUpdateTask(): UseMutationResult<
  void,
  Error,
  { id: string; data: Object },
  unknown
> {
  const queryClient = useQueryClient();

  const mutationFn = async ({ id, data }: { id: string; data: Object }) => {
    await fetchData("/task", {
      method: "PATCH",
      body: data
    });
  };

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  return useMutation({ mutationFn, onSuccess });
}

/* Delete specific task */
export function useDeleteTask(): UseMutationResult<void, Error, Task, unknown> {
  const queryClient = useQueryClient();

  const mutationFn = async (task: Task) => {
    await fetchData("/task", {
      method: "DELETE",
      body: task
    });
  };

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  return useMutation({ mutationFn, onSuccess });
}

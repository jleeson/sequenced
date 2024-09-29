import { Preferences } from "@capacitor/preferences";
import {
  useQueryClient,
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";

import { getSync } from "./settings";
import { getToken } from "./user";
import { SERVER_IP } from "./app";
import { fetchServer } from "./auth";

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
  };
}

export async function checkMigration() {
  const synced = await getSync();
  if (!synced)
    await migrateTasks();
}

export async function migrateTasks() {
  const { value } = await Preferences.get({ key: "tasks" });
  const tasks = JSON.parse(value ?? "[]");
  const token = await getToken();

  console.log("Migrating to cloud");

  const migration = await fetchServer({
    path: "/task/migrate",
    method: "POST",
    body: tasks,
    token
  });

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

// [
//   {
//     "title": "Group",
//     "description": "Test",
//     "date": "2024-09-29T01:32:15.949Z",
//     "done": false,
//     "repeater": "",
//     "reminder": "",
//     "subtasks": [
//       {
//         "title": "Test Sub",
//         "description": "",
//         "date": "2024-09-29T01:32:30.481Z",
//         "done": false,
//         "repeater": "",
//         "reminder": "",
//         "subtasks": [],
//         "id": "BiDGc-1PDrIy9eLbhMjI"
//       }
//     ],
//     "id": "ucWs4qBC9rj5N8xLN8jx",
//     "type": "group"
//   }
// ]

/* Loads task array from Preferences database */
export async function loadTasks(): Promise<Task[]> {
  const synced = await getSync();

  if (synced) {
    const tasks = await fetchServer({
      path: "/task",
      token: await getToken()
    });

    // const tasks = await (await fetch(`${SERVER_IP}/task`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${await getToken()}`
    //   }
    // })).json();

    console.log("TASKS", tasks);

    return tasks;
  } else {
    migrateTasks();
    // const { value } = await Preferences.get({ key: "tasks" });

    // return JSON.parse(value ?? "[]").filter((task: Task) => task.id);
  }

  return [];
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
export function useUpdateTask(): UseMutationResult<
  void,
  Error,
  { id: string; data: Object },
  unknown
> {
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

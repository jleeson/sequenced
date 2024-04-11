import { Preferences } from "@capacitor/preferences";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

export function filterBroken(tasks) {
  return tasks?.filter((task) => task.id != undefined);
}

/**
 * Loads task array from Preferences database
 * @returns An array of tasks
 */
export async function loadTasks() {
  const { value } = await Preferences.get({ key: "tasks" });
  return value ? JSON.parse(value) : [];
}

/**
 * Loads tasks and finds the task with given id
 * @param {string} id id of the task
 * @returns task data
 */
export async function loadTaskById(id) {
  const tasks = await loadTasks();
  return tasks.find((task) => task.id == id);
}

/**
 * Returns query data
 * @returns query data from tasks database
 */
export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: loadTasks,
    staleTime: Infinity,
  });
}

/**
 * Return query data of tasks, and finds specific task from given id
 * @param {string} id id of the task
 * @returns task data
 */
export function useTaskById(id) {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: () => loadTaskById(id),
    staleTime: Infinity,
  });
}

/**
 * Adds a task to the tasks database
 * @returns mutation of the addition
 */
export function useAddTask() {
  const queryClient = useQueryClient();

  const mutationFn = async (task) => {
    const tasks = [...(await loadTasks()), task];
    await Preferences.set({ key: "tasks", value: JSON.stringify(tasks) });
  };

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  return useMutation({ mutationFn, onSuccess });
}

/**
 * Updates specific task
 * @returns Mutation to update the task
 */
export function useUpdateTask() {
  const queryClient = useQueryClient();

  const mutationFn = async ({ id, data }) => {
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

/**
 * Delete specific task
 * @returns Mutation to task the task
 */
export function useDeleteTask() {
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

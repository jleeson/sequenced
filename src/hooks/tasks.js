import { Preferences } from "@capacitor/preferences";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

/* load the tasks from storage */
export async function loadTasks() {
  const { value } = await Preferences.get({ key: "tasks" });
  return value ? JSON.parse(value) : [];
}

/* load the tasks and find one by id */
export async function loadTaskById(id) {
  const tasks = await loadTasks();
  return tasks.find((task) => task.id == id);
}

/* get the tasks */
export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: loadTasks,
    staleTime: Infinity,
  });
}

/* get the task by provided id */
export function useTaskById(id) {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: () => loadTaskById(id),
    staleTime: Infinity,
  });
}

/* add a task to the list of tasks */
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

export function useDeleteTask() {
  const queryClient = useQueryClient();

  const mutationFn = async (task) => {
    const tasks = await loadTasks();
    tasks.splice(tasks.indexOf(task), 1);

    await Preferences.set({ key: "tasks", value: JSON.stringify(tasks) });
  };

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  return useMutation({ mutationFn, onSuccess });
}

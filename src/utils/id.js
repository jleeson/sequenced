import { nanoid } from "nanoid";

export function createID(length) {
  return nanoid(length);
}

export function createIDUnmatched(tasks) {
  const id = createID(20);

  for (let task of tasks) {
    if (task.id == id) return createIfMatch(tasks);
  }

  return id;
}

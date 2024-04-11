import { nanoid } from "nanoid";

/**
 * Creates an id with set length
 * @param {number} length length of the id 
 * @returns random id with set length
 */
export function createID(length) {
  return nanoid(length);
}

/**
 * Takes in tasks and returns a new id that no other task has
 * @param {Array} tasks task array
 * @returns random unique id
 */
export function createIDUnmatched(tasks) {
  const id = createID(20);

  for (let task of tasks) {
    if (task.id == id) return createIfMatch(tasks);
  }

  return id;
}

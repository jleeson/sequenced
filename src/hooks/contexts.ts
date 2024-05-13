import { createContext } from "react";

export interface TaskContext { activeDate: Date }

/* context data for the task internally */
export const taskContext = createContext<TaskContext>({ activeDate: new Date() });
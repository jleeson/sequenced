import { createContext } from "react";

export interface TaskContext { activeDate: Date, tempActiveDate: Date | undefined }

/* context data for the task internally */
export const taskContext = createContext<TaskContext>({ activeDate: new Date(), tempActiveDate: undefined });
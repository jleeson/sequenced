import { createContext, useContext, useReducer } from "react";

export const AppContext = createContext(null);

// TODO: remove tempActiveDate.
// TODO: Build Interface
const initialData = {
  activeDate: new Date(),
  tempActiveDate: undefined,
  activeTask: undefined,
  activeParent: undefined,
};

const reducer = (data: Record<string, any>, payload: Record<string, any>) => ({
  ...data,
  ...payload,
});

export function useAppReducer() {
  return useReducer(reducer, initialData);
}

export function useApp(): Iterable<any> | null {
  return useContext(AppContext);
}

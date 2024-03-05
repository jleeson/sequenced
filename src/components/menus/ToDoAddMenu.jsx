import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useAddTask } from "@/hooks/tasks";

import FormItem from "./FormItem";

const reducer = (data, payload) => ({ ...data, ...payload });
const initialData = { title: "", description: "", date: new Date() };

export default function ToDoAddMenu() {
  const navigate = useNavigate();
  const [task, setTask] = useReducer(reducer, initialData);
  const { mutate: addTask } = useAddTask();

  const resetBox = () => {
    setTask(initialData);
    navigate(-1);
  };

  const addTo = async (e) => {
    e.preventDefault();

    addTask(task);
    resetBox();
  };

  const cancelForm = (e) => {
    e.preventDefault();

    resetBox();
  };

  return (
    <div id="todo-addmenu" className="flex bg-accent-black">
      <form id="tdam-form" onReset={cancelForm} onSubmit={addTo}>
        <div className="flex flex-col text-left">
          <div className="flex flex-col">
            <FormItem
              title="Title"
              value={task.title}
              onChange={(e) => setTask({ title: e.target.value })}
            />
            <FormItem
              title="Description"
              value={task.description}
              onChange={(e) => setTask({ description: e.target.value })}
            />
            <FormItem
              title="Date"
              type="datetime-local"
              value={task.date}
              onChange={(e) => setTask({ date: e.target.value })}
            />
          </div>
          <div className="flex flex-row justify-evenly my-4">
            <button
              id="tdam-reset"
              type="reset"
              className="text-lg w-24 h-10 bg-red-500 text-white rounded-lg"
              onClick={cancelForm}
            >
              Cancel
            </button>
            <button
              id="tdam-submit"
              type="submit"
              className="text-lg w-24 h-10 bg-accent-blue text-white rounded-lg"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

import { useState } from "react";
import PopupMenu from "./Popup";

export default function ToDoAddMenu({
  menuInactive,
  setMenuInactive,
  id,
  className,
  dispatch,
  count
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);

  function resetBox(){
    setTitle(null);
    setDescription(null);
    setDate(null);

    setMenuInactive(true);
  }

  async function addTo(e) {
    e.preventDefault();

    await dispatch({
      type: "add",
      info: {
        title,
        description,
        date,
      },
    });

    resetBox();
  }

  function cancelForm(e) {
    e.preventDefault();

    resetBox();
  }

  return (
    <div id="todo-addmenu" className={menuInactive ? "hidden" : "flex"}>
      <PopupMenu id={id} className={className}>
        <form
          id="tdam-form"
          onReset={(e) => cancelForm(e)}
          onSubmit={(e) => addTo(e)}
        >
          <div className="flex flex-col text-center">
            <div className="flex flex-col">
              <label htmlFor="tdam-title" className="text-xl my-2">
                Title
              </label>
              <input
                id="tdam-title"
                name="tdam-title"
                className="p-2 border border-black"
                value={title || ""}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="tdam-description" className="text-xl my-2">
                Description
              </label>
              <input
                id="tdam-description"
                name="tdam-description"
                className="p-2 border border-black"
                value={description || ""}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="tdam-date" className="text-xl my-2">
                Date
              </label>
              <input
                id="tdam-date"
                type="datetime-local"
                name="tdam-date"
                className="p-2 border border-black"
                value={date || ""}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-row justify-evenly my-4">
              <button
                id="tdam-reset"
                type="reset"
                className="text-lg w-20 h-8 bg-red-500 text-white rounded-lg"
                onClick={(e) => cancelForm(e)}
              >
                Cancel
              </button>
              <button
                id="tdam-submit"
                type="submit"
                className="text-lg w-20 h-8 bg-accent-blue text-white rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </PopupMenu>
    </div>
  );
}

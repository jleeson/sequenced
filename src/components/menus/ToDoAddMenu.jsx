import { useState } from "react";
import PopupMenu from "./Popup";

export default function ToDoAddMenu({
  menuInactive,
  setMenuInactive,
  id,
  className,
  dispatch,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);

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

    setTitle("");
    setDescription("");
    setDate(null);

    setMenuInactive(true);
  }

  function cancelForm(e) {
    e.preventDefault();

    setTitle("");
    setDescription("");
    setDate(null);

    console.log("SETTING");

    setMenuInactive(true);
  }

  console.log(menuInactive);

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
                defaultValue={title}
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
                defaultValue={description}
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
                defaultValue={date}
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
                className="text-lg w-20 h-8 bg-blue-500 text-white rounded-lg"
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

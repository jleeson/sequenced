import PopupMenu from "./Popup";

export default function ToDoAddMenu({ id, className, updateTodo }) {
  function closeMenu() {
    let todoMenu = document.querySelector("#todo-addmenu");
    todoMenu.classList.toggle("hidden");
  }

  async function addTo(e) {
    e.preventDefault();

    let title = document.querySelector("#tdam-title");
    let description = document.querySelector("#tdam-description");
    let date = document.querySelector("#tdam-date");

    await updateTodo({
      title: title.value,
      description: description.value,
      date: date.value,
    });

    title.value = null;
    description.value = null;
    date.value = null;

    closeMenu();
  }

  function cancelForm(e) {
    e.preventDefault();

    let title = document.querySelector("#tdam-title");
    let description = document.querySelector("#tdam-description");
    let date = document.querySelector("#tdam-date");

    title.value = null;
    description.value = null;
    date.value = null;

    closeMenu();
  }

  return (
    <div id="todo-addmenu" className="hidden">
      <PopupMenu id={id} className={className}>
        <form id="tdam-form" onReset={cancelForm} onSubmit={addTo}>
          <div className="flex flex-col text-center">
            <div className="flex flex-col">
              <label htmlFor="tdam-title" className="text-xl my-2">
                Title
              </label>
              <input
                id="tdam-title"
                name="tdam-title"
                className="p-2 border border-black"
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
              />
            </div>
            <div className="flex flex-row justify-evenly my-4">
              <button
                id="tdam-reset"
                type="reset"
                className="text-lg w-20 h-8 bg-red-500 text-white rounded-lg"
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

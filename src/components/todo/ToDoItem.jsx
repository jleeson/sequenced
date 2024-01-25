export function ToDoItem({ key, item, deleteItem }) {
  if (typeof item == "string") item = { title: item };

  let trueInstance = {
    title: item.title || "",
    description: item.description || "Sample",
    date: item.date || new Date(),
    done: item.done || false,
  };

  return (
    <div className="flex flex-row justify-evenly items-center bg-blue-400 text-white rounded-md px-4 py-2 m-2 w-80">
      <div className="mx-2">
        <input
          type="checkbox"
          checked={item.done}
          className="appearance-none w-4 h-4 border-white border rounded-full checked:bg-white"
        />
      </div>
      <div className="flex flex-col justify-start text-left mx-4">
        <h1>{trueInstance.title}</h1>
        <span>{trueInstance.description}</span>
      </div>
      <div className="mx-2">
        <h1>
          {trueInstance.date.getMonth() + 1}/{trueInstance.date.getDate()}
        </h1>
      </div>
      <div className="mx-2">
        <button onClick={() => {deleteItem(item)}} className="text-blue-600 bg-gray-300 border px-2 py-1 rounded-md">Delete</button>
      </div>
    </div>
  );
}

export function ToDoItem({ key, item, deleteItem }) {
  if (typeof item == "string") item = { title: item };

  let trueInstance = {
    title: item.title || "",
    description: item.description || "Sample",
    date: new Date(item.date) || new Date(),
    done: item.done || false,
  };

  return (
    <div className="flex flex-row w-96 h-12 justify-between items-center bg-blue-400 text-white rounded-md px-4 py-2 m-2 w-80 box-border">
      <div className="flex justify-center items-center">
        <input
          type="checkbox"
          checked={item.done}
          className="appearance-none w-8 h-8 border-gray-600 border rounded-full checked:bg-white"
        />
      </div>
      <div className="flex flex-col justify-start text-left mx-4">
        <h1 className="text-left w-32 truncate text-lg">{trueInstance.title}</h1>
      </div>
      <div className="w-10 mx-2 text-lg">
        <h1>
          {trueInstance.date.getMonth() + 1}/{trueInstance.date.getDate()}
        </h1>
      </div>
      <div className="mx-2 text-md">
        <button onClick={() => {deleteItem(item)}} className="text-blue-600 bg-gray-300 border px-2 py-1 rounded-md">Delete</button>
      </div>
    </div>
  );
}

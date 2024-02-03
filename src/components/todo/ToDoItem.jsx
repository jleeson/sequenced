import { useState } from "react";

export function ToDoItem({
  item,
  index,
  updateList,
  deleteFromList,
  setItemFull,
}) {
  const [trueItem, setTrueItem] = useState(item);
  const [isChecked, setIsChecked] = useState(trueItem.done || false);

  let handleMarkComplete = (e) => {
    let newItem = { ...trueItem };

    newItem.done = !newItem.done;

    setIsChecked(newItem.done);

    updateList({
      from: trueItem,
      to: newItem,
    });

    setTrueItem(newItem);
  };

  let handleInteractive = (e) => {
    setItemFull(trueItem);
  };

  if (typeof trueItem.date == "string") trueItem.date = new Date(trueItem.date);

  return (
    <div
      className={`flex flex-row w-full h-14 justify-between items-center bg-accent-black-900 text-white rounded-xl px-4 py-2 box-border ${
        isChecked ? "line-through" : "no-underline"
      }`}
      onClick={handleInteractive}
    >
      <div className="w-6 h-6 flex justify-center items-center bg-red-50 rounded-full bg-transparent border border-white">
        <input
          type="checkbox"
          defaultChecked={isChecked}
          className="appearance-none w-full h-full rounded-full bg-transparent checked:bg-accent-blue-900"
          onChange={handleMarkComplete}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <div className="flex flex-col justify-start text-left mx-4">
        <h1 className="text-left w-32 truncate text-md">
          {trueItem && trueItem.title}
        </h1>
        {/* <h1 className="text-left w-32 truncate text-sm">
          {trueItem && trueItem.description}
        </h1> */}
      </div>
      <div className="w-10 mx-2 text-lg">
        <h1>
          {trueItem &&
            trueItem.date &&
            typeof trueItem.date == "object" &&
            trueItem.date != "Invalid Date" &&
            `${trueItem.date.getMonth() + 1}/${trueItem.date.getDate()}`}
        </h1>
      </div>
      <div className="mx-2 text-sm">
        <button
          onClick={(e) => {
            e.stopPropagation();

            deleteFromList({
              item: trueItem,
              index,
            });
          }}
          className="text-red-400 bg-accent-black-900 border px-3 py-1.5 rounded-xl"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

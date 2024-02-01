import { useState } from "react";

export function ToDoItem({ item, index, dispatch, setItemFull }) {
  const [trueItem, setTrueItem] = useState(item);
  const [isChecked, setIsChecked] = useState(trueItem.done || false);

  function handleMarkComplete(e) {
    let newItem = {...trueItem};

    newItem.done = !newItem.done;

    setIsChecked(newItem.done);

    dispatch({
      type: "update",
      info: {
        index,
        item: newItem
      },
    });
  }

  function handleInteractive(e) {
    setItemFull(trueItem);
  }

  if (typeof trueItem.date == "string") trueItem.date = new Date(trueItem.date);

  return (
    <div
      className={`flex flex-row w-96 h-12 justify-between items-center ${
        isChecked ? "bg-blue-900 opacity-50" : "bg-blue-400"
      } text-white rounded-md px-4 py-2 m-2 w-80 box-border`}
      onClick={(e) => handleInteractive(e)}
    >
      <div className="w-8 h-8 flex justify-center items-center bg-red-50 rounded-full">
        <input
          type="checkbox"
          defaultChecked={isChecked}
          className="appearance-none w-7 h-7 rounded-full bg-red-500 checked:bg-green-500"
          onChange={(e) => handleMarkComplete(e)}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <div className="flex flex-col justify-start text-left mx-4">
        <h1 className="text-left w-32 truncate text-lg">
          {trueItem && trueItem.title}
        </h1>
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
      <div className="mx-2 text-md">
        <button
          onClick={(e) => {
            e.stopPropagation();

            dispatch({
              type: "delete",
              info: {
                item: trueItem,
                index,
              },
            });
          }}
          className="text-blue-600 bg-gray-300 border px-2 py-1 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

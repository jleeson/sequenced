import { Preferences } from "@capacitor/preferences";
import { useEffect, useState } from "react";
import { ToDoItem } from "../components/todo/ToDoItem";

async function setObject(obj) {
  await Preferences.set({
    key: "todo",
    value: JSON.stringify({
      items: obj || [],
    }),
  });
}

async function getObject() {
  const ret = await Preferences.get({ key: "todo" });
  const items = JSON.parse(ret.value);
  return items;
}

const ToDo = () => {
  let [items, setItems] = useState(["Test"]);

  async function deleteItem(item) {
    let tempArr = [...items];
    let index = tempArr.indexOf(item);
    tempArr.splice(index, 1);
    updateAll(tempArr);
  }

  async function updateTodo(item) {
    let tempArr = [...items];
    tempArr.push(item);
    updateAll(tempArr);
  }

  async function updateAll(arr) {
    if (arr) await setObject(arr);
    setItems(arr);
  }

  useEffect(() => {
    (async () => {
      let ites = await getObject();
      console.log(ites);
      if (ites && ites.items) setItems(ites.items);
    })();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center text-center w-full h-full">
      <h1 className="mx-2 my-4 text-2xl">To-Do List</h1>
      <ul className="flex flex-col justify-start items-center">
        {items.map((item, key) => (
          <li key={key}>
            <ToDoItem item={item} deleteItem={deleteItem} />
          </li>
        ))}
      </ul>
      <button
        onClick={async () => {
          await updateTodo("Test");
        }}
        className="w-40 h-8 my-2 bg-blue-600 rounded-2xl px-2 text-white"
      >
        Add to List
      </button>
    </div>
  );
};

export default ToDo;

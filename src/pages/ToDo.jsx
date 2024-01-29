import { Preferences } from "@capacitor/preferences";
import { useEffect, useReducer, useState } from "react";
import { ToDoItem } from "../components/todo/ToDoItem";
import PopupMenu from "../components/menus/Popup";
import ToDoAddMenu from "../components/menus/ToDoAddMenu";

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
  let [items, dispatch] = useReducer(itemsReducer, []);
  let [addActive, setAddActive] = useState(false);
  let [menuInactive, setMenuInactive] = useState(true);

  function itemsReducer(items, action) {
    switch (action.type) {
      case "add": {
        let tempArr = [...items, action.info];
        setObject(tempArr);
        return [tempArr];
      }

      case "update": {
        let tempArr = [...items];

        tempArr = tempArr.map((item, ind) => {
          let newItem = item;

          if (ind == action.info.index) newItem = action.info.item;

          return newItem;
        });

        setObject(tempArr);

        return tempArr;
      }

      case "overwrite": {
        return action.info;
      }

      case "delete": {
        let tempArr = [...items];
        let deleted = tempArr.splice(action.info, 1);

        setObject(tempArr);

        return tempArr;
      }
    }
  }

  useEffect(() => {
    (async () => {
      let ites = await getObject();
      dispatch({
        type: "overwrite",
        info: ites ? ites.items : null,
      });
    })();
  }, []);

  return (
    <div className="relative">
      <ToDoAddMenu
        menuInactive={menuInactive}
        setMenuInactive={setMenuInactive}
        dispatch={dispatch}
      />
      <div className="flex flex-col justify-center items-center text-center w-full h-full">
        <h1 className="mx-2 my-4 text-2xl">To-Do List</h1>
        <ul className="h-[35em] flex flex-col justify-start items-center overflow-y-scroll">
          {items.map((item, key) => (
            <li key={key}>
              <ToDoItem item={item} index={key} dispatch={dispatch} />
            </li>
          ))}
        </ul>
        <button
          onClick={async () => {
            // let todoMenu = document.querySelector("#todo-addmenu");
            // todoMenu.classList.toggle("hidden");

            setMenuInactive(false);
          }}
          className="w-40 h-8 my-2 bg-blue-600 rounded-2xl px-2 text-white"
        >
          Add to List
        </button>
      </div>
    </div>
  );
};

export default ToDo;

import tasks_icon from "@/assets/tasks.svg";
import lists_icon from "@/assets/lists.svg";

import AddIcon from "./Icons/AddIcon";
import HomeIcon from "./Icons/HomeIcon";
import SettingsIcon from "./Icons/SettingsIcon";

export function NavBar({ setIsAdding }) {
  return (
    <div className="flex justify-center items-center w-full absolute bottom-0 nav-pad bg-white">
      <div className="w-full h-16 flex flex-row justify-evenly items-center rounded-t-md md:container">
        <div className="flex flex-row grow justify-evenly">
          <a href="/">
            <div className="flex items-center justify-center w-12 h-12 bg-accent-blue-500 rounded-lg hover:bg-accent-blue-800">
              <div className="flex justify-center items-center w-full h-full p-1">
                <HomeIcon />
              </div>
            </div>
          </a>
          {/* <div className="flex items-center justify-center w-12 h-12 bg-accent-blue-700 rounded-lg">
            <a
              href="/"
              className="invert w-full h-full flex items-center justify-center"
            >
              <img src={tasks_icon} width="32" height="32" />
            </a>
          </div> */}
        </div>
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center w-12 h-12 bg-accent-blue-500 rounded-lg hover:bg-accent-blue-800">
            <button
              onClick={() => setIsAdding(true)}
              className="flex text-center justify-center items-center w-12 h-12 text-3xl rounded-full text-white"
            >
              <div className="flex justify-center items-center w-full h-full p-1">
                <AddIcon />
              </div>
            </button>
          </div>
        </div>
        <div className="flex flex-row grow justify-evenly">
          {/* <div className="flex items-center justify-center w-12 h-12 bg-accent-blue-500 rounded-lg">
          <img
            src={lists_icon}
            className="invert w-full h-full"
            width="32"
            height="32"
          />
        </div> */}
          <div className="flex items-center justify-center w-12 h-12 bg-accent-blue-500 rounded-lg hover:bg-accent-blue-800">
            <a
              href="/settings"
              className="w-full h-full flex items-center justify-center p-1"
            >
              <SettingsIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

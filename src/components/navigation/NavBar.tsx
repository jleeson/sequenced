import home_icon from "@/assets/home.svg";
import tasks_icon from "@/assets/tasks.svg";
import add_icon from "@/assets/add.svg";
import lists_icon from "@/assets/lists.svg";
import settings_icon from "@/assets/settings.svg";

export function NavBar({ setIsAdding }) {
  return (
    <div className="flex justify-center items-center w-full absolute bottom-0 bg-accent-black-700 nav-pad">
      <div className="w-full h-16 flex flex-row justify-evenly items-center rounded-t-md">
        <div className="flex flex-row grow justify-evenly">
          <a href="/">
            <div className="flex items-center justify-center w-12 h-12 bg-accent-blue-700 rounded-lg">
              <img
                src={home_icon}
                className="invert w-full h-full"
                width="32"
                height="32"
              />
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
          <div className="flex justify-center items-center w-12 h-12 bg-accent-blue-700 rounded-lg">
            <button
              onClick={() => setIsAdding(true)}
              className="flex text-center justify-center items-center w-12 h-12 text-3xl rounded-full text-white"
            >
              <div className="flex justify-center items-center w-full h-full">
                <img
                  src={add_icon}
                  className="invert w-full h-full"
                  width="32"
                  height="32"
                />
              </div>
            </button>
          </div>
        </div>
        <div className="flex flex-row grow justify-evenly">
          {/* <div className="flex items-center justify-center w-12 h-12 bg-accent-blue-700 rounded-lg">
          <img
            src={lists_icon}
            className="invert w-full h-full"
            width="32"
            height="32"
          />
        </div> */}
          <div className="flex items-center justify-center w-12 h-12 bg-accent-blue-700 rounded-lg">
            <a
              href="/settings"
              className="invert w-full h-full flex items-center justify-center"
            >
              <img src={settings_icon} width="32" height="32" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

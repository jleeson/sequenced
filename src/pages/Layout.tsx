import TaskAddMenu from "@/components/menus/TaskAddMenu/TaskAddMenu";
import { NavBar } from "@/components/navigation/NavBar";
import TaskInfoMenu from "@/components/task/TaskInfoMenu/TaskInfoMenu";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <>
      <div
        className="w-full h-full flex flex-col justify-between items-center md:container md:px-16 md:py-2"
        id="basis"
      >
        <div className="flex flex-row justify-center items-center w-full">
          <div className="my-1"></div>
        </div>
        <div className="flex flex-col justify-center items-center bg-accent-black text-accent-white w-full h-full overflow-y-scroll">
          <div
            id="unit-container"
            className="flex flex-col justify-center items-center bg-accent-black text-accent-white w-full h-full overflow-y-scroll"
          >
            <Outlet />
          </div>
        </div>
      </div>
      <div id="absolute adder">
        <NavBar setIsAdding={setIsAdding} />
        <TaskInfoMenu type="add" isOpen={isAdding} setIsOpen={setIsAdding} />
        {/* <TaskAddMenu isOpen={isAdding} setIsOpen={setIsAdding} /> */}
      </div>
    </>
  );
};

export default Layout;

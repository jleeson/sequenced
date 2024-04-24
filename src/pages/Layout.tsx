import TaskAddMenu from "@/components/menus/TaskAddMenu/TaskAddMenu";
import { NavBar } from "@/components/navigation/NavBar";
import { taskContext } from "@/hooks/contexts";
import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [context, setContext] = useContext(taskContext);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <>
      <div
        className="w-full h-full flex flex-col justify-between items-center"
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
            <Outlet isAdding={isAdding} setIsAdding={setIsAdding} />
          </div>
        </div>
      </div>
      <div id="absolute adder">
        <NavBar setIsAdding={setIsAdding} />
        <TaskAddMenu
          isOpen={isAdding}
          setIsOpen={setIsAdding}
        />
      </div>
    </>
  );
};

export default Layout;

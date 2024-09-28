// import TaskAddMenu from "@/components/menus/TaskAddMenu/TaskAddMenu";
import { NavBar } from "@/components/navigation/NavBar";
import TaskInfoMenu from "@/components/task/TaskInfoMenu/TaskInfoMenu";
import { useUser } from "@/hooks/user";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AuthMenu from "./(Settings)/Login/AuthMenu";

const Layout = () => {
  const user = useUser();

  const [isAdding, setIsAdding] = useState(false);

  return (
    <>
      {
        user.isLoading && <span className="text-white text-xl">Loading...</span>
      }
      {
        user.isError && <span>{user.error.message}</span>
      }
      {user.isSuccess && (
        <div>
          {!user.data?.token && (
            <div className="w-screen h-screen flex flex-col items-start gap-4">
              <div className="w-full h-1/4 flex justify-center items-end">
                <span className="text-xl text-blue-400">Sequenced: ADHD Management</span>
              </div>
              <div className="w-full h-3/4">
                <AuthMenu />
              </div>
            </div>
          )}
          {user.data?.token && (
            <div>

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
            </div>
          )}
        </div>
      )}

    </>
  );
};

export default Layout;

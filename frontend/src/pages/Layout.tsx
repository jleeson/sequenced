import { NavBar } from "@/pages/(Layout)/NavBar";
import { useUser } from "@/hooks/user";
import { useState } from "react";

import TaskInfoMenu from "@/pages/(Layout)/TaskInfoMenu";
import AuthContainer from "./(Layout)/Login/AuthContainer";
import DataContainer from "./(Layout)/DataContainer";

const Layout = () => {
  const user = useUser();

  const [isAdding, setIsAdding] = useState(false);

  return (
    // TODO: Migrate to have user as context for dynamic loading
    <div>
      <div id="absolute adder">
        <NavBar setIsAdding={setIsAdding} />
        <div>

          <div>
            <AuthContainer />
            {user.data && (user.data?.statusCode != 401) && (
              <DataContainer />
            )}
          </div>
        </div>
        <TaskInfoMenu type="add" isOpen={isAdding} setIsOpen={setIsAdding} />
      </div>
    </div>
  );
};

export default Layout;

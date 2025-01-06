import { NavBar } from "@/pages/(Layout)/NavBar";
import { useUser } from "@/hooks/user";
import { useState } from "react";

import TaskInfoMenu from "@/pages/(Layout)/TaskInfoMenu";
import AuthContainer from "./(Layout)/Login/AuthContainer";
import DataContainer from "./(Layout)/DataContainer";
import { useNavigate } from "react-router";

const Layout = () => {
  const navigate = useNavigate();

  const user = useUser();

  if (!user.data && !window.location.pathname.startsWith("/auth"))
    navigate("/auth");

  if (user.data && window.location.pathname.startsWith("/auth"))
    navigate("/");

  return (
    <div>
      <div id="absolute adder">
        <NavBar />
        <div>
          <div>
            <DataContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

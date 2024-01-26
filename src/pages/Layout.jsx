import { Outlet } from "react-router-dom";
import NavBar from "../components/navigation/NavBar";
// import NavItem from "../components/navigation/nav-item";

const Layout = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      <div className="flex flex-col justify-center items-center bg-white w-full h-full">
        <Outlet />
      </div>
      <div className="flex flex-row justify-center items-center w-full fixed bottom-2 mb-10">
        <NavBar></NavBar>
      </div>
    </div>
  );
};

export default Layout;

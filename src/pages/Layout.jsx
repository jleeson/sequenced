import { Outlet } from "react-router-dom";
import NavBar from "../components/navigation/nav-bar";
import NavItem from "../components/navigation/nav-item";

const Layout = () => {
    return (
        <div className="w-full h-full flex flex-col justify-between">
            <div className="flex flex-row justify-center items-center pt-4">
                <Outlet />
            </div>
            <div className="flex flex-row justify-center items-center w-full h-16 shadow-inner shadow-sm shadow-gray-200">
                <NavBar></NavBar>
            </div>
        </div>
    )
};

export default Layout;
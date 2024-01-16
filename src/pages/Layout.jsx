import { Outlet, Link } from "react-router-dom";
import NavBar from "../components/navigation/nav-bar";
import NavBox from "../components/navigation/nav-box";

const Layout = () => {
    return (
        <div className="w-full h-full flex flex-col justify-between">
            <div className="flex flex-row justify-center items-center pt-4">
                <Outlet />
            </div>
            <div className="flex flex-row justify-center items-center w-full h-[5%]">
                <NavBar>
                    <NavBox>Test</NavBox>
                </NavBar>
            </div>
        </div>
    )
};

export default Layout;
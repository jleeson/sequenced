import { NavBar } from "@/pages/(Layout)/Nav/NavBar";
import DataContainer from "./(Layout)/DataContainer";

const Layout = () => {
  return (
    <div>
      <div id="absolute adder">
        <NavBar />
        <div>
          <div className="pb-40">
            <DataContainer />
          </div>
        </div>
      </div>
    </div >
  );
};

export default Layout;

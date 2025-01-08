import { NavBar } from "@/pages/(Layout)/Nav/NavBar";
import DataContainer from "./(Layout)/DataContainer";

const Layout = () => {
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

import { useState } from "react";
import { Link } from "react-router-dom";

export function NavSelector({ active, selectNav }) {
  return (
    <div onClick={() => selectNav(!active)} className="flex bg-blue-400 w-10 h-10 justify-center items-center text-center rounded-full">
      <div className={`${active ? "hidden" : "flex"} text-2xl text-gray-200`}>
        +
      </div>
      <div className={`${active ? "flex" : "hidden"} text-2xl text-gray-200`}>
        x
      </div>
    </div>
  );
}

export function NavItem({ children, href }) {
  return (
    <li className="flex justify-center border border-blue-600 px-4 py-2 bg-blue-400">
      <Link to={href} onClick={() => setActive(false)}>
        <div className="flex text-white">{children}</div>
      </Link>
    </li>
  );
}

export default function NavBar() {
  const [active, setActive] = useState(false);

  function selectNav(activeState){
    setActive(activeState);
  }

  return (
    <div className="w-full h-full flex flex-col items-center relative">
      <ul
        className={`${
          !active ? "hidden" : "flex"
        } flex-col-reverse absolute bottom-[125%] gap-2`}
      >
        <NavItem href="/">Home</NavItem>
        <NavItem href="/meds">Meds</NavItem>
        <NavItem href="/mood">Mood</NavItem>
        <NavItem href="/todo">To-Do</NavItem>
      </ul>
      <div className="w-full h-full flex flex-row justify-center items-center">
        <NavSelector active={active} selectNav={selectNav} />
      </div>
    </div>
  );
}

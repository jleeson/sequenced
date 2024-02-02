import { useState } from "react";
import { Link } from "react-router-dom";

export function NavSelector({ active, selectNav }) {
  return (
    <div
      onClick={() => selectNav(!active)}
      className={`flex ${active ? "bg-accent-blue" : "bg-green-700"} w-10 h-10 justify-center items-center text-center rounded-full`}
    >
      <div className={`flex text-2xl text-gray-200`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
          fill={`#FFFFFF`}
        >
          <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
        </svg>
      </div>
    </div>
  );
}

export function NavItem({ children, href }) {
  return (
    <li className="flex justify-center border border-accent-blue px-4 py-2 bg-blue-400 rounded-lg">
      <Link to={href} onClick={() => setActive(false)}>
        <div className="flex text-white">{children}</div>
      </Link>
    </li>
  );
}

export default function NavBar() {
  const [active, setActive] = useState(false);

  function selectNav(activeState) {
    setActive(activeState);
  }

  return (
    <div className="w-full h-16 flex flex-col items-center bg-accent-black">
      <ul
        className={`${
          !active ? "hidden" : "flex"
        } flex-col-reverse gap-2`}
      >
        {/* <NavItem href="/">Home</NavItem> */}
        {/* <NavItem href="/meds">Meds</NavItem> */}
        {/* <NavItem href="/mood">Mood</NavItem> */}
        {/* <NavItem href="/todo">To-Do</NavItem> */}
      </ul>
      <div className="w-full h-full flex flex-row justify-center items-center">
        {/* <NavSelector active={active} selectNav={selectNav} /> */}
      </div>
    </div>
  );
}

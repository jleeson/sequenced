import { Menu } from "@headlessui/react";

export default function TaskMenuItem({ children, active, handleClick }) {
  const handleTrueClick = (e) => {
    e.stopPropagation();
    handleClick(e);
  };

  return (
    <Menu.Item
      onClick={handleTrueClick}
      className={`${
        active && "text-accent-blue-400"
      } hover:text-accent-blue-700 hover:scale-125 active:hover:text-accent-blue-700 active:scale-125 text-center select-none bg-accent-blue-900 px-2 py-1 rounded-md`}
    >
      {children}
    </Menu.Item>
  );
}

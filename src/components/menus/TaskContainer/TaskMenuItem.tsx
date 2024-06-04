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
        active && "bg-accent-blue-600"
      } hover:text-accent-blue-700 hover:scale-125 active:hover:text-accent-blue-700 active:scale-125 text-center select-none px-2 py-1 border border-accent-white rounded-md `}
    >
      {children}
    </Menu.Item>
  );
}

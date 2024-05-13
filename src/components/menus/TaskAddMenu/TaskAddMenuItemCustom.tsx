export default function ToDoAddMenuItemCustom({ name, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name.toLowerCase()} className="text-lg px-1">
        {name}
      </label>
      <div className="flex flex-row w-full h-full">{children}</div>
    </div>
  );
}

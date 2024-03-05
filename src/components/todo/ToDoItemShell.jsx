export default function ToDoItemShell({ children, done }) {
  return (
    <div className={`flex flex-col w-full h-full bg-accent-black-900 border border-accent-black-300 px-3 py-3 rounded-md justify-center gap-2 ${done && "opacity-60"}`}>
      {children}
    </div>
  );
}

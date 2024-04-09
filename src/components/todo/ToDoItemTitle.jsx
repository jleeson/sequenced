export default function ToDoItemTitle({ text }) {
  return <div className="w-full text-lg mx-3 truncate">{text || "No Title"}</div>;
}

export default function ToDoItemTitle({ text }) {
  return <div className="text-lg mx-3">{text || "No Title"}</div>;
}

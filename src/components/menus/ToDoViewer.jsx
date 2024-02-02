export default function ToDoViewer({ item, setItemFull }) {
  function ToDoItemSpec({ text, value }) {
    return (
      <div className="w-full h-full flex flex-col items-center gap-1">
        <h1 className="text-xl text-accent-white mt-4">
          {text}
        </h1>
        <div className="w-full h-full bg-accent-black-800 text-center px-2 rounded-lg">
          <span className="text-lg text-accent-white text-lg">{value}</span>
        </div>
      </div>
    );
  }

  function parseDate(date) {
    if (!date) return "No Due Date Set";

    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();

    let hours = date.getHours();
    let minutes = date.getMinutes();

    return `${month}/${day}/${year} ${hours}:${minutes}`;
  }

  function closeMenu() {
    setItemFull(null);
  }

  return (
    <div className="w-full flex flex-col items-center text-accent-white">
      <div className="w-3/5 flex flex-col items-center">
        <ToDoItemSpec text="Title" value={item.title} />
        <ToDoItemSpec text="Description" value={item.description || "No Set Description"} />
        <ToDoItemSpec text="Date" value={parseDate(item.date)} />
        <ToDoItemSpec text="Is Complete?" value={item.done ? "Yes" : "No"} />
      </div>
      <div className="my-4">
        <button
          className="bg-accent-blue rounded-lg text-xl px-4 py-1 text-accent-white my-2"
          onClick={() => closeMenu()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

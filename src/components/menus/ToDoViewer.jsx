export default function ToDoViewer({ item, setItemFull }) {
  function ToDoItemSpec({ text, value }) {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-xl text-black mt-4 underline underline-offset-4">
          {text}
        </h1>
        <span className="text-lg text-gray-600">{value}</span>
      </div>
    );
  }

  function parseDate(date) {
    if(!date)
        return "No Due Date Set";

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
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <ToDoItemSpec text="Title" value={item.title} />
        <ToDoItemSpec text="Description" value={item.description} />
        <ToDoItemSpec text="Date" value={parseDate(item.date)} />
        <ToDoItemSpec text="Is Complete?" value={item.done ? "Yes" : "No"} />
      </div>
      <div className="my-4">
        <button
          className="bg-blue-500 rounded-lg text-xl px-4 py-1 text-white my-2"
          onClick={() => closeMenu()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

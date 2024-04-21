export default function ToDoAddMenuItemSelector({ items }) {
  return (
    <div className="flex flex-row w-full flex-wrap justify-center">
      {items.map((item, key) => {
        return (
          <div className="flex flex-col justify-center items-center mx-2 my-2 gap-1" key={key}>
            <label className="text-md w-20 text-center">{item.title}</label>
            <input className="text-md w-6 h-6" type="checkbox" value={item.value} name={item.name} />
          </div>
        );
      })}
    </div>
  );
}

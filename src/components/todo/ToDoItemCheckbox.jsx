export default function ToDoItemCheckBox(props) {
  return (
    <div className="w-7 h-7 flex flex-row items-center justify-center border border-accent-black-300 rounded-full px-0.5 py-0.5">
      <input
        type="checkbox"
        className="w-6 h-6 bg-transparent appearance-none checked:bg-accent-blue-500 rounded-full"
        {...props}
      />
    </div>
  );
}

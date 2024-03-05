export default function ToDoItemCheckBox(props) {
  //   return (
  //     <div className="w-6 h-6 flex justify-evenly items-center bg-red-50 rounded-md bg-transparent border border-white">
  //       <div className="w-4 h-4 flex justify-center items-center">
  //         <input
  //           type="checkbox"
  //           checked={item.done}
  //           className="appearance-none w-full h-full rounded-md bg-transparent checked:bg-accent-blue-500"
  //           onClick={(e) => e.stopPropagation()}
  //           onChange={handleMarkComplete}
  //         />
  //       </div>
  //     </div>
  //   );

  return (
    <div className="w-7 h-7 flex flex-row items-center justify-center border border-accent-black-300 rounded-full px-0.5 py-0.5">
      <input
        type="checkbox"
        className="w-full h-full bg-transparent appearance-none checked:bg-accent-blue-500"
        {...props}
      />
    </div>
  );
}

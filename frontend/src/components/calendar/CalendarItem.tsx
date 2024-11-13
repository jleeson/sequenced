export default function CalendarItem({ activeDate, date, changeDate }) {
  function convertDay(num) {
    switch (num) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
    }
  }

  let currentDate = new Date().getDate();

  return (
    <div onClick={(e) => changeDate(date, e)}
      className={`${date.getDate() == currentDate && "bg-accent-blue-600"} ${activeDate.getDate() == date.getDate() && "border border-solid border-white"} p-3 rounded-full w-10 h-10 flex justify-center text-center items-center`}>
      <span className="text-lg">{date.getDate()}</span>
    </div>
  )
  // return (
  //   <div
  //     className={`select-none w-11 h-16 ${
  //       activeDate.getDate() != date.getDate() && currentDate == date.getDate()
  //         ? "text-accent-blue-600"
  //         : "text-accent-white"
  //     } ${
  //       activeDate.getDate() == date.getDate()
  //         ? "bg-accent-blue-600 text-accent-white"
  //         : "bg-transparent"
  //     } rounded-lg px-2 py-2 border border-accent-white-100 hover:bg-accent-black-900`}
  //     onClick={(e) => changeDate(date, e)}
  //   >
  //     <div className="flex flex-col justify-center items-center">
  //       <h1 className="select-none text-center">{convertDay(date.getDay()).slice(0, 3)}</h1>
  //       <h1
  //         className={`select-none ${
  //           activeDate.getDate() == date.getDate()
  //             ? "bg-accent-blue-600 text-accent-white"
  //             : "bg-transparent"
  //         } ${
  //           activeDate.getDate() != date.getDate() && currentDate == date.getDate()
  //             ? "text-accent-blue-600"
  //             : "text-accent-white"
  //         } text-center`}
  //       >
  //         {date.getMonth() + 1}/{date.getDate()}
  //       </h1>
  //     </div>
  //   </div>
  // );
}

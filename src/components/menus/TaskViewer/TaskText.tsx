import { formatDateClean, formatDateTime } from "@/utils/date";
import { useState } from "react";

export function TaskText({
  name,
  value,
  handleSave,
  size,
  className,
  ...props
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(value);

  const saveData = () => {
    handleSave(tempData);
    setIsEditing(false);
  };

  if (props.type == "select")
    return (
      <div className="flex flex-col gap-2">
        <label className="text-lg">{name}</label>
        <select
          className="appearance-none w-full h-full text-base px-2 py-2 bg-accent-black-500 border border-accent-white rounded-md text-accent-white overflow-x-hidden overflow-y-scroll"
          value={value}
          onChange={props.onChange}
        >
          {props.options.map((option, key) => (
            <option key={key} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );

  return (
    <div className={`${className}`}>
      <h1 className="text-lg text-accent-white">{name}</h1>
      {isEditing && (
        <div className="w-64">
          {size == "medium" ? (
            <textarea
              {...props}
              value={tempData}
              onChange={(e) => setTempData(e.target.value)}
              className={`w-64 items-center flex text-base border border-accent-white inputy-1 px-2 bg-accent-black-600 text-accent-black-300 rounded-md`}
            />
          ) : (
            <input
              {...props}
              value={
                props?.type == "datetime-local"
                  ? formatDateTime(tempData)
                  : tempData
              }
              onChange={(e) => {
                e.stopPropagation();

                if (props.type == "datetime-local")
                  setTempData(new Date(e.target.value));
                else setTempData(e.target.value);
              }}
              maxLength={28}
              className={`w-64 ${
                size == "medium" ? "min-h-24" : "min-h-10"
              } items-center flex text-base border border-accent-white inputy-1 px-2 bg-accent-black-600 text-accent-black-300 rounded-md`}
            />
          )}

          <button
            className="py-1 px-2 bg-accent-blue-600 rounded-md border-accent-white mt-2"
            onClick={(e) => saveData()}
          >
            Save
          </button>
        </div>
      )}
      {!isEditing &&
        (size == "medium" ? (
          <textarea
            className={`w-64 h-20 items-center flex text-base border border-accent-white py-1 px-2 bg-accent-black-600 text-accent-white rounded-md`}
            onClick={() => setIsEditing(true)}
            value={value}
            onChange={() => {}}
          ></textarea>
        ) : (
          <p
            className={`w-64 ${
              size == "medium" ? "min-h-24" : "min-h-10"
            } items-center flex text-base border border-accent-white py-1 px-2 bg-accent-black-600 text-accent-white rounded-md`}
            onClick={() => setIsEditing(true)}
          >
            {props?.type == "datetime-local" && formatDateClean(value)}
            {props?.type != "datetime-local" && value}
          </p>
        ))}
    </div>
  );
}

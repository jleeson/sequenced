import { scheduleNotification } from "@/utils/notifs";
import { ChangeEventHandler } from "react";

export interface TaskMenuSelectOption {
  name: string;
  value: string;
}

export interface TaskMenuSelectPiece {
  name: string;
  value: string | number;
  onChange: ChangeEventHandler;
  options: TaskMenuSelectOption[];
}

export default function TaskAddMenuSelect({
  name,
  value,
  onChange,
  options,
}: TaskMenuSelectPiece) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg">{name}</label>
      <select
        className="appearance-none w-full h-full text-base px-2 py-2 bg-accent-black-500 border border-accent-white rounded-md text-accent-white overflow-x-hidden overflow-y-scroll"
        value={value}
        onChange={onChange}
      >
        {options.map((option: TaskMenuSelectOption, key: number) => (
          <option key={key} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

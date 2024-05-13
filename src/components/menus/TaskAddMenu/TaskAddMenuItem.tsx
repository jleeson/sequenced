export default function TaskAddMenuItem({ name, type, value, onChange }) {
  let inputPiece = (
    <input
      id={name.toLowerCase()}
      name={name.toLowerCase()}
      type={type}
      className="text-base px-2 py-2 bg-accent-black-500 border border-accent-white rounded-md text-accent-white overflow-x-hidden overflow-y-scroll"
      placeholder={`${name}...`}
      value={value}
      onChange={onChange}
      autoFocus={false}
    />
  );

  if (type == "textarea") {
    inputPiece = (
      <textarea
        id={name.toLowerCase()}
        name={name.toLowerCase()}
        className="resize-none text-base px-2 py-2 bg-accent-black-500 border border-accent-white rounded-md text-accent-white overflow-x-hidden overflow-y-scroll"
        placeholder={`${name}...`}
        value={value}
        onChange={onChange}
        autoFocus={false}
      ></textarea>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name.toLowerCase()} className="text-lg px-1">
        {name}
      </label>
      {inputPiece}
    </div>
  );
}

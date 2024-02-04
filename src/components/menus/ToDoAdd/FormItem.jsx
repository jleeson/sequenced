export default function FormItem({ title, ...props }) {
  return (
    <div className="flex flex-col">
      <label htmlFor="tdam-title" className="text-xl my-2 text-accent-white">
        {title}
      </label>
      <input
        id={`tdam-${title.toLowerCase()}`}
        name={`tdam-${title.toLowerCase()}`}
        className="p-2 bg-accent-black-700 rounded-lg text-accent-white"
        {...props}
      />
    </div>
  );
}

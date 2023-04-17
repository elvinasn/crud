type DropdownProps = {
  label: string;
  value: string;
  id: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
};

export default function Dropdown(props: DropdownProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.id} className="block text-sm font-medium  mb-2">
        {props.label}
      </label>
      <select
        id={props.id}
        value={props.value}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
        className=" border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

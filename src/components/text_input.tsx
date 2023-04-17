type TextInputProps = {
  label: string;
  value: string;
  id: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
};
export default function TextInput(props: TextInputProps) {
  return (
    <div className="flex flex-col flex-1">
      <label htmlFor={props.id} className="block mb-2 text-sm font-medium">
        {props.label}
      </label>
      <input
        type={props.type || "text"}
        disabled={props.disabled}
        id={props.id}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className=" border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

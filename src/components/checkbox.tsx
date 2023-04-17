type CheckboxProps = {
  label: string;
  value: boolean;
  id: string;
  onChange: (value: boolean) => void;
};
export default function Checkbox(props: CheckboxProps) {
  return (
    <div className="flex items-center my-1">
      <input
        checked={props.value}
        onChange={(e) => props.onChange(e.target.checked)}
        id={props.id}
        type="checkbox"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label htmlFor={props.id} className="ml-5 text-sm font-medium">
        {props.label}
      </label>
    </div>
  );
}

type Props = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export default function PrimaryButton(props: Props) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
      className="text-white w-full disabled:cursor-not-allowed disabled:bg-blue-400 bg-blue-700 hover:enabled:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:enabled:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      {props.label}
    </button>
  );
}

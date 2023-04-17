type Props = {
  label: string;
  onClick: () => void;
  full?: boolean;
};
export default function DeleteButton(props: Props) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ${
        props.full ? "w-full" : ""
      }`}
    >
      {props.label}
    </button>
  );
}

type Props = {
  children: React.ReactNode;
};
export default function Heading(props: Props) {
  return <h2 className="text-2xl font-bold mt-8">{props.children}</h2>;
}

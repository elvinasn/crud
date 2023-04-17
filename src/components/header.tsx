type HeaderProps = {
  children: React.ReactNode;
};
export default function Header(props: HeaderProps) {
  return <h2 className="text-2xl font-bold mt-8">{props.children}</h2>;
}

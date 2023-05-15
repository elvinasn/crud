import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <header>
      <nav className="bg-gray-800 h-[70px] flex items-center justify-center">
        <div className="flex flex-wrap items-center max-w-screen-xl gap-6">
          <Link
            href="/"
            className={`${router.pathname === "/" ? "text-blue-300" : ""}`}
          >
            Paslaugų teikėjai
          </Link>
          <Link
            href="/report"
            className={`${
              router.pathname === "/report" ? "text-blue-300" : ""
            }`}
          >
            Ataskaita
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-[#141411] px-6 pt-4 text-[#E8DDC7] md:px-12">

      <div className="flex items-center justify-between border-x border-t border-[#625846] px-5 py-5 md:px-8">

        <Link
          to="/"
          className="font-serif text-2xl text-[#E8DDC7] hover:text-[#B6A17A]"
        >
          THE UNKNOWN.
        </Link>

        <div className="flex gap-10">

          <Link
            to="/"
            className="text-xs tracking-[0.2em] text-[#A69C89] hover:text-[#E8DDC7]"
          >
            HOME
          </Link>

          <Link
            to="/mysteries"
            className="text-xs tracking-[0.2em] text-[#A69C89] hover:text-[#E8DDC7]"
          >
            THE ARCHIVE
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default NavBar;
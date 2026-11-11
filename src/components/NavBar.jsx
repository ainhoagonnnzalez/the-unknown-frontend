import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NavBar() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <nav className="absolute top-0 left-0 z-20 flex w-full items-center justify-between px-8 py-6 text-[#E8DDC7] md:px-12">
      <Link
        to="/"
        className="font-serif text-3xl text-[#E8DDC7] transition-colors duration-300 hover:text-[#B6A17A]"
      >
        THE UNKNOWN.
      </Link>

      <div className="flex gap-10">
        <Link
          to="/"
          className="text-xs tracking-[0.2em] text-[#E8DDC7] transition-colors duration-300 hover:text-[#B6A17A]"
        >
          HOME
        </Link>

        <Link
          to="/mysteries"
          className="text-xs tracking-[0.2em] text-[#E8DDC7] transition-colors duration-300 hover:text-[#B6A17A]"
        >
          THE ARCHIVE
        </Link>
      </div>
      <div className="flex items-center gap-3 border-l border-white/20 pl-6">
        <button
          type="button"
          onClick={() => changeLanguage("en")}
          className="cursor-pointer text-xs tracking-widest text-[#B49A6C] hover:text-white"
        >
          EN
        </button>

        <span className="text-xs text-white/30">/</span>

        <button
          type="button"
          onClick={() => changeLanguage("es")}
          className="cursor-pointer text-xs tracking-widest text-[#B49A6C] hover:text-white"
        >
          ES
        </button>
      </div>
    </nav>
  );
}

export default NavBar;

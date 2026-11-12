import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NavBar() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <nav className="absolute left-0 top-0 z-20 w-full px-8 py-6 text-[#E8DDC7] md:px-12">
      <div className="relative flex items-center justify-between">
        <Link
          to="/"
          className="font-mystery text-[2rem] leading-none tracking-[0.04em] text-[#E8DDC7] transition-colors duration-300 hover:text-[#B6A17A] md:text-[2.4rem]"
        >
          THE UNKNOWN.
        </Link>

        {/* CENTERED NAVIGATION */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
          <Link
            to="/"
            className="whitespace-nowrap text-xs tracking-[0.2em] text-[#E8DDC7] transition-colors duration-300 hover:text-[#B6A17A]"
          >
            {t("home")}
          </Link>

          <Link
            to="/mysteries"
            className="whitespace-nowrap text-xs tracking-[0.2em] text-[#E8DDC7] transition-colors duration-300 hover:text-[#B6A17A]"
          >
            {t("archive")}
          </Link>

          <Link
            to="/map"
            className="whitespace-nowrap text-xs tracking-[0.2em] text-[#E8DDC7] transition-colors duration-300 hover:text-[#B6A17A]"
          >
            {t("mapNav")}
          </Link>
        </div>

        {/* LANGUAGE SWITCH */}
        <div className="ml-auto flex items-center gap-3 border-l border-white/20 pl-6">
          <button
            type="button"
            onClick={() => changeLanguage("en")}
            className="cursor-pointer text-xs tracking-widest text-[#B49A6C] transition-colors hover:text-white"
          >
            EN
          </button>

          <span className="text-xs text-white/30">/</span>

          <button
            type="button"
            onClick={() => changeLanguage("es")}
            className="cursor-pointer text-xs tracking-widest text-[#B49A6C] transition-colors hover:text-white"
          >
            ES
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

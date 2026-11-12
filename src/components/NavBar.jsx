import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

function NavBar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  // CLOSE MOBILE MENU WHEN CHANGING PAGE
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: "/", label: t("home") },
    { path: "/mysteries", label: t("archive") },
    { path: "/map", label: t("mapNav") },
  ];

  return (
    <nav className="absolute left-0 top-0 z-50 w-full px-6 py-6 text-[#E8DDC7] md:px-12">

      <div className="relative flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="font-mystery relative z-50 whitespace-nowrap text-[1.8rem] leading-none tracking-[0.04em] text-[#E8DDC7] transition-colors duration-300 hover:text-[#B6A17A] md:text-[2.4rem]"
        >
          THE UNKNOWN.
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="whitespace-nowrap text-xs tracking-[0.2em] text-[#E8DDC7] transition-colors duration-300 hover:text-[#B6A17A]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="relative z-50 ml-auto flex items-center gap-5">

          {/* LANGUAGE SWITCH */}
          <div className="flex items-center gap-3 border-l border-white/20 pl-5 md:pl-6">
            <button
              type="button"
              onClick={() => changeLanguage("en")}
              className={`cursor-pointer text-xs tracking-widest transition-colors hover:text-white ${
                i18n.language.startsWith("en")
                  ? "text-[#E8DDC7]"
                  : "text-[#B49A6C]"
              }`}
            >
              EN
            </button>

            <span className="text-xs text-white/30">/</span>

            <button
              type="button"
              onClick={() => changeLanguage("es")}
              className={`cursor-pointer text-xs tracking-widest transition-colors hover:text-white ${
                i18n.language.startsWith("es")
                  ? "text-[#E8DDC7]"
                  : "text-[#B49A6C]"
              }`}
            >
              ES
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="flex h-9 w-9 cursor-pointer flex-col items-center justify-center gap-[6px] text-[#E8DDC7] lg:hidden"
          >
            <span
              className={`block h-[1px] w-6 bg-current transition-transform duration-300 ${
                menuOpen
                  ? "translate-y-[7px] rotate-45"
                  : ""
              }`}
            />

            <span
              className={`block h-[1px] w-6 bg-current transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />

            <span
              className={`block h-[1px] w-6 bg-current transition-transform duration-300 ${
                menuOpen
                  ? "-translate-y-[7px] -rotate-45"
                  : ""
              }`}
            />
          </button>

        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="absolute left-0 top-full z-40 w-full border-t border-white/10 bg-[#111210]/98 px-8 py-10 shadow-2xl lg:hidden"
        >
          <div className="flex flex-col gap-8">

            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center justify-between border-b border-white/10 pb-6 text-[#E8DDC7] transition-colors hover:text-[#B49A6C]"
              >
                <div className="flex items-center gap-5">

                  <span className="text-xs tracking-widest text-[#B49A6C]">
                    0{index + 1}
                  </span>

                  <span className="font-mystery text-3xl tracking-[0.04em]">
                    {link.label}
                  </span>

                </div>

                <span className="text-xl text-[#B49A6C] transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </Link>
            ))}

          </div>

          {/* MOBILE MENU FOOTER */}
          <p className="mt-10 text-[10px] tracking-[0.3em] text-[#B49A6C]">
            THE UNKNOWN — AN ARCHIVE OF THE UNEXPLAINED
          </p>

        </div>
      )}

    </nav>
  );
}

export default NavBar;
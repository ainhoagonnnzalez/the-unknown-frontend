import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#111210] px-8 py-16 text-[#F0EDE5]">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        >
          <source src="/videos/2.mp4" type="video/mp4" />
        </video>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-[#111210]/40" />

        {/* GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111210] via-transparent to-[#111210]" />
      </div>

      {/* FOOTER CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-12 md:flex-row">
          {/* BRAND */}
          <div>
            <Link
              to="/"
              className="mb-6 inline-block font-mystery text-[2.2rem] leading-none tracking-[0.04em] text-[#E8DDC7] transition-colors duration-300 hover:text-[#B49A6C]"
            >
              THE UNKNOWN.
            </Link>

            <p className="max-w-xs text-sm leading-7 text-[#A8A8A3]">
              {t("footerDescription")}
              <br />
              {t("footerSubtitle")}
            </p>
          </div>

          {/* NAVIGATION */}
          <div>
            <p className="mb-6 text-xs tracking-[0.2em] text-[#B49A6C]">
              {t("footerExplore")}
            </p>

            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-sm text-[#A8A8A3] transition-colors duration-300 hover:text-[#B49A6C]"
              >
                {t("home")}
              </Link>

              <Link
                to="/mysteries"
                className="text-sm text-[#A8A8A3] transition-colors duration-300 hover:text-[#B49A6C]"
              >
                {t("archive")}
              </Link>

              <Link
                to="/map"
                className="text-sm text-[#A8A8A3] transition-colors duration-300 hover:text-[#B49A6C]"
              >
                {t("mapNav")}
              </Link>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs tracking-widest text-[#777770]">
            © {new Date().getFullYear()} THE UNKNOWN.
          </p>

          <p className="text-xs tracking-widest text-[#B49A6C]">
            {t("footerCurious")}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#111210] px-8 py-16 text-[#F0EDE5]">

      <div className="mx-auto max-w-7xl">

        {/* FOOTER CONTENT */}
        <div className="mb-16 flex flex-col justify-between gap-12 md:flex-row">

          {/* BRAND */}
          <div>
            <Link
              to="/"
              className="mb-6 inline-block text-3xl font-bold tracking-tighter"
            >
              THE UNKNOWN.
            </Link>

            <p className="max-w-xs text-sm leading-7 text-[#A8A8A3]">
              An archive of the unexplained.
              <br />
              Some questions remain unanswered.
            </p>
          </div>

          {/* NAVIGATION */}
          <div>
            <p className="mb-6 text-xs tracking-[0.2em] text-[#B49A6C]">
              EXPLORE THE UNKNOWN
            </p>

            <div className="flex flex-col gap-4">

              <Link
                to="/"
                className="text-sm text-[#A8A8A3] hover:text-[#B49A6C]"
              >
                HOME
              </Link>

              <Link
                to="/mysteries"
                className="text-sm text-[#A8A8A3] hover:text-[#B49A6C]"
              >
                THE ARCHIVE
              </Link>

            </div>
          </div>

        </div>

        {/* FOOTER BOTTOM */}
        <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">

          <p className="text-xs tracking-widest text-[#777770]">
            © 2026 THE UNKNOWN.
          </p>

          <p className="text-xs tracking-widest text-[#B49A6C]">
            STAY CURIOUS.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
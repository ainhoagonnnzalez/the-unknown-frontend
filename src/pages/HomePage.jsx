import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import MysteryCard from "../components/MysteryCard";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../components/LoadingSpinner";

function HomePage() {
  const { t, i18n } = useTranslation();

  const [mysteries, setMysteries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getMysteries();
  }, []);

  // GET MYSTERIES
  // GET MYSTERIES
const getMysteries = async () => {
  try {
    setLoading(true);
    setError(false);

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/mysteries`
    );

    console.log("Respuesta de la API:", response.data);

    if (!Array.isArray(response.data)) {
      throw new Error("La API no ha devuelto un array de misterios");
    }

    setMysteries(response.data);
  } catch (error) {
    console.error("Error loading mysteries:", error);
    setMysteries([]);
    setError(true);
  } finally {
    setLoading(false);
  }
};

  // CURRENT LANGUAGE
  const isSpanish = i18n.language.startsWith("es");

  // FEATURED MYSTERIES
  const featuredMysteries = mysteries
    .filter((mystery) => {
      return (
        String(mystery.id) === "1" ||
        String(mystery.id) === "5" ||
        String(mystery.id) === "10"
      );
    })
    .map((mystery) => {
      if (isSpanish && mystery.translations?.es) {
        return {
          ...mystery,
          ...mystery.translations.es,
        };
      }

      return mystery;
    });

  return (
    <div className="bg-[#111210] text-[#F0EDE5]">
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden bg-[#141411] text-[#E8DDC7]">
        {/* SMOKE BACKGROUND */}
        <div className="pointer-events-none absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="/videos/3.mp4" type="video/mp4" />
          </video>
        </div>

        {/* DARK OVERLAY */}
        <div className="pointer-events-none absolute inset-0 bg-black/55"></div>

        {/* MAIN CONTENT */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-12 text-center">
          {/* CENTRAL COMPOSITION */}
          <div className="relative flex w-full max-w-7xl items-center justify-center">
            {/* CENTER TITLE */}
            <div className="relative z-10">
              <p className="editorial-label animate-fade-up delay-1 mb-8 leading-6 text-[#B6A17A]">
                {t("heroLabel")}
              </p>

              <h1 className="font-mystery animate-fade-up delay-2 mb-8 text-[4.2rem] leading-none tracking-[0.04em] text-[#F0EDE5] md:text-[7rem] lg:text-[10rem]">
                THE
                <br />
                UNKNOWN
              </h1>

              {/* DECORATIVE DIVIDER */}
              <div className="animate-fade-up delay-3 mb-8 flex items-center justify-center gap-6">
                <div className="h-px w-16 bg-[#B6A17A]/60"></div>

                <span className="text-xl text-[#B6A17A]">✦</span>

                <div className="h-px w-16 bg-[#B6A17A]/60"></div>
              </div>

              {/* DESCRIPTION */}
              <p className="animate-fade-up delay-3 mb-8 font-serif text-xl italic text-[#C4BFB4]">
                {t("heroSubtitle")}
              </p>

              {/* BUTTON */}
              <Link
                to="/mysteries"
                className="animate-fade-up delay-4 inline-block border border-[#B6A17A] px-10 py-5 text-xs tracking-[0.2em] text-[#E8DDC7] transition-colors duration-300 hover:bg-[#B6A17A] hover:text-[#141411]"
              >
                {t("heroButton")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CASES */}
      <section className="bg-[#111210] px-8 py-24">
        {/* FEATURED CONTENT */}
        <div className="relative z-10 mx-auto max-w-7xl">
          {/* SECTION LABEL */}
          <p className="mb-4 text-xs tracking-widest text-[#B49A6C]">
            {t("featuredLabel")}
          </p>

          {/* SECTION TITLE */}
          <h2 className="font-mystery mb-4 text-[2rem] leading-tight tracking-[0.04em] text-[#F0EDE5] md:text-[2.5rem]">
            {t("featuredTitle")}
          </h2>

          {/* SECTION DESCRIPTION */}
          <p className="mb-12 text-[#A8A8A3]">{t("featuredDescription")}</p>

          {/* LOADING */}
          {loading && <LoadingSpinner text={t("loadingCases")} />}

          {/* ERROR */}
          {error && <p className="text-[#A8A8A3]">{t("errorCases")}</p>}

          {/* FEATURED MYSTERY CARDS */}
          {!loading && !error && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {featuredMysteries.map((mystery) => {
                return <MysteryCard key={mystery.id} mystery={mystery} />;
              })}
            </div>
          )}

          {/* VIEW ALL BUTTON */}
          <div className="mt-12 text-center">
            <Link
              to="/mysteries"
              className="inline-block border border-[#B49A6C] px-8 py-4 text-sm text-[#B49A6C] transition-colors duration-300 hover:bg-[#B49A6C] hover:text-[#111210]"
            >
              {t("viewAll")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

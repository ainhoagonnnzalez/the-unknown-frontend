import { useEffect, useState } from "react";
import axios from "axios";
import MysteryCard from "../components/MysteryCard";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../components/LoadingSpinner";

function ExplorePage() {
  const { t, i18n } = useTranslation();

  const [mysteries, setMysteries] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getMysteries();
  }, []);

  // GET ALL MYSTERIES
  const getMysteries = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/mysteries`
      );

      setMysteries(response.data);
      setError(false);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // CURRENT LANGUAGE
  const isSpanish = i18n.language.startsWith("es");

  // TRANSLATE MYSTERIES
  const translatedMysteries = mysteries.map((mystery) => {
    if (isSpanish && mystery.translations?.es) {
      return {
        ...mystery,
        ...mystery.translations.es,
        originalCategory: mystery.category,
      };
    }

    return {
      ...mystery,
      originalCategory: mystery.category,
    };
  });

  // GET ALL CATEGORIES WITHOUT DUPLICATES
  const categories = [];

  mysteries.forEach((mystery) => {
    if (!categories.includes(mystery.category)) {
      categories.push(mystery.category);
    }
  });

  // GET TRANSLATED CATEGORY NAME
  const getCategoryName = (categoryName) => {
    if (!isSpanish) {
      return categoryName;
    }

    const mystery = mysteries.find(
      (item) => item.category === categoryName
    );

    return mystery?.translations?.es?.category || categoryName;
  };

  // FILTER MYSTERIES BY SEARCH AND CATEGORY
  const filteredMysteries = translatedMysteries.filter((mystery) => {
    const searchText = search.trim().toLowerCase();

    const originalMystery = mysteries.find(
      (item) => item.id === mystery.id
    );

    const matchesSearch =
      mystery.title.toLowerCase().includes(searchText) ||
      originalMystery?.title.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "all" || mystery.originalCategory === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#111210] px-8 py-20 text-[#F0EDE5]">

      {/* SMOKE BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">

        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-100"
        >
          <source src="/videos/2.mp4" type="video/mp4" />
        </video>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-[#111210]/65"></div>

      </div>

      {/* PAGE CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl">

        {/* HEADER */}
        <header className="mb-16">
          <p className="mb-6 text-xs tracking-[0.3em] text-[#B49A6C]">
            02 / {t("exploreLabel")}
          </p>

          <h1 className="font-mystery mb-6 text-[3.2rem] leading-none tracking-[0.04em] md:text-[6rem] lg:text-[7rem]">
            {t("exploreTitle")}
          </h1>

          <p className="max-w-xl text-lg text-[#A8A8A3]">
            {t("exploreDescription")}
          </p>
        </header>

        {/* SEARCH AND FILTERS */}
        <section className="mb-12 border-t border-white/10 pt-10">

          <p className="mb-6 text-xs tracking-[0.2em] text-[#B49A6C]">
            {t("searchPlaceholder")}
          </p>

          <div className="flex flex-col gap-4 md:flex-row">

            {/* SEARCH INPUT */}
            <input
              type="text"
              placeholder={t("searchBar")}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full border border-white/20 bg-[#1A1B19] px-6 py-4 text-[#F0EDE5] outline-none focus:border-[#B49A6C]"
            />

            {/* CATEGORY FILTER */}
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full border border-white/20 bg-[#1A1B19] px-6 py-4 text-[#F0EDE5] outline-none focus:border-[#B49A6C] md:w-64"
            >
              <option value="all">
                {t("allCategories")}
              </option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {getCategoryName(item)}
                </option>
              ))}

            </select>
          </div>
        </section>

        {/* RESULTS COUNTER */}
        {!loading && !error && (
          <div className="mb-8 border-b border-white/10 pb-4">
            <p className="text-xs tracking-[0.2em] text-[#A8A8A3]">
              {filteredMysteries.length} {t("casesFound")}
            </p>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <LoadingSpinner text={t("loadingCases")} />
        )}

        {/* ERROR */}
        {error && (
          <div className="py-20 text-center">
            <h2 className="mb-4 text-2xl">
              {t("errorCases")}
            </h2>

            <p className="text-[#A8A8A3]">
              {i18n.language.startsWith("es")
                ? "No hemos podido cargar los misterios. Inténtalo de nuevo más tarde."
                : "We couldn't load the mysteries. Please try again later."}
            </p>
          </div>
        )}

        {/* NO RESULTS */}
        {!loading && !error && filteredMysteries.length === 0 && (
          <div className="py-20 text-center">
            <h2 className="mb-4 text-2xl">
              {t("noCases")}
            </h2>

            <p className="text-[#A8A8A3]">
              {t("noCasesDescription")}
            </p>
          </div>
        )}

        {/* MYSTERY CARDS */}
        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredMysteries.map((mystery) => (
              <MysteryCard
                key={mystery.id}
                mystery={mystery}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}

export default ExplorePage;
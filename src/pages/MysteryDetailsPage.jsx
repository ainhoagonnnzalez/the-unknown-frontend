import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../components/LoadingSpinner";

function MysteryDetailsPage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  const [mystery, setMystery] = useState(null);
  const [theories, setTheories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getMystery();
    getTheories();
  }, [id]);

  // GET MYSTERY
  const getMystery = async () => {
    setLoading(true);
    setError(false);
    setMystery(null);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/mysteries/${id}`
      );

      setMystery(response.data);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // GET THEORIES
  const getTheories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/theories?mysteryId=${id}`
      );

      setTheories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE THEORY
  const deleteTheory = async (theoryId) => {
    const confirmDelete = window.confirm(t("confirmDelete"));

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/theories/${theoryId}`
      );

      getTheories();
    } catch (error) {
      console.log(error);
    }
  };

  // CURRENT LANGUAGE
  const isSpanish = i18n.resolvedLanguage?.startsWith("es") ||
    i18n.language.startsWith("es");

  // TRANSLATED MYSTERY
  const displayedMystery =
    isSpanish && mystery?.translations?.es
      ? { ...mystery, ...mystery.translations.es }
      : mystery;

  // DOCUMENTED THEORIES
  const documentedTheories = theories
    .filter((theory) => theory.source === "documented")
    .map((theory) => {
      if (isSpanish && theory.translations?.es) {
        return { ...theory, ...theory.translations.es };
      }

      return theory;
    });

  // COMMUNITY THEORIES
  const communityTheories = theories.filter(
    (theory) => theory.source === "community"
  );

  return (
    <div className="min-h-screen bg-[#111210] px-8 py-20 text-[#F0EDE5]">

      {/* LOADING */}
      {loading && (<LoadingSpinner text={t("loadingCases")} />)}

      {/* ERROR */}
      {error && (
        <div>
          <h2>{t("mysteryNotFound")}</h2>
          <p>{t("mysteryError")}</p>

          <Link to="/mysteries">
            {t("backToExplore")}
          </Link>
        </div>
      )}

      {/* MYSTERY DETAILS */}
      {!loading && !error && displayedMystery && (
        <div className="mb-20">

          {/* BACK LINK */}
          <Link
            to="/mysteries"
            className="mb-16 inline-block text-xs tracking-widest text-[#B49A6C] hover:text-white"
          >
            {t("backToArchive")}
          </Link>

          {/* CASE INFORMATION */}
          <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">

            <p className="text-xs tracking-[0.2em] text-[#B49A6C]">
              {t("caseFile")} / {displayedMystery.id}
            </p>

            <div className="flex items-center gap-3">

              <span className="text-xs tracking-[0.2em] text-[#B49A6C]">
                {t("status")}
              </span>

              <span className="border border-white/20 px-3 py-1 text-xs tracking-widest text-[#F0EDE5]">
                {isSpanish && mystery.translations?.es?.status
                  ? mystery.translations.es.status
                  : t(`statusValues.${mystery.status}`, {
                      defaultValue: mystery.status,
                    })}
              </span>

            </div>
          </div>

          {/* CASE HEADER */}
          <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

            {/* LEFT SIDE */}
            <div>

              <h1 className="font-mystery mb-8 text-5xl leading-none tracking-[0.04em] text-[#F0EDE5] md:text-7xl">
                {displayedMystery.title}
              </h1>

              <p className="max-w-lg text-xl leading-8 text-[#A8A8A3]">
                {displayedMystery.subtitle}
              </p>

            </div>

            {/* RIGHT SIDE */}
            <div className="relative h-[350px] overflow-hidden">

              <img
                src={displayedMystery.image}
                alt={displayedMystery.title}
                className="h-full w-full object-cover"
              />

              {/* DARK GRADIENT */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#111210] via-transparent to-transparent"></div>

            </div>
          </div>

          {/* METADATA */}
          <div className="grid grid-cols-1 gap-8 border-y border-white/10 py-8 md:grid-cols-3">

            {/* CATEGORY */}
            <div>
              <p className="mb-3 text-xs tracking-widest text-[#B49A6C]">
                {t("category")}
              </p>

              <p>{displayedMystery.category}</p>
            </div>

            {/* LOCATION */}
            <div>
              <p className="mb-3 text-xs tracking-widest text-[#B49A6C]">
                {t("location")}
              </p>

              <p>{displayedMystery.location}</p>
            </div>

            {/* YEAR */}
            <div>
              <p className="mb-3 text-xs tracking-widest text-[#B49A6C]">
                {t("year")}
              </p>

              <p>{displayedMystery.year}</p>
            </div>

          </div>

          {/* THE STORY */}
          <section className="mt-24 mb-32 border-t border-white/10 pt-16">

            <p className="mb-8 text-xs tracking-[0.3em] text-[#B49A6C]">
              01 / {t("story")}
            </p>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">

              <div>
                <h2 className="font-mystery text-[2.8rem] leading-none tracking-[0.04em] text-[#F0EDE5] md:text-[4.5rem]">
                  {t("story")}
                </h2>
              </div>

              <div className="md:col-span-2">

                {displayedMystery.story?.map((paragraph, index) => (
                  <p
                    key={index}
                    className="mb-8 text-lg leading-8 text-[#A8A8A3]"
                  >
                    {paragraph}
                  </p>
                ))}

              </div>
            </div>
          </section>

          {/* THE TIMELINE */}
          <section className="mb-32 border-t border-white/10 pt-16">

            <p className="mb-8 text-xs tracking-[0.3em] text-[#B49A6C]">
              02 / {t("timeline")}
            </p>

            <h2 className="font-mystery mb-16 text-[2.7rem] leading-none tracking-[0.04em] md:text-[4.5rem]">
              {t("timeline")}
            </h2>

            <div className="max-w-4xl">

              {displayedMystery.timeline?.map((item, index) => (
                <div key={index} className="flex gap-8">

                  {/* YEAR */}
                  <div className="w-24 shrink-0 text-right">
                    <p className="font-mystery text-3xl tracking-[0.04em] text-[#B49A6C]">
                      {item.year}
                    </p>
                  </div>

                  {/* LINE AND DOT */}
                  <div className="flex flex-col items-center">

                    <div className="h-3 w-3 shrink-0 rounded-full bg-[#B49A6C]"></div>

                    <div className="h-full min-h-16 w-px bg-white/20"></div>

                  </div>

                  {/* EVENT */}
                  <div className="pb-16">
                    <p className="text-lg leading-8 text-[#A8A8A3]">
                      {item.event}
                    </p>
                  </div>

                </div>
              ))}

            </div>
          </section>

          {/* THE EVIDENCE */}
          <section className="mb-32 border-t border-white/10 pt-16">

            <p className="mb-8 text-xs tracking-[0.3em] text-[#B49A6C]">
              03 / {t("evidence")}
            </p>

            <h2 className="font-mystery mb-16 text-[2.8rem] leading-none tracking-[0.04em] md:text-[4.5rem]">
              {t("evidence")}
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              {displayedMystery.evidence?.map((item, index) => (
                <div
                  key={index}
                  className="group border border-white/10 bg-[#1A1B19] p-10 transition-colors duration-300 hover:border-[#B49A6C]"
                >

                  {/* EVIDENCE NUMBER */}
                  <p className="mb-10 text-xs tracking-[0.2em] text-[#B49A6C]">
                    {t("evidence")} / {index + 1}
                  </p>

                  {/* EVIDENCE TITLE */}
                  <h3 className="font-mystery mb-6 text-[2.1rem] leading-none tracking-[0.04em] text-[#F0EDE5] md:text-[2.8rem]">
                    {item.title}
                  </h3>

                  {/* EVIDENCE DESCRIPTION */}
                  <p className="text-base leading-8 text-[#A8A8A3]">
                    {item.description}
                  </p>

                </div>
              ))}

            </div>
          </section>

          {/* UNANSWERED QUESTIONS */}
          <section className="mb-32 border-t border-white/10 pt-16">

            <p className="mb-8 text-xs tracking-[0.3em] text-[#B49A6C]">
              04 / {t("unansweredQuestions")}
            </p>

            <h2 className="font-mystery mb-16 text-[2.8rem] leading-none tracking-[0.04em] md:text-[4.5rem]">
              {t("unansweredQuestions")}
            </h2>

            <div className="border-t border-white/10">

              {displayedMystery.unansweredQuestions?.map(
                (question, index) => (
                  <div
                    key={index}
                    className="group flex items-start gap-8 border-b border-white/10 py-8 transition-colors duration-300 hover:border-[#B49A6C]"
                  >

                    {/* QUESTION NUMBER */}
                    <p className="w-12 shrink-0 text-sm text-[#B49A6C]">
                      {String(index + 1).padStart(2, "0")}
                    </p>

                    {/* QUESTION */}
                    <h3 className="flex-1 text-lg font-medium leading-relaxed text-[#F0EDE5] transition-colors duration-300 group-hover:text-[#B49A6C] md:text-xl">
                      {question}
                    </h3>

                    {/* DECORATIVE ARROW */}
                    <span className="text-xl text-[#B49A6C]">
                      ↗
                    </span>

                  </div>
                )
              )}

            </div>
          </section>

          {/* DOCUMENTED THEORIES */}
          <section className="mb-32 border-t border-white/10 pt-16">

            <p className="mb-8 text-xs tracking-[0.3em] text-[#B49A6C]">
              05 / {t("theories")}
            </p>

            <h2 className="font-mystery mb-6 text-[2.8rem] leading-none tracking-[0.04em] md:text-[4.5rem]">
              {t("documentedTheories")}
            </h2>

            <p className="mb-16 max-w-xl text-lg text-[#A8A8A3]">
              {t("documentedDescription")}
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              {documentedTheories.map((theory) => (
                <div
                  key={theory.id}
                  className="border border-white/10 bg-[#1A1B19] p-10 transition-colors duration-300 hover:border-[#B49A6C]"
                >

                  {/* THEORY TYPE AND EVIDENCE LEVEL */}
                  <div className="mb-10 flex items-center justify-between gap-4">

                    <p className="text-xs tracking-[0.2em] text-[#B49A6C]">
                      {t("documentedTheories")}
                    </p>

                    <p className="border border-white/20 px-3 py-2 text-xs text-[#A8A8A3]">
                      {theory.evidenceLevel}
                    </p>

                  </div>

                  {/* THEORY TITLE */}
                  <h3 className="font-mystery mb-6 text-[2.1rem] leading-none tracking-[0.04em] text-[#F0EDE5] md:text-[2.8rem]">
                    {theory.title}
                  </h3>

                  {/* THEORY DESCRIPTION */}
                  <p className="mb-10 text-base leading-8 text-[#A8A8A3]">
                    {theory.description}
                  </p>

                  {/* AUTHOR */}
                  <div className="border-t border-white/10 pt-6">

                    <p className="text-xs tracking-widest text-[#777770]">
                      {t("proposedBy")}
                    </p>

                    <p className="mt-3 text-sm text-[#F0EDE5]">
                      {theory.author}
                    </p>

                  </div>
                </div>
              ))}

            </div>
          </section>

          {/* COMMUNITY THEORIES */}
          <section className="mb-32 border-t border-white/10 pt-16">

            <p className="mb-8 text-xs tracking-[0.3em] text-[#B49A6C]">
              06 / {t("communityTheories")}
            </p>

            {/* SECTION HEADER */}
            <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">

              <div>
                <h2 className="font-mystery mb-6 text-[2.8rem] leading-none tracking-[0.04em] md:text-[4.5rem]">
                  {t("communityTheories")}
                </h2>

                <p className="max-w-xl text-lg text-[#A8A8A3]">
                  {t("communityDescription")}
                </p>
              </div>

              {/* SUBMIT BUTTON */}
              <Link
                to={`/mysteries/${id}/theories/new`}
                className="inline-block border border-[#B49A6C] px-8 py-4 text-center text-xs tracking-widest text-[#B49A6C] transition-colors duration-300 hover:bg-[#B49A6C] hover:text-[#111210]"
              >
                {t("submitTheory")}
              </Link>

            </div>

            {/* COMMUNITY THEORY CARDS */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              {communityTheories.map((theory) => (
                <div
                  key={theory.id}
                  className="flex flex-col border border-white/10 bg-[#1A1B19] p-10 transition-colors duration-300 hover:border-[#B49A6C]"
                >

                  {/* THEORY TYPE */}
                  <p className="mb-10 text-xs tracking-[0.2em] text-[#B49A6C]">
                    {t("communityContribution")}
                  </p>

                  {/* TITLE */}
                  <h3 className="font-mystery mb-6 text-[2rem] leading-none tracking-[0.04em] text-[#F0EDE5] md:text-[2.5rem]">
                    {theory.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="mb-10 text-base leading-8 text-[#A8A8A3]">
                    {theory.description}
                  </p>

                  {/* AUTHOR */}
                  <div className="mb-10">

                    <p className="mb-3 text-xs tracking-widest text-[#777770]">
                      {t("submittedBy")}
                    </p>

                    <p className="text-sm text-[#F0EDE5]">
                      {theory.author}
                    </p>

                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-6">

                    {/* EDIT */}
                    <Link
                      to={`/theories/${theory.id}/edit`}
                      className="text-xs tracking-widest text-[#B49A6C] hover:text-white"
                    >
                      {t("editTheory")}
                    </Link>

                    {/* DELETE */}
                    <button
                      type="button"
                      onClick={() => deleteTheory(theory.id)}
                      className="cursor-pointer text-xs tracking-widest text-[#A8A8A3] hover:text-red-400"
                    >
                      {t("deleteTheory")}
                    </button>

                  </div>
                </div>
              ))}

            </div>

            {/* EMPTY STATE */}
            {communityTheories.length === 0 && (
              <div className="border border-white/10 bg-[#1A1B19] px-8 py-16 text-center">

                <h3 className="font-mystery mb-4 text-[2rem] leading-none tracking-[0.04em] text-[#F0EDE5] md:text-[2.8rem]">
                  {t("noCommunityTheories")}
                </h3>

                <p className="text-[#A8A8A3]">
                  {t("beFirst")}
                </p>

              </div>
            )}

          </section>

        </div>
      )}
    </div>
  );
}

export default MysteryDetailsPage;
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function MysteryDetailsPage() {
  const { id } = useParams();

  const [mystery, setMystery] = useState(null);
  const [theories, setTheories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getMystery();
    getTheories();
  }, [id]);

  const getMystery = async () => {
    setLoading(true);
    setError(false);
    setMystery(null);
    try {
      const response = await axios.get(`http://localhost:5005/mysteries/${id}`);

      setMystery(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  const getTheories = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5005/theories?mysteryId=${id}`,
      );

      console.log(response.data);

      setTheories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTheory = async (theoryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this theory?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5005/theories/${theoryId}`);

      getTheories();
    } catch (error) {
      console.log(error);
    }
  };
  const documentedTheories = theories.filter((theory) => {
    return theory.source === "documented";
  });

  const communityTheories = theories.filter((theory) => {
    return theory.source === "community";
  });
  return (
    <div className="min-h-screen bg-[#111210] px-8 py-20 text-[#F0EDE5]">
      {loading && <p>Loading mystery...</p>}
      {error && (
        <div>
          <h2>Mystery not found.</h2>
          <p>We couldn't load this mystery.</p>
          <Link to="/mysteries">Back to Explore →</Link>
        </div>
      )}

      {!loading && !error && mystery && (
        <div className="mb-20">
          {/* BACK LINK */}
          <Link
            to="/mysteries"
            className="mb-16 inline-block text-xs tracking-widest text-[#B49A6C] hover:text-white"
          >
            ← BACK TO THE ARCHIVE
          </Link>

          {/* CASE INFORMATION */}
          <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
            <p className="text-xs tracking-[0.2em] text-[#B49A6C]">
              CASE FILE / {mystery.id}
            </p>

            <p className="text-xs tracking-[0.2em] text-[#A8A8A3]">
              STATUS: {mystery.status}
            </p>
          </div>

          {/* TITLE */}
          <h1 className="mb-8 text-6xl font-bold tracking-tighter md:text-8xl">
            {mystery.title}
          </h1>

          {/* SUBTITLE */}
          <p className="mb-16 max-w-2xl text-xl text-[#A8A8A3]">
            {mystery.subtitle}
          </p>

          {/* METADATA */}
          <div className="grid grid-cols-1 gap-8 border-y border-white/10 py-8 md:grid-cols-3">
            <div>
              <p className="mb-3 text-xs tracking-widest text-[#B49A6C]">
                CATEGORY
              </p>
              <p>{mystery.category}</p>
            </div>

            <div>
              <p className="mb-3 text-xs tracking-widest text-[#B49A6C]">
                LOCATION
              </p>
              <p>{mystery.location}</p>
            </div>

            <div>
              <p className="mb-3 text-xs tracking-widest text-[#B49A6C]">
                YEAR
              </p>
              <p>{mystery.year}</p>
            </div>
          </div>
          {/* THE STORY */}

          <section className="mt-24 mb-32 border-t border-white/10 pt-16">
            <p className="mb-8 text-xs tracking-[0.3em] text-[#B49A6C]">
              01 / THE STORY
            </p>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              <div>
                <h2 className="text-5xl font-bold tracking-tighter">
                  THE STORY
                </h2>
              </div>

              <div className="md:col-span-2">
                {mystery.story.map((paragraph, index) => {
                  return (
                    <p
                      key={index}
                      className="mb-8 text-lg leading-8 text-[#A8A8A3]"
                    >
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>
          </section>
          {/* THE TIMELINE */}

          <section className="mb-32 border-t border-white/10 pt-16">
            <p className="mb-8 text-xs tracking-[0.3em] text-[#B49A6C]">
              02 / CHRONOLOGY
            </p>

            <h2 className="mb-16 text-5xl font-bold tracking-tighter">
              THE TIMELINE
            </h2>

            <div className="max-w-4xl">
              {mystery.timeline.map((item, index) => {
                return (
                  <div key={index} className="flex gap-8">
                    {/* YEAR */}
                    <div className="w-24 shrink-0 text-right">
                      <p className="text-xl font-bold text-[#B49A6C]">
                        {item.year}
                      </p>
                    </div>

                    {/* LINE AND DOT */}
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 shrink-0 rounded-full bg-[#B49A6C]"></div>

                      <div className="h-full w-px min-h-16 bg-white/20"></div>
                    </div>

                    {/* EVENT */}
                    <div className="pb-16">
                      <p className="text-lg leading-8 text-[#A8A8A3]">
                        {item.event}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          {/* THE EVIDENCE */}

          <section className="mb-32 border-t border-white/10 pt-16">
            <p className="mb-8 text-xs tracking-[0.3em] text-[#B49A6C]">
              03 / THE INVESTIGATION
            </p>

            <h2 className="mb-16 text-5xl font-bold tracking-tighter">
              THE EVIDENCE
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {mystery.evidence.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="group border border-white/10 bg-[#1A1B19] p-10 transition-colors duration-300 hover:border-[#B49A6C]"
                  >
                    {/* EVIDENCE NUMBER */}
                    <p className="mb-10 text-xs tracking-[0.2em] text-[#B49A6C]">
                      EVIDENCE / {index + 1}
                    </p>

                    {/* EVIDENCE TITLE */}
                    <h3 className="mb-6 text-2xl font-bold text-[#F0EDE5]">
                      {item.title}
                    </h3>

                    {/* EVIDENCE DESCRIPTION */}
                    <p className="text-base leading-8 text-[#A8A8A3]">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
          {/* UNANSWERED QUESTIONS */}

          <section className="mb-32 border-t border-white/10 pt-16">
            <p className="mb-8 text-xs tracking-[0.3em] text-[#B49A6C]">
              04 / THE UNKNOWN
            </p>

            <h2 className="mb-16 text-5xl font-bold tracking-tighter">
              UNANSWERED
              <br />
              QUESTIONS
            </h2>

            <div className="border-t border-white/10">
              {mystery.unansweredQuestions.map((question, index) => {
                return (
                  <div
                    key={index}
                    className="group flex items-start gap-8 border-b border-white/10 py-8 transition-colors duration-300 hover:border-[#B49A6C]"
                  >
                    {/* QUESTION NUMBER */}
                    <p className="w-12 shrink-0 text-sm text-[#B49A6C]">
                      {String(index + 1).padStart(2, "0")}
                    </p>

                    {/* QUESTION */}
                    <h3 className="flex-1 text-2xl font-medium text-[#F0EDE5] transition-colors duration-300 group-hover:text-[#B49A6C]">
                      {question}
                    </h3>

                    {/* DECORATIVE ARROW */}
                    <span className="text-xl text-[#B49A6C]">↗</span>
                  </div>
                );
              })}
            </div>
          </section>
          {/* DOCUMENTED THEORIES */}

          <section className="mb-32 border-t border-white/10 pt-16">
            <p className="mb-8 text-xs tracking-[0.3em] text-[#B49A6C]">
              05 / THE THEORIES
            </p>

            <h2 className="mb-6 text-5xl font-bold tracking-tighter">
              DOCUMENTED
              <br />
              THEORIES
            </h2>

            <p className="mb-16 max-w-xl text-lg text-[#A8A8A3]">
              Existing explanations and hypotheses surrounding this case.
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {documentedTheories.map((theory) => {
                return (
                  <div
                    key={theory.id}
                    className="border border-white/10 bg-[#1A1B19] p-10 transition-colors duration-300 hover:border-[#B49A6C]"
                  >
                    {/* THEORY TYPE AND EVIDENCE LEVEL */}
                    <div className="mb-10 flex items-center justify-between gap-4">
                      <p className="text-xs tracking-[0.2em] text-[#B49A6C]">
                        DOCUMENTED THEORY
                      </p>

                      <p className="border border-white/20 px-3 py-2 text-xs text-[#A8A8A3]">
                        {theory.evidenceLevel}
                      </p>
                    </div>

                    {/* THEORY TITLE */}
                    <h3 className="mb-6 text-2xl font-bold text-[#F0EDE5]">
                      {theory.title}
                    </h3>

                    {/* THEORY DESCRIPTION */}
                    <p className="mb-10 text-base leading-8 text-[#A8A8A3]">
                      {theory.description}
                    </p>

                    {/* AUTHOR */}
                    <div className="border-t border-white/10 pt-6">
                      <p className="text-xs tracking-widest text-[#777770]">
                        PROPOSED BY
                      </p>

                      <p className="mt-3 text-sm text-[#F0EDE5]">
                        {theory.author}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          {/* COMMUNITY THEORIES */}

          <section className="mb-32 border-t border-white/10 pt-16">
            <p className="mb-8 text-xs tracking-[0.3em] text-[#B49A6C]">
              06 / COMMUNITY INVESTIGATIONS
            </p>

            {/* SECTION HEADER */}
            <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <h2 className="mb-6 text-5xl font-bold tracking-tighter">
                  COMMUNITY
                  <br />
                  THEORIES
                </h2>

                <p className="max-w-xl text-lg text-[#A8A8A3]">
                  Every mystery has more than one explanation. Share yours with
                  the archive.
                </p>
              </div>

              {/* SUBMIT BUTTON */}
              <Link
                to={`/mysteries/${id}/theories/new`}
                className="inline-block border border-[#B49A6C] px-8 py-4 text-center text-xs tracking-widest text-[#B49A6C] transition-colors duration-300 hover:bg-[#B49A6C] hover:text-[#111210]"
              >
                + SUBMIT YOUR THEORY
              </Link>
            </div>

            {/* COMMUNITY THEORY CARDS */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {communityTheories.map((theory) => {
                return (
                  <div
                    key={theory.id}
                    className="flex flex-col border border-white/10 bg-[#1A1B19] p-10 transition-colors duration-300 hover:border-[#B49A6C]"
                  >
                    {/* THEORY TYPE */}
                    <p className="mb-10 text-xs tracking-[0.2em] text-[#B49A6C]">
                      COMMUNITY CONTRIBUTION
                    </p>

                    {/* TITLE */}
                    <h3 className="mb-6 text-2xl font-bold text-[#F0EDE5]">
                      {theory.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="mb-10 text-base leading-8 text-[#A8A8A3]">
                      {theory.description}
                    </p>

                    {/* AUTHOR */}
                    <div className="mb-10">
                      <p className="mb-3 text-xs tracking-widest text-[#777770]">
                        SUBMITTED BY
                      </p>

                      <p className="text-sm text-[#F0EDE5]">{theory.author}</p>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-6">
                      {/* EDIT */}
                      <Link
                        to={`/theories/${theory.id}/edit`}
                        className="text-xs tracking-widest text-[#B49A6C] hover:text-white"
                      >
                        EDIT THEORY →
                      </Link>

                      {/* DELETE */}
                      <button
                        type="button"
                        onClick={() => deleteTheory(theory.id)}
                        className="cursor-pointer text-xs tracking-widest text-[#A8A8A3] hover:text-red-400"
                      >
                        DELETE THEORY
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* EMPTY STATE */}
            {communityTheories.length === 0 && (
              <div className="border border-white/10 bg-[#1A1B19] px-8 py-16 text-center">
                <h3 className="mb-4 text-2xl text-[#F0EDE5]">
                  No community theories yet.
                </h3>

                <p className="text-[#A8A8A3]">
                  Be the first to share your explanation.
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

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import MysteryCard from "../components/MysteryCard";

function HomePage() {
  const [mysteries, setMysteries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getMysteries();
  }, []);

  const getMysteries = async () => {
    try {
      const response = await axios.get("http://localhost:5005/mysteries");

      setMysteries(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  const featuredMysteries = mysteries.filter((mystery) => {
    return mystery.id === "1" || mystery.id === "5" || mystery.id === "10";
  });

  return (
    <div className="bg-[#141411] text-[#E8DDC7]">
      {/* HERO SECTION */}
      <section className="flex h-[calc(100dvh-90px)] min-h-[550px] flex-col bg-[#141411] px-6 pb-4 text-[#E8DDC7] md:px-12">
        {/* OUTER FRAME */}
        <div className="flex h-full flex-col border-x border-b border-[#625846] p-5 md:p-8">
          {/* TOP BAR */}
          <div className="flex items-center justify-between border-b border-[#625846] pb-3">
            <p className="editorial-label text-[#B6A17A]">
              AN ARCHIVE OF THE UNEXPLAINED
            </p>

            <p className="editorial-label text-[#A69C89]">VOL. I — 2026</p>
          </div>

          {/* MAIN CONTENT */}
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center py-4 text-center">
            {/* ORNAMENT */}
            <p className="animate-fade-up delay-1 mb-4 text-4xl text-[#B6A17A]">
              ✦
            </p>

            {/* SMALL HEADING */}
            <p className="editorial-label animate-fade-up delay-1 mb-4 leading-6 text-[#B6A17A]">
              AN ARCHIVE OF
              <br />
              THE UNEXPLAINED
            </p>

            {/* MAIN TITLE */}
            <h1 className="editorial-title animate-fade-up delay-2 mb-5 text-[65px] md:text-[95px] lg:text-[115px]">
              THE
              <br />
              UNKNOWN
            </h1>

            {/* DECORATIVE DIVIDER */}
            <div className="animate-fade-up delay-3 mb-5 flex items-center gap-6">
              <div className="h-px w-16 bg-[#625846]"></div>

              <span className="text-xl text-[#B6A17A]">✦</span>

              <div className="h-px w-16 bg-[#625846]"></div>
            </div>

            {/* DESCRIPTION */}
            <p className="animate-fade-up delay-3 mb-5 max-w-md font-serif text-lg italic leading-6 text-[#A69C89] md:text-xl">
              Beyond what is known,
              <br />
              lies what remains hidden.
            </p>

            {/* BUTTON */}
            <Link
              to="/mysteries"
              className="animate-fade-up delay-4 border border-[#B6A17A] px-10 py-3 text-xs tracking-[0.2em] text-[#E8DDC7] transition-colors duration-300 hover:bg-[#B6A17A] hover:text-[#141411]"
            >
              ENTER THE ARCHIVE →
            </Link>
          </div>

          {/* BOTTOM BAR */}
          <div className="flex items-center justify-between border-t border-[#625846] pt-3">
            <p className="editorial-label text-[#A69C89]">EST. 2026</p>

            <p className="editorial-label text-[#B6A17A]">30 CASE FILES</p>
          </div>
        </div>
      </section>

      {/* FEATURED CASES */}
      <section className="bg-[#141411] px-8 py-24">
        <div className="mx-auto max-w-7xl">
          {/* SECTION LABEL */}
          <p className="mb-4 text-xs tracking-widest text-[#B6A17A]">
            01 / THE ARCHIVE
          </p>

          {/* SECTION TITLE */}
          <h2 className="mb-4 text-5xl font-bold text-[#E8DDC7]">
            FEATURED CASES
          </h2>

          {/* SECTION DESCRIPTION */}
          <p className="mb-12 text-[#A69C89]">
            Discover the stories that continue to defy explanation.
          </p>

          {/* LOADING */}
          {loading && <p className="text-[#A69C89]">Loading mysteries...</p>}

          {/* ERROR */}
          {error && (
            <p className="text-[#A69C89]">
              Something went wrong loading the mysteries.
            </p>
          )}

          {/* FEATURED CARDS */}
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
              className="inline-block border border-[#B6A17A] px-8 py-4 text-sm tracking-widest text-[#B6A17A] transition-colors duration-300 hover:bg-[#B6A17A] hover:text-[#141411]"
            >
              VIEW ALL CASES →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function MysteryCard({ mystery }) {
    const {t} = useTranslation()
  return (
    <Link
      to={`/mysteries/${mystery.id}`}
      className="group block overflow-hidden border border-white/10 bg-[#171816] transition-colors duration-300 hover:border-[#B49A6C]/50"
    >
      {/* IMAGE */}
      <div className="h-[190px] overflow-hidden">
        <img
          src={mystery.image}
          alt={mystery.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* CONTENT */}
      <div className="flex min-h-[260px] flex-col p-8">

        {/* CASE NUMBER AND CATEGORY */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-xs tracking-[0.2em] text-[#B49A6C]">
            CASE / {mystery.id}
          </p>

          <p className="text-xs text-[#A8A8A3]">
            {mystery.category}
          </p>
        </div>

        {/* TITLE */}
        <h2 className="mb-4 font-serif text-3xl leading-tight text-[#F0EDE5]">
          {mystery.title}
        </h2>

        {/* DESCRIPTION */}
        <p className="mb-8 text-sm leading-6 text-[#A8A8A3]">
          {mystery.subtitle}
        </p>

        {/* BOTTOM LINK */}
        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-6">
          <span className="text-xs tracking-[0.2em] text-[#F0EDE5]">
            {t("exploreCase")}
          </span>

          <span className="text-xl text-[#B49A6C] transition-transform duration-300 group-hover:translate-x-1">
            ↗
          </span>
        </div>

      </div>
    </Link>
  );
}

export default MysteryCard;
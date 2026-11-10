import { Link } from "react-router-dom";

function MysteryCard({ mystery }) {

  let image = "/hero.jpg";

  if (mystery.id === "1") {
    image = "/mysteries/bermuda.jpg";
  }

  if (mystery.id === "5") {
    image = "/mysteries/mh370.jpg";
  }

  if (mystery.id === "10") {
    image = "/mysteries/dyatlov.jpg";
  }

  return (
    <div className="group overflow-hidden border border-white/10 bg-[#1A1B19]">

      {/* IMAGEN */}
      <div className="overflow-hidden">
        <img
          src={image}
          alt={mystery.title}
          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* CONTENIDO */}
      <div className="p-6">

        <p className="mb-4 text-xs tracking-widest text-[#B49A6C]">
          {mystery.category}
        </p>

        <h2 className="mb-3 text-2xl font-bold text-[#F0EDE5]">
          {mystery.title}
        </h2>

        <p className="mb-6 text-sm text-[#A8A8A3]">
          {mystery.subtitle}
        </p>

        <Link
          to={`/mysteries/${mystery.id}`}
          className="text-sm text-[#B49A6C] hover:text-[#F0EDE5]"
        >
          EXPLORE CASE →
        </Link>

      </div>

    </div>
  );
}

export default MysteryCard;
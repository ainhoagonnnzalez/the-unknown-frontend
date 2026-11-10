import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#111210] px-8 py-20 text-center text-[#F0EDE5]">

      <p className="mb-8 text-xs tracking-[0.3em] text-[#B49A6C]">
        ERROR / 404
      </p>

      <h1 className="text-[180px] font-bold leading-none tracking-tighter text-[#242522]">
        404
      </h1>

      <h2 className="mb-6 text-5xl font-bold tracking-tighter">
        CASE NOT FOUND.
      </h2>

      <p className="mb-12 max-w-md text-lg leading-8 text-[#A8A8A3]">
        Some things are meant to remain undiscovered.
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/mysteries"
        className="border border-[#B49A6C] px-8 py-4 text-xs tracking-widest text-[#B49A6C] transition-colors duration-300 hover:bg-[#B49A6C] hover:text-[#111210]"
      >
        BACK TO THE ARCHIVE →
      </Link>

    </main>
  );
}

export default NotFoundPage;
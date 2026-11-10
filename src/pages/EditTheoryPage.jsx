import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function EditTheoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mysteryId, setMysteryId] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getTheory();
  }, [id]);

  const getTheory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5005/theories/${id}`
      );

      setAuthor(response.data.author);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setMysteryId(response.data.mysteryId);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedTheory = {
      author: author,
      title: title,
      description: description,
    };

    try {
      await axios.patch(
        `http://localhost:5005/theories/${id}`,
        updatedTheory
      );

      navigate(`/mysteries/${mysteryId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen bg-[#111210] px-8 py-20 text-[#F0EDE5]">
      <div className="mx-auto max-w-4xl">

        {/* LOADING */}
        {loading && (
          <p className="text-[#A8A8A3]">
            Loading theory...
          </p>
        )}

        {/* ERROR */}
        {error && (
          <div>
            <h2 className="mb-4 text-2xl">
              Something went wrong.
            </h2>

            <p className="mb-8 text-[#A8A8A3]">
              We couldn't load this theory.
            </p>

            <Link to="/mysteries" className="text-[#B49A6C]">
              ← BACK TO THE ARCHIVE
            </Link>
          </div>
        )}

        {/* EDIT FORM */}
        {!loading && !error && (
          <div>

            {/* BACK LINK */}
            <Link
              to={`/mysteries/${mysteryId}`}
              className="mb-16 inline-block text-xs tracking-widest text-[#B49A6C] hover:text-white"
            >
              ← BACK TO CASE FILE
            </Link>

            {/* HEADER */}
            <header className="mb-16">

              <p className="mb-8 text-xs tracking-[0.3em] text-[#B49A6C]">
                08 / REVISE YOUR CONTRIBUTION
              </p>

              <h1 className="mb-8 text-6xl font-bold tracking-tighter md:text-8xl">
                EDIT
                <br />
                YOUR THEORY.
              </h1>

              <p className="max-w-xl text-lg leading-8 text-[#A8A8A3]">
                Every investigation evolves.
                Refine your perspective and update your contribution.
              </p>

            </header>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-white/10 pt-12"
            >

              {/* AUTHOR */}
              <div className="mb-10">

                <label
                  htmlFor="author"
                  className="mb-4 block text-xs tracking-[0.2em] text-[#B49A6C]"
                >
                  YOUR NAME
                </label>

                <input
                  id="author"
                  type="text"
                  value={author}
                  onChange={(event) => setAuthor(event.target.value)}
                  required
                  className="w-full border border-white/20 bg-[#1A1B19] px-6 py-5 text-[#F0EDE5] outline-none transition-colors duration-300 focus:border-[#B49A6C]"
                />

              </div>

              {/* TITLE */}
              <div className="mb-10">

                <label
                  htmlFor="title"
                  className="mb-4 block text-xs tracking-[0.2em] text-[#B49A6C]"
                >
                  THEORY TITLE
                </label>

                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                  className="w-full border border-white/20 bg-[#1A1B19] px-6 py-5 text-[#F0EDE5] outline-none transition-colors duration-300 focus:border-[#B49A6C]"
                />

              </div>

              {/* DESCRIPTION */}
              <div className="mb-12">

                <label
                  htmlFor="description"
                  className="mb-4 block text-xs tracking-[0.2em] text-[#B49A6C]"
                >
                  YOUR THEORY
                </label>

                <textarea
                  id="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                  rows="8"
                  className="w-full resize-none border border-white/20 bg-[#1A1B19] px-6 py-5 text-[#F0EDE5] outline-none transition-colors duration-300 focus:border-[#B49A6C]"
                />

              </div>

              {/* SAVE BUTTON */}
              <button
                type="submit"
                className="cursor-pointer border border-[#B49A6C] bg-[#B49A6C] px-10 py-5 text-xs font-bold tracking-widest text-[#111210] transition-colors duration-300 hover:bg-transparent hover:text-[#B49A6C]"
              >
                SAVE CHANGES →
              </button>

            </form>

          </div>
        )}

      </div>
    </main>
  );
}

export default EditTheoryPage;
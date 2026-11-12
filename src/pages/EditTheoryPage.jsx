import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

function EditTheoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mysteryId, setMysteryId] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getTheory();
  }, [id]);

  // GET THEORY
  const getTheory = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/theories/${id}`
      );

      setAuthor(response.data.author);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setMysteryId(response.data.mysteryId);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // UPDATE THEORY
  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedTheory = {
      author: author,
      title: title,
      description: description,
    };

    try {
      setSaving(true);
      setSaveError(false);

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/theories/${id}`,
        updatedTheory
      );

      navigate(`/mysteries/${mysteryId}`);
    } catch (error) {
      console.log(error);
      setSaveError(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#111210] px-8 py-20 text-[#F0EDE5]">
      <div className="mx-auto max-w-4xl">

        {/* LOADING */}
        {loading && (
          <LoadingSpinner text={t("loadingCases")} />
        )}

        {/* ERROR */}
        {error && (
          <div>
            <h2 className="mb-4 text-2xl">
              {t("theoryErrorTitle")}
            </h2>

            <p className="mb-8 text-[#A8A8A3]">
              {t("theoryLoadError")}
            </p>

            <Link
              to="/mysteries"
              className="text-[#B49A6C]"
            >
              ← {t("backToArchive")}
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
              ← {t("backToCaseFile")}
            </Link>

            {/* HEADER */}
            <header className="mb-16">

              <p className="mb-8 text-xs tracking-[0.3em] text-[#B49A6C]">
                08 / {t("reviseContribution")}
              </p>

              <h1 className="mb-8 whitespace-pre-line text-6xl font-bold tracking-tighter md:text-8xl">
                {t("editTheoryTitle")}
              </h1>

              <p className="max-w-xl text-lg leading-8 text-[#A8A8A3]">
                {t("editTheoryDescription")}
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
                  {t("yourName")}
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
                  {t("theoryTitle")}
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
                  {t("yourTheory")}
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

              {/* SAVE ERROR */}
              {saveError && (
                <p className="mb-8 text-sm text-red-400">
                  {t("saveTheoryError")}
                </p>
              )}

              {/* SAVE BUTTON */}
              <button
                type="submit"
                disabled={saving}
                className="cursor-pointer border border-[#B49A6C] bg-[#B49A6C] px-10 py-5 text-xs font-bold tracking-widest text-[#111210] transition-colors duration-300 hover:bg-transparent hover:text-[#B49A6C] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? t("savingChanges") : t("saveChanges")} →
              </button>

            </form>

          </div>
        )}

      </div>
    </main>
  );
}

export default EditTheoryPage;
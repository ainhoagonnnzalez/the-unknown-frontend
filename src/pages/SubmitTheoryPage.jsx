import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function SubmitTheoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (event) => {
  event.preventDefault();

  const newTheory = {
    mysteryId: id,
    title: title,
    description: description,
    author: author,
    source: "community",
    evidenceLevel: null,
  };

  try {
    await axios.post("http://localhost:5005/theories", newTheory);
    navigate(`/mysteries/${id}`);
  } catch (error) {
    console.log(error);
  }
};
    return (
  <main>
    <h1>Submit Your Theory</h1>
    <p>Share your thoughts about this mystery.</p>

    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="author">Your Name</label>

        <input
          type="text"
          id="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="title">Theory Title</label>

        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Your Theory</label>

        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
      </div>

      <button type="submit">Publish Theory</button>
    </form>
  </main>

  );
}

export default SubmitTheoryPage;
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditTheoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");

  const getTheory = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/theories/${id}`);

      console.log(response.data);

      setTitle(response.data.title);
      setDescription(response.data.description);
      setAuthor(response.data.author);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTheory();
  }, [id]);

  const handleSubmit = async (event) => {
  event.preventDefault();

  const updatedTheory = {
    title: title,
    description: description,
    author: author,
  };

  try {
    const response = await axios.patch(
      `http://localhost:5005/theories/${id}`,
      updatedTheory
    );

    console.log(response.data);

    navigate(`/mysteries/${response.data.mysteryId}`);
  } catch (error) {
    console.log(error);
  }
};

  return (
  <div>
    <h1>Edit Your Theory</h1>
    <p>Update your theory about this mystery.</p>

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

      <button type="submit">Save Changes</button>
    </form>
  </div>
);
}

export default EditTheoryPage;

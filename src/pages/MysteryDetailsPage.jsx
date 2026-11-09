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
    <main>
      <h1>MYSTERY DETAILS</h1>
      {loading && <p>Loading mystery...</p>}
      {error && (
        <div>
          <h2>Mystery not found.</h2>
          <p>We couldn't load this mystery.</p>
          <Link to="/mysteries">Back to Explore →</Link>
        </div>
      )}

      {!loading && !error && mystery && (
        <div>
          <h2>{mystery.title}</h2>
          <p>{mystery.subtitle}</p>
          <p>{mystery.category}</p>
          <p>{mystery.description}</p>
          <section>
            <h3>The Story</h3>

            {mystery.story.map((paragraph, index) => {
              return <p key={index}>{paragraph}</p>;
            })}
          </section>
          <section>
            <h3>Timeline</h3>

            {mystery.timeline.map((item, index) => {
              return (
                <div key={index}>
                  <h4>{item.year}</h4>
                  <p>{item.event}</p>
                </div>
              );
            })}
          </section>
          <section>
            <h3>Evidence</h3>

            {mystery.evidence.map((item, index) => {
              return (
                <div key={index}>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              );
            })}
          </section>
          <section>
            <h3>Unanswered Questions</h3>

            {mystery.unansweredQuestions.map((question, index) => {
              return <p key={index}>{question}</p>;
            })}
          </section>
          <section>
            <h3>Documented Theories</h3>

            {documentedTheories.map((theory) => {
              return (
                <div key={theory.id}>
                  <h4>{theory.title}</h4>
                  <p>{theory.description}</p>
                  <p>Author: {theory.author}</p>
                  <p>Evidence Level: {theory.evidenceLevel || "Not rated"}</p>
                </div>
              );
            })}
          </section>

          <section>
            <h3>Community Theories</h3>

            <Link to={`/mysteries/${id}/theories/new`}>
              Submit Your Theory →
            </Link>

            {communityTheories.map((theory) => {
              return (
                <div key={theory.id}>
                  <h4>{theory.title}</h4>
                  <p>{theory.description}</p>
                  <p>Author: {theory.author}</p>

                  <Link to={`/theories/${theory.id}/edit`}>Edit Theory → </Link>
                  <button type="button" onClick={() => deleteTheory(theory.id)}>
                    Delete Theory
                  </button>
                  
                </div>

              );
            })}
          </section>
        </div>
      )}
    </main>
  );
}

export default MysteryDetailsPage;

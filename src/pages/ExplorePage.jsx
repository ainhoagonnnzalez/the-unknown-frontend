import { useEffect, useState } from "react";
import axios from "axios";
import MysteryCard from "../components/MysteryCard";

function ExplorePage() {
  const [mysteries, setMysteries] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getMysteries();
  }, []);

  const getMysteries = async () => {
    try {
      const response = await axios.get("http://localhost:5005/mysteries");

      setMysteries(response.data);
      setError(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  // Get all categories without duplicates
  const categories = [];

  mysteries.forEach((mystery) => {
    if (!categories.includes(mystery.category)) {
      categories.push(mystery.category);
    }
  });

  // Filter mysteries by search and category
  const filteredMysteries = mysteries.filter((mystery) => {
    const matchesSearch = mystery.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || mystery.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <h1>THE ARCHIVE</h1>
      <p>Explore the world's most fascinating mysteries.</p>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search mysteries..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {/* Category filter */}
      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value="all">All Categories</option>

        {categories.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>

      {/* Mysteries results */}
      <div>
        {/* Loading */}
        {loading && <p>Loading mysteries...</p>}

        {/* Error */}
        {error && (
          <div>
            <h2>Something went wrong.</h2>
            <p>We couldn't load the mysteries. Please try again later.</p>
          </div>
        )}

        {/* No results */}
        {!loading && !error && filteredMysteries.length === 0 && (
          <div>
            <h2>No mysteries found.</h2>
            <p>Try a different search or category.</p>
          </div>
        )}

        {/* Mystery cards */}
        {!loading &&
          !error &&
          filteredMysteries.map((mystery) => {
            return <MysteryCard key={mystery.id} mystery={mystery} />;
          })}
      </div>
    </div>
  );
}

export default ExplorePage;
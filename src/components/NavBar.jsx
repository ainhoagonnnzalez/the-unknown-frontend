import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">THE UNKNOWN</Link>

      <div>
        <Link to="/">Home</Link>
        <Link to="/mysteries">Explore</Link>
      </div>
    </nav>
  );
}

export default Navbar;
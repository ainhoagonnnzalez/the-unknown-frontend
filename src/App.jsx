import { Routes, Route } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import MysteryDetailsPage from "./pages/MysteryDetailsPage";
import SubmitTheoryPage from "./pages/SubmitTheoryPage";
import EditTheoryPage from "./pages/EditTheoryPage";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mysteries" element={<ExplorePage />} />
        <Route path="/mysteries/:id" element={<MysteryDetailsPage />} />
        <Route path="/mysteries/:id/theories/new" element={<SubmitTheoryPage />}/>
        <Route path="/theories/:id/edit" element={<EditTheoryPage />} />
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import MysteryDetailsPage from "./pages/MysteryDetailsPage";
import SubmitTheoryPage from "./pages/SubmitTheoryPage";
import EditTheoryPage from "./pages/EditTheoryPage";
import NotFoundPage from "./pages/NotFoundPage";
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mysteries" element={<ExplorePage />} />
        <Route path="/mysteries/:id" element={<MysteryDetailsPage />} />
        <Route path="/mysteries/:id/theories/new" element={<SubmitTheoryPage />}/>
        <Route path="/theories/:id/edit" element={<EditTheoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
        
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

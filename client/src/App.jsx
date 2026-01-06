// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import BookingFormPage from "./pages/BookingFormPage.jsx";
import TrekFormPage from "./pages/TrekFormPage.jsx";
import BatchFormPage from "./pages/BatchFormPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trek" element={<TrekFormPage />} />
        <Route path="/batch" element={<BatchFormPage />} />
        <Route path="/booking" element={<BookingFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;

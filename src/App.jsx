import "./App.css";
import { Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
// import RecommendedPage from "./pages/RecommendedPage/RecommendedPage";
// import LibraryPage from "./pages/LibraryPage/LibraryPage";
// import ReadingPage from "./pages/ReadingPage/ReadingPage";
// import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        {/* <Route path="/recommended" element={<RecommendedPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/reading" element={<ReadingPage />} />
        <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;

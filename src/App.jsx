import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BookProvider } from "./context/BookContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BookDetail from "./components/BookDetail";
import Favorites from "./pages/Favourites";
import Login from "./pages/Login";
import "./styles/App.css";

function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;

import { Link } from "react-router-dom";
import { useBook } from "../context/BookContext";
import { useAuth } from "../context/AuthContext";

function BookCard({ book }) {
  const { toggleFavorite, favorites } = useBook();
  const { user } = useAuth();
  const isFavorite = favorites.includes(book.id);

  const handleFavoriteClick = () => {
    if (!user) {
      alert("🔒 You must be logged in to add favorites!");
      return;
    }
    toggleFavorite(book.id);
  };

  return (
    <div className="book-card">
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <Link to={`/book/${book.id}`}>Details</Link>

      <button onClick={handleFavoriteClick}>
        {isFavorite ? "Remove from Favorites ❤️" : "Add to Favorites 🤍"}
      </button>
    </div>
  );
}

export default BookCard;

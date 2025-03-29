import { Link } from "react-router-dom";
import { useBook } from "../context/BookContext";

function BookCard({ book }) {
  const { toggleFavorite, favorites } = useBook();

  // Ensure favorites is an array before using .includes()
  const isFavorite = Array.isArray(favorites) && favorites.includes(book.id);

  return (
    <div className="book-card">
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <Link to={`/book/${book.id}`}>Details</Link>
      <button onClick={() => toggleFavorite(book.id)}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}

export default BookCard;

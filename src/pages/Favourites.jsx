import { useBook } from "../context/BookContext";
import { useAuth } from "../context/AuthContext";

function Favorites() {
  const { books, favorites } = useBook();
  const { user } = useAuth(); // Get logged-in user

  if (!user) return <p><strong>Login to view favorites.</strong></p>;

  const favoriteBooks = books.filter((book) => favorites.includes(book.id));

  return (
    <div>
      <h2>Your Favorite Books</h2>
      {favoriteBooks.length === 0 ? <p>No favorites added yet.</p> : (
        <ul>
          {favoriteBooks.map((book) => (
            <li key={book.id}>{book.title} by {book.author}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorites;

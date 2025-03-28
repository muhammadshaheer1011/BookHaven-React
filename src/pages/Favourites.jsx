import { useBook } from "../context/BookContext";

function Favorites() {
  const { books, favorites } = useBook();

  const favoriteBooks = books.filter((book) => favorites.includes(book.id));

  return (
    <div>
      <h2>My Favorite Books</h2>
      {favoriteBooks.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul>
          {favoriteBooks.map((book) => (
            <li key={book.id}>
              {book.title} by {book.author}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorites;

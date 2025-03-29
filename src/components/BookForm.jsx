import { useState } from "react";
import { useBook } from "../context/BookContext";
import { useAuth } from "../context/AuthContext"; // Import Auth Context

function BookForm() {
  const { addBook } = useBook();
  const { user } = useAuth(); // Get logged-in user
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  if (!user) return <p><strong>Login to add a new book.</strong></p>;

  return (
    <div>
      <h2>Add a New Book</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button onClick={() => {
        if (title && author) {
          addBook(title, author);
          setTitle("");
          setAuthor("");
        }
      }}>
        Add Book
      </button>
    </div>
  );
}

export default BookForm;

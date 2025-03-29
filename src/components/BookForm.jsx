import { useState } from "react";
import { useBook } from "../context/BookContext";
import { useAuth } from "../context/AuthContext"; 

function BookForm() {
  const { addBook } = useBook();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  if (!user) return <p><strong>🔒 Login to add a new book.</strong></p>;

  return (
    <div>
      <h2>Add a New Book</h2>
      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author Name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <textarea
        placeholder="Short Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <button onClick={() => {
        if (title.trim() && author.trim() && description.trim()) {
          addBook(title, author, description);
          setTitle("");
          setAuthor("");
          setDescription("");
        }
      }}>
        Add Book
      </button>
    </div>
  );
}

export default BookForm;

import { useState } from "react";
import { useBook } from "../context/BookContext";
import { useAuth } from "../context/AuthContext"; 

function BookForm() {
  const { addBook } = useBook();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(""); // State for validation message

  // Prevent access if not logged in
  if (!user) return <p><strong>🔒 Login to add a new book.</strong></p>;

  // Function to handle book submission
  const handleAddBook = () => {
    if (!title.trim() || !author.trim() || !description.trim()) {
      setError("⚠️ All fields are required!");
      return;
    }

    addBook(title, author, description);
    setTitle("");
    setAuthor("");
    setDescription("");
    setError(""); // Clear error after successful submission
  };

  return (
    <div>
      <h2>Add a New Book</h2>
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>} {/* Error Message */}
      
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
      <button onClick={handleAddBook}>Add Book</button>
    </div>
  );
}

export default BookForm;

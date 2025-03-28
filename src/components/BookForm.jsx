import { useState } from "react";
import { useBook } from "../context/BookContext";

function BookForm() {
  const { addBook } = useBook();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addBook(title, author);
      }}
    >
      <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Author" onChange={(e) => setAuthor(e.target.value)} />
      <button type="submit">Add Book</button>
    </form>
  );
}

export default BookForm;

import { useState } from "react";
import { useBook } from "../context/BookContext";
import BookList from "../components/BookList";
import BookForm from "../components/BookForm";

function Home() {
  const { books } = useBook();
  const [search, setSearch] = useState("");

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search books..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <BookForm />
      <BookList books={filteredBooks} />
    </div>
  );
}

export default Home;

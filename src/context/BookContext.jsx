import { createContext, useContext, useState, useEffect } from "react";

const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Load books & favorites from localStorage on first render
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [
      { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", description: "A classic novel set in the Roaring Twenties." },
      { id: "2", title: "To Kill a Mockingbird", author: "Harper Lee", description: "A novel about racial injustice in the Deep South." },
      { id: "3", title: "1984", author: "George Orwell", description: "A dystopian novel about totalitarian government control." },
    ];
    setBooks(storedBooks);

    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Function to add a new book with validation
  const addBook = (title, author, description) => {
    if (!title.trim() || !author.trim() || !description.trim()) {
      alert("All fields are required!");
      return;
    }

    const newBook = { id: Date.now().toString(), title, author, description };
    const updatedBooks = [...books, newBook];

    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
  };

  // Function to toggle favorites
  const toggleFavorite = (bookId) => {
    let updatedFavorites;
    if (favorites.includes(bookId)) {
      updatedFavorites = favorites.filter((id) => id !== bookId);
    } else {
      updatedFavorites = [...favorites, bookId];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <BookContext.Provider value={{ books, addBook, favorites, toggleFavorite }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBook() {
  return useContext(BookContext);
}

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext"; // Import AuthContext

const BookContext = createContext();

export function BookProvider({ children }) {
  const { user } = useAuth(); // Get the logged-in user
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Load books from localStorage OR use initial hardcoded books
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [
      { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", description: "A classic novel set in the Roaring Twenties." },
      { id: "2", title: "To Kill a Mockingbird", author: "Harper Lee", description: "A novel about racial injustice in the Deep South." },
      { id: "3", title: "1984", author: "George Orwell", description: "A dystopian novel about totalitarian government control." },
    ];
    setBooks(storedBooks);
  }, []);

  // Load user's favorites when they log in
  useEffect(() => {
    if (user) {
      const storedFavorites = JSON.parse(localStorage.getItem(`favorites-${user.username}`)) || [];
      setFavorites(storedFavorites);
    } else {
      setFavorites([]); // Reset favorites when logged out
    }
  }, [user]);

  // Function to add a new book
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

  // Function to toggle favorites (Only if user is logged in)
  const toggleFavorite = (bookId) => {
    if (!user) {
      alert("You must be logged in to add favorites!");
      return;
    }

    let updatedFavorites;
    if (favorites.includes(bookId)) {
      updatedFavorites = favorites.filter((id) => id !== bookId);
    } else {
      updatedFavorites = [...favorites, bookId];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem(`favorites-${user.username}`, JSON.stringify(updatedFavorites));
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

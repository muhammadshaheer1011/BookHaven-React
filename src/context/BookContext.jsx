import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "./AuthContext";

const BookContext = createContext();

export function BookProvider({ children }) {
  const { user, setUser } = useAuth(); // Access logged-in user

  const [books, setBooks] = useState([
    { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", reviews: [] },
    { id: "2", title: "1984", author: "George Orwell", reviews: [] },
    { id: "3", title: "To Kill a Mockingbird", author: "Harper Lee", reviews: [] },
  ]);

  // Add Book (Only if logged in)
  const addBook = (title, author) => {
    if (!user) {
      alert("You must be logged in to add books.");
      return;
    }
    const newBook = { id: uuidv4(), title, author, reviews: [] };
    setBooks([...books, newBook]);
  };

// Function to add a review to a book (include username)
const addReview = (bookId, reviewText) => {
    if (!user) {
      alert("You must be logged in to add reviews.");
      return;
    }
    if (!reviewText.trim()) return;
  
    const newReview = { username: user.username, text: reviewText }; // Store username and review text
  
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId
          ? { ...book, reviews: [...book.reviews, newReview] }
          : book
      )
    );
  };
  

  // Toggle Favorite (Only if logged in, and store per user)
  const toggleFavorite = (bookId) => {
    if (!user) {
      alert("You must be logged in to add favorites.");
      return;
    }
    
    const updatedFavorites = user.favorites.includes(bookId)
      ? user.favorites.filter((id) => id !== bookId) // Remove favorite
      : [...user.favorites, bookId]; // Add favorite

    const updatedUser = { ...user, favorites: updatedFavorites };
    setUser(updatedUser);
    localStorage.setItem(user.username, JSON.stringify(updatedFavorites)); // Store favorites per user
  };

  return (
    <BookContext.Provider value={{ books, addBook, addReview, toggleFavorite, favorites: user?.favorites || [] }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBook() {
  return useContext(BookContext);
}

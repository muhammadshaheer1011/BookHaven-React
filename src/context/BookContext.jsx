import { createContext, useContext, useState, useEffect } from "react";

const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);

  // Load books from localStorage OR use initial hardcoded books
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books"));
    
    if (storedBooks && storedBooks.length > 0) {
      setBooks(storedBooks);
    } else {
      const defaultBooks = [
        { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", description: "A classic novel set in the Roaring Twenties." },
        { id: "2", title: "To Kill a Mockingbird", author: "Harper Lee", description: "A novel about racial injustice in the Deep South." },
        { id: "3", title: "1984", author: "George Orwell", description: "A dystopian novel about totalitarian government control." },
      ];
      setBooks(defaultBooks);
      localStorage.setItem("books", JSON.stringify(defaultBooks));
    }
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

  return (
    <BookContext.Provider value={{ books, addBook }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBook() {
  return useContext(BookContext);
}

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBook } from "../context/BookContext"; // Import Book Context

function BookDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { books } = useBook(); // Get books from context
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");

  // Fetch Book Details
  useEffect(() => {
    const mockBooks = [
      { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", description: "A classic novel set in the Roaring Twenties." },
      { id: "2", title: "To Kill a Mockingbird", author: "Harper Lee", description: "A novel about racial injustice in the Deep South." },
      { id: "3", title: "1984", author: "George Orwell", description: "A dystopian novel about totalitarian government control." },
    ];

    // First check in mockBooks, then check in added books
    let foundBook = mockBooks.find((b) => b.id === id) || books.find((b) => b.id === id);

    setBook(foundBook);

    // Load reviews from localStorage
    const savedReviews = JSON.parse(localStorage.getItem(`reviews-${id}`)) || [];
    setReviews(savedReviews);
  }, [id, books]); // Now listens to `books` changes

  // Function to Add Review
  const handleAddReview = () => {
    if (!reviewText.trim()) return;

    const newReview = {
      text: reviewText,
      username: user ? user.username : "Guest",
      date: new Date().toLocaleString(),
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));

    setReviewText("");
  };

  if (!book) return <p>❌ Book not found!</p>;

  return (
    <div className="book-detail">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Description:</strong> {book.description}</p>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h3>Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review">
              <p><strong>{review.username}:</strong> {review.text}</p>
              <small>{review.date}</small>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to add one!</p>
        )}

        {/* Review Input (Only Logged-in Users Can Add) */}
        {user ? (
          <div className="add-review">
            <textarea
              placeholder="Write a review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <button onClick={handleAddReview}>Add Review</button>
          </div>
        ) : (
          <p>🔒 Login to add a review.</p>
        )}
      </div>
    </div>
  );
}

export default BookDetail;

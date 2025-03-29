import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBook } from "../context/BookContext";

function BookDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { books } = useBook();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");

  // Find book when books list updates
  useEffect(() => {
    if (books.length > 0) {
      const foundBook = books.find((b) => b.id === id);
      setBook(foundBook || null);
    }
  }, [books, id]);

  // Load reviews from localStorage
  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem(`reviews-${id}`)) || [];
    setReviews(savedReviews);
  }, [id]);

  // Function to Add Review
  const handleAddReview = () => {
    if (!reviewText.trim()) {
      alert("Review cannot be empty!");
      return;
    }

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

  if (!book) return <p>Loading book details...</p>;

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

        {/* Review Input */}
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

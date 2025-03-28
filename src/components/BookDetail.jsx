import { useParams } from "react-router-dom";
import { useBook } from "../context/BookContext";
import { useState } from "react";

function BookDetail() {
  const { id } = useParams();
  const { books, addReview } = useBook();
  const [reviewText, setReviewText] = useState("");

  const book = books.find((b) => b.id === id);
  if (!book) return <p>Book not found!</p>;

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    addReview(id, reviewText);
    setReviewText("");
  };

  return (
    <div>
      <h2>{book.title} by {book.author}</h2>
      
      <h3>Reviews</h3>
      {book.reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {book.reviews.map((review, index) => (
            <li key={index}>
              <strong>{review.username}:</strong> {review.text}
            </li>
          ))}
        </ul>
      )}

      <h3>Add a Review</h3>
      <form onSubmit={handleReviewSubmit}>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default BookDetail;

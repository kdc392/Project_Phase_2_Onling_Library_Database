import react, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@material-ui/core";
import { Rating } from "@mui/material";
import books from "../books.js";

function Reviews(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [review, setReview] = useState({
    rating: "",
    comment: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setReview((prevReview) => {
      return {
        ...prevReview,
        [name]: value,
      };
    });
  }

  function submitReview(event) {
    props.onAdd(review);
    setReview({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div className="reviews">
      <h3>Reviews: </h3>
      <form>
        {isExpanded ? (
          <Rating
            name="rating"
            onChange={handleChange}
            value={review.rating}
            placeholder="Rating"
          />
        ) : null}
        <textarea
          name="comment"
          onClick={expand}
          onChange={handleChange}
          value={review.comment}
          placeholder="Leave a Review..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded ? true : false}>
          <Fab onClick={submitReview}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
      {books.map((bookItem, index) => {
        return (
          <Reviews
            key={index}
            id={index}
            rating={bookItem.rating}
            comment={bookItem.comment}
          />
        );
      })}
    </div>
  );
}

export default Reviews;

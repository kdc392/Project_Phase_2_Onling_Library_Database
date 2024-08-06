import react from "react";
import mongoose from "mongoose";
import books from "./books";
import BookIMG from "./components/BookIMG";
import Details from "./components/Details.jsx";

const reviewsSchema = new mongoose.Schema({
  rating: Number,
  comment: String,
});
const Review = mongoose.model("Review", reviewsSchema);

const booksSchema = new mongoose.Schema({
  id: Number,
  title: String,
  author: String,
  genre: String,
  publication: String,
  description: String,
  ImgURL: String,
  reviews: [reviewsSchema],
});

const Book = mongoose.model("Book", booksSchema);

export function persistReviews(book) {
  const newReview = new Review([
    {
      rating: book.rating,
      comment: book.comment,
    },
  ]);
  newReview.save();
}

export function persistBooks(book) {
  const newBook = new Book([
    {
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre,
      publication: book.publication,
      description: book.description,
      ImgURL: book.ImgUrl,
      reviews: [reviewsSchema],
    },
  ]);
  //newBook.save();
}

const bookDatabase = books.map(persistBooks);

export function checkForBooks() {
  console.log("Checking for books");
  Book.find({})
    .then(function (foundItems) {
      console.log("Found Items Size:", foundItems.length);

      if (foundItems.length === 0) {
        Book.insertMany(books);
        console.log("Books Added");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

export function BookPreview(props) {
  return (
    <div className="book">
      <div className="book-main">
        <BookIMG img={props.img} />
        <h1 className="book-name"> {props.title} </h1>
      </div>
      <div className="book-details">
        <Details detailInfo={props.author} />
        <Details detailInfo={props.genre} />
      </div>
    </div>
  );
}

export default bookDatabase;

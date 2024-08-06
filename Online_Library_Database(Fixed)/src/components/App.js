import React, { useState } from "react";
import books from "../books.js";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import SearchBar from "./SearchBar.jsx";
import createBook from "./CreateBooks.jsx";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { genres } from "../filters.js";
import { orders } from "../filters.js";

function App() {
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [genreValue, setGenreValue] = useState(null);
  const [orderValue, setOrderValue] = useState(null);
  const [isFiltered, setFiltered] = useState(false);
  const [isOrdered, setOrdered] = useState(false);

  function handleGenre(event, newValue) {
    setGenreValue(newValue);

    if (genres.includes(newValue)) {
      setFiltered(true);
      //newBooks = books.filter((found) => found.genre === newValue);
      setFilteredBooks(books.filter((b) => b.genre === newValue));
    } else if (genres.includes(newValue) === false && isOrdered === false) {
      setFiltered(false);
      //newBooks = books.toSorted();
      setFilteredBooks(books);
    } else if (genres.includes(newValue) === false && isOrdered === true) {
      setFiltered(false);
      handleOrder(newValue);
    }
  }

  function handleOrder(event, newValue) {
    setOrderValue(newValue);
    if (orders.includes(newValue) && isFiltered === false) {
      setOrdered(true);
      if (newValue === "Alphabetical (Ascending)") {
        setFilteredBooks(
          books.toSorted((b1, b2) =>
            b1.title > b2.title ? 1 : b1.title < b2.title ? -1 : 0
          )
        );
      } else if (newValue === "Alphabetical (Descending)") {
        setFilteredBooks(
          books.toSorted((b1, b2) =>
            b1.title < b2.title ? 1 : b1.title > b2.title ? -1 : 0
          )
        );
      } else if (newValue === "Publication (Newest-Oldest)") {
        setFilteredBooks(
          books.toSorted((b1, b2) =>
            b1.publication < b2.publication
              ? 1
              : b1.publication > b2.publication
              ? -1
              : 0
          )
        );
      } else if (newValue === "Publication (Oldest-Newest)") {
        setFilteredBooks(
          books.toSorted((b1, b2) =>
            b1.publication > b2.publication
              ? 1
              : b1.publication < b2.publication
              ? -1
              : 0
          )
        );
      } else if (newValue === null) {
        setFilteredBooks(books);
      }
    } else if (orders.includes(newValue) && isFiltered === true) {
      setOrdered(true);
      if (newValue === "Alphabetical (Ascending)") {
        setFilteredBooks(
          filteredBooks.toSorted((b1, b2) =>
            b1.title > b2.title ? 1 : b1.title < b2.title ? -1 : 0
          )
        );
      } else if (newValue === "Alphabetical (Descending)") {
        setFilteredBooks(
          filteredBooks.toSorted((b1, b2) =>
            b1.title < b2.title ? 1 : b1.title > b2.title ? -1 : 0
          )
        );
      } else if (newValue === "Publication (Newest-Oldest)") {
        setFilteredBooks(
          filteredBooks.toSorted((b1, b2) =>
            b1.publication < b2.publication
              ? 1
              : b1.publication > b2.publication
              ? -1
              : 0
          )
        );
      } else if (newValue === "Publication (Oldest-Newest)") {
        setFilteredBooks(
          filteredBooks.toSorted((b1, b2) =>
            b1.publication > b2.publication
              ? 1
              : b1.publication < b2.publication
              ? -1
              : 0
          )
        );
      }
    } else if (orders.includes(newValue) === false && isFiltered === true) {
      setOrdered(false);
      setFilteredBooks(
        filteredBooks.toSorted((b1, b2) =>
          b1.id < b2.id ? 1 : b1.id > b2.id ? -1 : 0
        )
      );
    } else {
      setFilteredBooks(books);
    }
  }

  function searchResults(newSearch) {
    const titleSearch = books.filter((book) =>
      book.title.includes(newSearch.searchContent)
    );
    const authorSearch = books.filter((book) =>
      book.author.includes(newSearch.searchContent)
    );

    if (titleSearch.length != 0 && authorSearch.length === 0) {
      setFilteredBooks(titleSearch);
    } else if (authorSearch.length != 0 && titleSearch.length === 0) {
      setFilteredBooks(authorSearch);
    } else if (titleSearch.length === 0 && authorSearch.length === 0) {
      setFilteredBooks([]);
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="container">
        <SearchBar onSearch={searchResults} />
        <form className="filters">
          <Autocomplete
            className="genre-filter"
            options={genres}
            renderInput={(params) => <TextField {...params} label="Genre" />}
            value={genreValue}
            onChange={handleGenre}
          />
          <Autocomplete
            className="order-filter"
            options={orders}
            renderInput={(params) => <TextField {...params} label="Order By" />}
            value={orderValue}
            onChange={handleOrder}
          />
        </form>
      </div>
      {filteredBooks.map(createBook)}
      <Footer />
    </div>
  );
}

export default App;
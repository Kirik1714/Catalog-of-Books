import { mountSearch } from "./components/Search.js";
import { createBookCard,createFavoriteCard } from "./components/BookCard.js";
//Test data
const testBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    coverUrl: "",
  },
  {
    id: 2,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    coverUrl: "",
  },

  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    coverUrl: "",
  },
  {
    id: 4,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    coverUrl: "",
  },

  {
    id: 5,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    coverUrl: "",
  },
  {
    id: 6,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    coverUrl: "",
  },

  {
    id: 7,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    coverUrl: "",
  },
  {
    id: 8,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    coverUrl: "",
  },

  {
    id: 9,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    coverUrl: "",
  },
  {
    id: 10,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    coverUrl: "",
  },
];
const testFavorites = [
  {
    id: 101,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    coverUrl: "https://covers.openlibrary.org/b/id/6979861-M.jpg",
  },
  {
    id: 102,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    coverUrl: "https://covers.openlibrary.org/b/id/12643540-M.jpg",
  },
   {
    id: 101,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    coverUrl: "https://covers.openlibrary.org/b/id/6979861-M.jpg",
  },
  {
    id: 102,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    coverUrl: "https://covers.openlibrary.org/b/id/12643540-M.jpg",
  },
   {
    id: 101,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    coverUrl: "https://covers.openlibrary.org/b/id/6979861-M.jpg",
  },
  {
    id: 102,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    coverUrl: "https://covers.openlibrary.org/b/id/12643540-M.jpg",
  },
   {
    id: 101,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    coverUrl: "https://covers.openlibrary.org/b/id/6979861-M.jpg",
  },
  {
    id: 102,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    coverUrl: "https://covers.openlibrary.org/b/id/12643540-M.jpg",
  },
   {
    id: 101,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    coverUrl: "https://covers.openlibrary.org/b/id/6979861-M.jpg",
  },
  {
    id: 102,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    coverUrl: "https://covers.openlibrary.org/b/id/12643540-M.jpg",
  },
   {
    id: 101,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    coverUrl: "https://covers.openlibrary.org/b/id/6979861-M.jpg",
  },
  {
    id: 102,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    coverUrl: "https://covers.openlibrary.org/b/id/12643540-M.jpg",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  mountSearch("#search-component-root");
  renderBooks(testBooks);
  renderFavorites(testFavorites); 
});

export function renderBooks(books) {
  const grid = document.querySelector("#books-grid");


  grid.innerHTML = "";

  
  books.forEach((book) => {
    const cardHTML = createBookCard(book);
    grid.insertAdjacentHTML("beforeend", cardHTML);
  });
}

export function renderFavorites(favBooks) {
  const favList = document.querySelector("#books-favorite");
  const countLabel = document.querySelector(".favorite-count");

  favList.innerHTML = "";

  countLabel.textContent = `${favBooks.length} books saved`;

  favBooks.forEach((book) => {
    const favCardHTML = createFavoriteCard(book);
    favList.insertAdjacentHTML("beforeend", favCardHTML);
  })

}
// src/main.js
import { mountSearch } from "./components/Search.js";
import { createBookCard, createFavoriteCard } from "./components/BookCard.js";
import { fetchDefaultBooks } from "./services/api.js";
import { createLoadingState } from "./components/UI.js";
import { getFavorites, saveFavorite, removeFavorite } from "./services/storage.js";

let currentBooks = [];

// first render page
document.addEventListener("DOMContentLoaded", async () => {
  mountSearch("#search-component-root");

  const grid = document.querySelector("#books-grid");
  const favSection = document.querySelector(".favorite-books");

  // Hide favorites books
  if (favSection) favSection.classList.add("is-hidden");

  grid.innerHTML = createLoadingState();

  try {
   const responseData = await fetchDefaultBooks();
    const booksArray = responseData || []; 
    
    currentBooks = booksArray.map(book => ({
      id: book.key,
      title: book.title,
      author: book.author_name ? book.author_name[0] : "Неизвестен",
      year: book.first_publish_year || "N/A",
      coverUrl: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null
    }));


    renderBooks(currentBooks);
    
    if (favSection) favSection.classList.remove("is-hidden");
    renderFavorites(getFavorites());
    
  } catch (error) {
    grid.innerHTML = "<p>Ошибка при загрузке книг.</p>";
    console.error("Main load error:", error);
  }
});

// listiner to add favorite book
document.querySelector("#books-grid").addEventListener("click", (event) => {
  const btn = event.target.closest(".favorite-btn");
  if (!btn) return;

  const bookId = btn.dataset.id;
  const book = currentBooks.find(b => b.id === bookId);
  
  if (!book) return;

  const favorites = getFavorites();
  const isFav = favorites.find(f => f.id === book.id);

  if (isFav) {
    removeFavorite(book.id);
    btn.querySelector("img").src = "/assets/icons/heart.svg"; 
  } else {
    saveFavorite(book);
    btn.querySelector("img").src = "/assets/icons/heartRed.svg"; 
  }

  renderFavorites(getFavorites());
});

// render list of books
export function renderBooks(books) {
const grid = document.querySelector("#books-grid");
  grid.innerHTML = "";
  
  if (books.length === 0) {
    grid.innerHTML = "<p>Книги не найдены.</p>";
    return;
  }

  const favorites = getFavorites();
  
  books.forEach((book) => {
    const isFav = favorites.find(f => f.id === book.id);
    const bookWithStatus = { ...book, isFavorite: !!isFav };
    

    const cardHTML = createBookCard(bookWithStatus);
    
    grid.insertAdjacentHTML("beforeend", cardHTML);
  });
}

// Render favorites books
export function renderFavorites(favBooks) {
  const favList = document.querySelector("#books-favorite");
  const countLabel = document.querySelector(".favorite-count");
  
  if (!favList) return;

  favList.innerHTML = "";
  countLabel.textContent = `${favBooks.length} books saved`;

  favBooks.forEach((book) => {
    favList.insertAdjacentHTML("beforeend", createFavoriteCard(book));
  });
}


//Listener to remove book from favorites
document.querySelector("#books-favorite").addEventListener("click", (event) => {
  const btn = event.target.closest(".remove-fav-btn");
  if (!btn) return;

  const bookId = btn.dataset.id;
  removeFavorite(bookId); // Удаляем из localStorage

  // Updates lists:
  renderFavorites(getFavorites());
  
  renderBooks(currentBooks); 
});
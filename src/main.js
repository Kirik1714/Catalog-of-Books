import { mountSearch } from "./components/Search.js";
import { createBookCard, createFavoriteCard } from "./components/BookCard.js";
import { fetchDefaultBooks } from "./services/api.js";
import { createLoadingState } from "./components/UI.js";
import {
  getFavorites,
  saveFavorite,
  removeFavorite,
} from "./services/storage.js";
import { initTheme } from "./services/theme.js";
import { mountThemeToggle } from "./components/ThemeToggle.js";
import { ICONS, MESSAGES } from "./constants/index.js";

let currentBooks = [];
let allFetchedBooks = [];

// Cache DOM elements to avoid repeated lookups
const elements = {
  grid: document.querySelector("#books-grid"),
  favoriteList: document.querySelector("#books-favorite"),
  authorSelect: document.querySelector("#author-select"),
  countLabel: document.querySelector(".favorite-count"),
  searchRoot: document.querySelector("#search-component-root"),
};

// First render page
document.addEventListener("DOMContentLoaded", async () => {
  initTheme();
  const themeRoot = document.querySelector("#theme-toggle-root");
  mountThemeToggle(themeRoot);

  mountSearch("#search-component-root", handleSearch, () => {
    const skeleton = document.getElementById("search-skeleton");
    if (skeleton) skeleton.classList.add("skeleton-hidden");
  });

  renderFavorites(getFavorites());
  await handleSearch("best books");
});

// Request for work with search
async function handleSearch(query) {
  if (!elements.grid) return;
 
  const searchQuery = (!query || query.trim() === "") ? "best books" : query.trim();

  elements.grid.innerHTML = createLoadingState();
  try {
    const booksArray = await fetchDefaultBooks(searchQuery);

    // API return void array
    if (!booksArray || booksArray.length === 0) {
      currentBooks = [];
      allFetchedBooks = [];

      // Use textContent to prevent XSS attacks
      elements.grid.innerHTML = "";
      const errorDiv = document.createElement("div");
      errorDiv.className = "status-message status-error";
      
      const p = document.createElement("p");
      p.textContent = MESSAGES.SEARCH_EMPTY(searchQuery);;
      
      errorDiv.appendChild(p);
      elements.grid.appendChild(errorDiv);
      return;
    }

    currentBooks = booksArray.map((book) => ({
      id: book.key,
      title: book.title,
      author: book.author_name ? book.author_name[0] : "Неизвестен",
      year: book.first_publish_year || "N/A",
      coverUrl: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : null,
    }));
    allFetchedBooks = [...currentBooks];
    renderBooks(currentBooks);
    updateAuthorFilter(currentBooks);
  } catch (error) {
    elements.grid.innerHTML = `<div class="status-message"><p>${MESSAGES.ERROR}</p></div>`;
    console.error("Search error:", error);
  }
}

// Listiner to add favorite book
if (elements.grid) {
  elements.grid.addEventListener("click", (event) => {
    const btn = event.target.closest(".favorite-btn");
    if (!btn) return;

    const bookId = btn.dataset.id;
    const book = currentBooks.find((b) => b.id === bookId);
    if (!book) return;

    const favorites = getFavorites();
    const isFav = favorites.find((f) => f.id === book.id);

    if (isFav) {
      removeFavorite(book.id);
      btn.querySelector("img").src = ICONS.HEART;
    } else {
      saveFavorite(book);
      btn.querySelector("img").src = ICONS.HEART_RED;
    }
    renderFavorites(getFavorites());
  });
}

// Render list of books
export function renderBooks(books) {
if (!elements.grid) return;

elements.grid.innerHTML = "";

  if (books.length === 0) {
    elements.grid.innerHTML = MESSAGES.NOT_FOUND;
    return;
  }

  const favorites = getFavorites();

  books.forEach((book) => {
    const isFav = favorites.find((f) => f.id === book.id);
    const bookWithStatus = { ...book, isFavorite: !!isFav };

    const cardHTML = createBookCard(bookWithStatus);

    elements.grid.insertAdjacentHTML("beforeend", cardHTML);
  });
}

// Render favorites books
export function renderFavorites(favBooks) {
 if (!elements.favoriteList || !elements.countLabel) return;

 elements.favoriteList.innerHTML = "";
  elements.countLabel.textContent = `${favBooks.length} books saved`;

 favBooks.forEach((book) => {
    elements.favoriteList.insertAdjacentHTML("beforeend", createFavoriteCard(book));
  });
}

// Listener to remove book from favorites
if (elements.favoriteList) {
    elements.favoriteList.addEventListener("click", (event) => {
    const btn = event.target.closest(".remove-fav-btn");
    if (!btn) return;

    removeFavorite(btn.dataset.id);
    renderFavorites(getFavorites());
    renderBooks(currentBooks);
  });
}

// Get unique author
function updateAuthorFilter(books) {
if (!elements.authorSelect) return;

  elements.authorSelect.innerHTML = '<option value="">Все авторы</option>';

  const authors = [
    ...new Set(books.map((b) => b.author).filter((a) => a !== "Неизвестен")),
  ];

  authors.sort().forEach((author) => {
    const option = document.createElement("option");
    option.value = author;
    option.textContent = author;
     elements.authorSelect.appendChild(option);
  });
}

// Listener for get author
if (elements.authorSelect) {
  elements.authorSelect.addEventListener("change", (e) => {
    const selectedAuthor = e.target.value;
    const filtered = selectedAuthor === "" ? allFetchedBooks : allFetchedBooks.filter((b) => b.author === selectedAuthor);
    renderBooks(filtered);
  });
}

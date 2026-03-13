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

let currentBooks = [];
let allFetchedBooks = [];

// first render page
document.addEventListener("DOMContentLoaded", async () => {
  initTheme();
  mountThemeToggle("#theme-toggle-root");


  mountSearch("#search-component-root", handleSearch, () => {
    const skeleton = document.getElementById("search-skeleton");
    if (skeleton) skeleton.classList.add("skeleton-hidden");
  });

 

  renderFavorites(getFavorites());
  await handleSearch("best books");
});

// request for work with search
async function handleSearch(query) {
  const grid = document.querySelector("#books-grid");

  // Проверка на пустой ввод согласно требованию
  if (!query || query.trim() === "") {
   
    grid.innerHTML = `
      <div class="status-message">
        <p>Пожалуйста, введите название книги или автора для поиска.</p>
      </div>`;
    return;
  }

  grid.innerHTML = createLoadingState();

  try {
    const booksArray = await fetchDefaultBooks(query);

    // API return void array
    if (!booksArray || booksArray.length === 0) {
      currentBooks = [];
      allFetchedBooks = [];
      grid.innerHTML = `<div class="status-message status-error input.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    debouncedSearch(query);
  });"><p>По запросу "${query}" ничего не найдено.</p></div>`;
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
    grid.innerHTML = `<div class="status-message"><p>Произошла ошибка при загрузке. Проверьте соединение с интернетом.</p></div>`;
    console.error("Search error:", error);
  }
}

// listiner to add favorite book
document.querySelector("#books-grid").addEventListener("click", (event) => {
  const btn = event.target.closest(".favorite-btn");
  if (!btn) return;

  const bookId = btn.dataset.id;
  const book = currentBooks.find((b) => b.id === bookId);

  if (!book) return;

  const favorites = getFavorites();
  const isFav = favorites.find((f) => f.id === book.id);

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
    const isFav = favorites.find((f) => f.id === book.id);
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

// get unique author
function updateAuthorFilter(books) {
  const select = document.querySelector("#author-select");

  // Очищаем старые опции (кроме первой "Все авторы")
  select.innerHTML = '<option value="">Все авторы</option>';

  // Собираем уникальных авторов (Set удаляет дубликаты)
  const authors = [
    ...new Set(books.map((b) => b.author).filter((a) => a !== "Неизвестен")),
  ];

  // Добавляем их в список
  authors.sort().forEach((author) => {
    const option = document.createElement("option");
    option.value = author;
    option.textContent = author;
    select.appendChild(option);
  });
}

// listener for get author

document.querySelector("#author-select").addEventListener("change", (e) => {
  const selectedAuthor = e.target.value;

  if (selectedAuthor === "") {
    renderBooks(allFetchedBooks); // Показываем все
  } else {
    const filtered = allFetchedBooks.filter((b) => b.author === selectedAuthor);
    renderBooks(filtered);
  }
});

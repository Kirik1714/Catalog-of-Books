import { getFavorites } from "../services/storage.js";

export function createBookCard(book) {
  const isFavorite = getFavorites().find((f) => f.id === book.id);
  const heartIcon = isFavorite
    ? "/assets/icons/heartRed.svg"
    : "/assets/icons/heart.svg";

  return `
    <article class="book-card">
      <div class="book-card-header">
        <img src="${book.coverUrl || "/assets/placeholder.svg"}" alt="${book.title}" class="book-cover">
        <button class="favorite-btn" data-id="${book.id}">
          <img src="${heartIcon}" alt="Favorite">
        </button>
      </div>
      <div class="book-info">
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">${book.author}</p>
        <span class="book-year">${book.year}</span>
      </div>
    </article>
  `;
}

export function createFavoriteCard(book) {
  const coverHtml = book.coverUrl
    ? `<img src="${book.coverUrl}" alt="${book.title}" class="fav-book-cover">`
    : `<div class="fav-book-placeholder">N/A</div>`;

  return `
    <div class="favorite-item" data-id="${book.id}">
      <div class="fav-book-image">
        ${coverHtml}
      </div>
      <div class="fav-book-info">
        <h4 class="fav-book-title">${book.title}</h4>
        <p class="fav-book-author">${book.author}</p>
        <span class="fav-book-year">${book.year}</span>
      </div>
      <button class="remove-fav-btn" data-id="${book.id}" title="Remove from favorites">
        <img src="/assets/icons/heartRed.svg" alt="Remove">
      </button>
    </div>
  `;
}

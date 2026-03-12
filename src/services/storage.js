export function getFavorites() {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
}

export function saveFavorite(book) {
  const favorites = getFavorites();
  if (!favorites.find(f => f.id === book.id)) {
    favorites.push(book);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

export function removeFavorite(bookId) {
  let favorites = getFavorites();
  favorites = favorites.filter(f => f.id !== bookId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}
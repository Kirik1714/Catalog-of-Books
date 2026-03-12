export function createLoadingState() {
  return `
  <div class="loading-container">
    <div class="status-message">
      <div class="spinner"></div>
      <p>Загрузка книг...</p>
    </div>
    </div>
  `;
}

export function createEmptyState(message) {
  return `<div class="status-message"><p>${message}</p></div>`;
}
export function mountSearch(selector) {
  const root = document.querySelector(selector);
  if (!root) return;

  root.innerHTML = `
   <form class="search-box">
  <div class="input-wrapper">
    <img src="/assets/icons/Search.svg" class="search-icon" alt="icon">
    <input type="text" id="search-input" placeholder="Search for books by title or author...">
  </div>
  <button type="submit" id="search-btn">Search</button>
</form>
  `;

  // Логика обработки формы
  const form = root.querySelector('.search-box');
  const input = root.querySelector('#search-input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (query) {
      console.log('Поиск:', query);
    }
  });
}
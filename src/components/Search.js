
import { debounce } from "../utils/debounce";
export function mountSearch(selector, onSearch,onMounted) {
  const root = document.querySelector(selector);

  if (!root) return;

  root.innerHTML = `
   <form class="search-box">
  <div class="input-wrapper">
    <img src="/assets/icons/search.svg" class="search-icon" alt="icon">
    <input type="text" id="search-input" placeholder="Search for books by title or author...">
  </div>
  <button type="submit" id="search-btn">Search</button>
</form>
  `;
    if (onMounted) {
    onMounted();
  }


  const form = root.querySelector('.search-box');
  const input = root.querySelector('#search-input');
  const debouncedSearch = debounce((query) => {
    if (onSearch) {
      onSearch(query);
    }
  }, 1000); 
  input.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    debouncedSearch(query);
  });

 form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
   if (onSearch) {
    onSearch(query); 
  }

  });
}
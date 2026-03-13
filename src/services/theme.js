const THEME_KEY = 'app-theme';

export function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
  applyTheme(savedTheme);
  return savedTheme;
}

export function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(currentTheme);
  localStorage.setItem(THEME_KEY, currentTheme);
  return currentTheme;
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}
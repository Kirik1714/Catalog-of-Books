import { toggleTheme } from "../services/theme.js";

export function mountThemeToggle(selector) {
  const root = document.querySelector(selector);
  if (!root) return;

  root.innerHTML = `
    <button class="theme-switch-btn" id="theme-btn" title="Toggle Theme">
      <span class="icon">🌓</span>
    </button>
  `;
  

  const btn = root.querySelector('#theme-btn'); 
  
  if (btn) {
    btn.addEventListener('click', () => {
      toggleTheme();
    });
  }
}
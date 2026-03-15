import { toggleTheme } from "../services/theme.js";

export function mountThemeToggle(rootElement) {
if (!rootElement) return;

  rootElement.innerHTML = `
    <button class="theme-switch-btn" id="theme-btn" title="Toggle Theme">
      <span class="icon">🌓</span>
    </button>
  `;
  

  const btn = rootElement.querySelector('#theme-btn'); 
  
  if (btn) {
    btn.addEventListener('click', () => {
      toggleTheme();
    });
  }
}
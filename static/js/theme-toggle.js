(function () {
  const STORAGE_KEY = "book-theme";

  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  function apply(theme) {
    root.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
    toggle.textContent = theme === "dark" ? "☀" : "☾";
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) apply(saved);

  toggle.addEventListener("click", () => {
    const current = root.dataset.theme === "dark" ? "dark" : "light";
    apply(current === "dark" ? "light" : "dark");
  });
})();

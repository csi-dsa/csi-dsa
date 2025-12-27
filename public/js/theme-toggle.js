(function () {
  const STORAGE_KEY = "book-theme";
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const body = document.body;

  function apply(theme) {
    body.classList.remove("light", "dark");
    body.classList.add(theme);
    localStorage.setItem(STORAGE_KEY, theme);
    toggle.textContent = theme === "dark" ? "☀" : "☾";
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) apply(saved);

  toggle.addEventListener("click", () => {
    const current = body.classList.contains("dark") ? "dark" : "light";
    apply(current === "dark" ? "light" : "dark");
  });
})();

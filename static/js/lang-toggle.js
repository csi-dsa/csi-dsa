(function () {
  const STORAGE_KEY = "preferred_lang";

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".code-group").forEach(group => {
      const blocks = Array.from(group.querySelectorAll(".code-block"));
      if (blocks.length === 0) return;

      const selector = group.querySelector(".lang-selector");
      if (!selector) return;

      const langs = [...new Set(blocks.map(b => b.dataset.lang))];

      // Only one language → show it, no selector
      if (langs.length === 1) {
        blocks[0].classList.add("active");
        return;
      }

      selector.classList.remove("hidden");
      selector.innerHTML = "";

      let currentLang = localStorage.getItem(STORAGE_KEY);
      if (!currentLang || !langs.includes(currentLang)) {
        currentLang = langs[0];
      }

      function apply(lang) {
        blocks.forEach(b =>
          b.classList.toggle("active", b.dataset.lang === lang)
        );
      }

      function updateButtons(lang) {
        selector.querySelectorAll("button").forEach(btn => {
            const active = btn.dataset.lang === lang;
            btn.classList.toggle("active", active);
            btn.setAttribute("aria-selected", active);
        });
      }

      langs.forEach(lang => {
        const btn = document.createElement("button");
        btn.textContent = lang.toUpperCase();
        btn.dataset.lang = lang;
        btn.classList.toggle("active", lang === currentLang);

        btn.addEventListener("click", () => {
        localStorage.setItem(STORAGE_KEY, lang);
        apply(lang);
        updateButtons(lang);

        document.dispatchEvent(
            new CustomEvent("language-change", {
            detail: { lang }
            })
        );
        });

        selector.appendChild(btn);
      });

      apply(currentLang);
      document.addEventListener("language-change", e => {
        const lang = e.detail.lang;
        if (!langs.includes(lang)) return;
        apply(lang);
        updateButtons(lang);
      });

    });
  });
})();

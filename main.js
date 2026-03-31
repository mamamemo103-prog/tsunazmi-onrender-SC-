(() => {
  const header = document.querySelector(".ts-header");
  const burger = document.querySelector(".ts-burger");
  const nav = document.querySelector("#ts-nav");

  if (header && burger && nav) {
    burger.addEventListener("click", () => {
      const on = header.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", on ? "true" : "false");
    });

    nav.addEventListener("click", (e) => {
      const t = e.target;
      if (t && t.tagName === "A") {
        header.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  const filters = [...document.querySelectorAll("[data-ts-filter]")];
  const games = [...document.querySelectorAll("[data-ts-cat]")];

  const applyFilter = (key) => {
    games.forEach((card) => {
      const cat = card.getAttribute("data-ts-cat");
      card.hidden = !(key === "all" || cat === key);
    });

    filters.forEach((btn) => {
      const f = btn.getAttribute("data-ts-filter");
      btn.setAttribute("aria-pressed", f === key ? "true" : "false");
    });
  };

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      applyFilter(btn.getAttribute("data-ts-filter"));
    });
  });

  const hash = String(location.hash || "")
    .replace(/^#/, "")
    .toLowerCase();
  const valid = new Set(["slots", "roulette", "blackjack", "poker", "wheel"]);
  if (filters.length && games.length) {
    applyFilter(valid.has(hash) ? hash : "all");
  }

  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      }),
    { threshold: 0.1, rootMargin: "0px 0px -20% 0px" }
  );

  document.querySelectorAll(".ts-reveal").forEach((el) => observer.observe(el));

  document.querySelectorAll(".js-year").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();


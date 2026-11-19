(() => {
  "use strict";

  function initNavigation() {
    const nav = document.querySelector(".nav");
    const toggle = nav?.querySelector(".navToggle");
    const links = nav?.querySelector(".navLinks");
    if (!toggle || !links) return;

    const desktop = window.matchMedia("(min-width: 769px)");
    const setExpanded = (expanded) => {
      toggle.setAttribute("aria-expanded", String(expanded));
      links.hidden = !desktop.matches && !expanded;
    };

    toggle.addEventListener("click", () => {
      setExpanded(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !desktop.matches && !links.hidden) {
        event.preventDefault();
        setExpanded(false);
        toggle.focus();
      }
    });

    nav.addEventListener("click", (event) => {
      const link = event.target.closest("a[href^='#']");
      if (!link || desktop.matches || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      setExpanded(false);
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    });

    const resetMenu = () => {
      const focused = document.activeElement;
      toggle.hidden = desktop.matches;
      setExpanded(false);
      if (desktop.matches && focused === toggle) {
        links.querySelector("a").focus();
      } else if (!desktop.matches && links.contains(focused)) {
        toggle.focus();
      }
    };

    desktop.addEventListener("change", resetMenu);
    resetMenu();
  }

  function initCatalog() {
    const tools = document.querySelector(".catalogTools");
    if (!tools) return;
    const form = tools.querySelector("form");
    const search = tools.querySelector("#course-search");
    const topic = tools.querySelector("#course-topic");
    const language = tools.querySelector("#course-language");
    const count = tools.querySelector(".catalogCount");
    const empty = tools.querySelector(".catalogEmpty");
    const resetEmpty = empty?.querySelector("button");
    const cards = [...document.querySelectorAll(".courses .course")];
    if (!form || !search || !topic || !language || !count || !resetEmpty || !cards.length) return;
    if (cards.some((card) => !card.querySelector("h3") || !card.dataset.topic || !card.dataset.language)) return;

    const normalize = (text) => text.trim().toLocaleLowerCase("tr")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\u0131/g, "i");
    const catalog = cards.map((card) => ({
      card,
      title: normalize(card.querySelector("h3").textContent),
    }));

    const update = () => {
      const query = normalize(search.value);
      let visible = 0;
      catalog.forEach(({ card, title }) => {
        const matches = title.includes(query)
          && (!topic.value || card.dataset.topic === topic.value)
          && (!language.value || card.dataset.language === language.value);
        card.hidden = !matches;
        if (matches) visible += 1;
      });
      count.textContent = `${visible} / ${cards.length} kurs gösteriliyor.`;
      empty.hidden = visible !== 0;
    };

    form.addEventListener("submit", (event) => event.preventDefault());
    search.addEventListener("input", update);
    topic.addEventListener("change", update);
    language.addEventListener("change", update);
    // Native reset values are applied after the reset event is dispatched.
    form.addEventListener("reset", () => setTimeout(update, 0));
    resetEmpty.addEventListener("click", () => {
      form.reset();
      search.focus();
    });

    update();
    tools.hidden = false;
  }

  initNavigation();
  initCatalog();
})();

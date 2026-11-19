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
    // Keep the complete HTML catalog visible. Search and filter controls will
    // be revealed only after their initialization succeeds in Phase 5.
  }

  initNavigation();
  initCatalog();
})();

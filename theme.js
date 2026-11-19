// Apply only a valid saved preference before the stylesheet is rendered.
(() => {
  "use strict";
  try {
    const theme = localStorage.getItem("canboz-theme");
    if (theme === "light" || theme === "dark") {
      document.documentElement.dataset.theme = theme;
    }
  } catch {
    // CSS follows the system theme when storage is unavailable.
  }
})();

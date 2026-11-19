(() => {
  "use strict";

  function initLanguage() {
    const control = document.querySelector(".languageControl");
    if (!control) return;
    const translations = {
      "Ana içeriğe geç": "Skip to main content",
      "Ana sayfa": "Home",
      "Hakkımda": "About me",
      "Kurslarım": "My courses",
      "Öğrenci": "Students",
      "Kurs": "Courses",
      "Temmuz Ayı Kampanyası!": "July special offer!",
      "Kurslarıma": "Enroll in my courses for",
      "ye kaydolmak için indirim kodu": "with coupon code",
      "Udemy Business koleksiyonundaki 9 kursum için otomatik tanımlanan minumum fiyat 499 TL diğer kurslarım için minumum fiyat 319 TL": "The automatically assigned minimum price is 499 TL for my 9 courses in the Udemy Business collection and 319 TL for my other courses.",
      "Can Boz, Galatasaray Üniversitesi Endüstri Mühendisliği mezunudur. Üniversite hayatı boyunca gerçekleştirmeye çalıştığı girişimlerde web ve mobil yazılımlara olan ilgisini farketmiş ve kariyerine yazılım üzerine devam etme kararı almıştır.": "Can Boz graduated from Galatasaray University with a degree in Industrial Engineering. Through his entrepreneurial projects at university, he discovered his interest in web and mobile software and decided to pursue a career in software development.",
      "Can Boz, bu güne kadar birçok sektörde yazılım geliştirici olarak görev almış; dijital pazarlama, restoranlara özel online sipariş sistemleri, gümrük ve finansal teknoloji sektörlerinde çok sayıda yazılım projesi geliştirmiştir.": "Can Boz has worked as a software developer across many industries, developing numerous projects in digital marketing, online ordering systems for restaurants, customs, and financial technology.",
      "Can Boz, son 3 yıldır aktif bir şekilde eğitim danışmanlık faaliyetleri yürütmektedir.": "Can Boz has been actively providing training consultancy services for the last 3 years.",
      "Kurs ara": "Search courses",
      "Konu": "Topic",
      "Dil": "Language",
      "Tüm konular": "All topics",
      "Programlama": "Programming",
      "Web geliştirme": "Web development",
      "Veri ve ofis": "Data and office",
      "Kariyer": "Career",
      "Tüm diller": "All languages",
      "Türkçe": "Turkish",
      "İngilizce": "English",
      "Filtreleri temizle": "Clear filters",
      "Aramanıza uygun kurs bulunamadı.": "No courses match your search.",
      "Aramayı ve filtreleri temizle": "Clear search and filters",
      "Kaydol": "Enroll",
      "Bağlantı mevcut değil": "Link unavailable",
      "Can Boz | Tüm Hakları Saklıdır.": "Can Boz | All rights reserved.",
    };
    const normalize = (value) => value.replace(/\s+/g, " ").trim();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const texts = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.parentElement.closest(".course h3, .price, script")) continue;
      const english = translations[normalize(node.nodeValue)];
      if (english) texts.push({ node, turkish: node.nodeValue, english });
    }
    const attributeTranslations = {
      "Ana gezinme": "Main navigation",
      "Can Boz — Ana sayfa": "Can Boz — Home",
      "Menü": "Menu",
      "Karanlık mod": "Dark mode",
      "Sayfa dili": "Page language",
      "Kurs arama ve filtreleme": "Search and filter courses",
      "Kurs adı yazın": "Enter a course title",
    };
    const attributes = [];
    document.querySelectorAll("[aria-label], [placeholder]").forEach((element) => {
      ["aria-label", "placeholder"].forEach((name) => {
        const turkish = element.getAttribute(name);
        const english = attributeTranslations[turkish]
          || (element.matches(".course a") ? turkish?.replace(/ - Kaydol$/, " - Enroll") : null);
        if (english) attributes.push({ element, name, turkish, english });
      });
    });
    const apply = (language) => {
      document.documentElement.lang = language;
      texts.forEach(({ node, turkish, english }) => {
        node.nodeValue = language === "en" ? ` ${english} ` : turkish;
      });
      attributes.forEach(({ element, name, turkish, english }) => {
        element.setAttribute(name, language === "en" ? english : turkish);
      });
      control.querySelectorAll("button").forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.language === language));
      });
      document.dispatchEvent(new Event("languagechange"));
    };
    control.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-language]");
      if (!button) return;
      apply(button.dataset.language);
      try {
        localStorage.setItem("canboz-language", button.dataset.language);
      } catch { /* The selection still works when storage is unavailable. */ }
    });
    let language = "tr";
    try {
      if (localStorage.getItem("canboz-language") === "en") language = "en";
    } catch { /* Keep Turkish as the default. */ }
    apply(language);
    control.hidden = false;
  }

  function initTheme() {
    const button = document.querySelector(".themeToggle");
    const control = document.querySelector(".themeControl");
    if (!button || !control) return;

    const root = document.documentElement;
    const system = window.matchMedia("(prefers-color-scheme: dark)");
    let explicit = root.dataset.theme === "light" || root.dataset.theme === "dark";
    const apply = (dark) => {
      root.dataset.theme = dark ? "dark" : "light";
      button.setAttribute("aria-pressed", String(dark));
    };

    button.addEventListener("click", () => {
      const dark = root.dataset.theme !== "dark";
      explicit = true;
      apply(dark);
      try {
        localStorage.setItem("canboz-theme", root.dataset.theme);
      } catch {
        // Retain the user's selection for this page even if saving is blocked.
      }
    });
    system.addEventListener("change", (event) => {
      if (!explicit) apply(event.matches);
    });

    apply(explicit ? root.dataset.theme === "dark" : system.matches);
    control.hidden = false;
  }

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
      count.textContent = document.documentElement.lang === "en"
        ? `${visible} / ${cards.length} courses shown.`
        : `${visible} / ${cards.length} kurs gösteriliyor.`;
      empty.hidden = visible !== 0;
    };

    form.addEventListener("submit", (event) => event.preventDefault());
    search.addEventListener("input", update);
    topic.addEventListener("change", update);
    language.addEventListener("change", update);
    document.addEventListener("languagechange", update);
    // Native reset values are applied after the reset event is dispatched.
    form.addEventListener("reset", () => setTimeout(update, 0));
    resetEmpty.addEventListener("click", () => {
      form.reset();
      search.focus();
    });

    update();
    tools.hidden = false;
  }

  initTheme();
  initNavigation();
  initCatalog();
  initLanguage();
})();

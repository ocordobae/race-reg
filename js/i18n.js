// js/i18n.js
(() => {
  let _lang = "fr";
  let _dict = {};
  let _supported = ["fr", "en", "es"];
  let _fallback = "fr";

  function getLang() {
    return _lang;
  }

  async function loadDict(lang) {
    const res = await fetch(`js/i18n/${lang}.json`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Cannot load i18n file for ${lang}`);
    return await res.json();
  }

  function t(key) {
    return _dict?.[key] ?? key;
  }

  function applyTranslations(root = document) {
    root.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      el.textContent = t(key);
    });

    root.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      if (!key) return;
      el.setAttribute("title", t(key));
    });

    root.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria-label");
      if (!key) return;
      el.setAttribute("aria-label", t(key));
    });
  }

  async function initI18n(supported = ["fr", "en", "es"], fallback = "fr") {
    _supported = supported;
    _fallback = fallback;

    const saved = localStorage.getItem("lang");
    _lang = _supported.includes(saved) ? saved : _fallback;

    try {
      _dict = await loadDict(_lang);
    } catch {
      _lang = _fallback;
      _dict = await loadDict(_lang);
    }

    return _lang;
  }

  async function setLang(lang) {
    const next = _supported.includes(lang) ? lang : _fallback;
    _lang = next;
    localStorage.setItem("lang", _lang);
    _dict = await loadDict(_lang);
    return _lang;
  }

  // expose
  window.t = t;
  window.getLang = getLang;
  window.initI18n = initI18n;
  window.setLang = setLang;
  window.applyTranslations = applyTranslations;
})();
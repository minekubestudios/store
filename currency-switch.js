"use strict";

/*
 * Minekube Store — přepínač zobrazované měny (CZK / EUR)
 * ------------------------------------------------------
 * POUZE ZOBRAZENÍ. Objednávka i platba PayPalem zůstávají v CZK,
 * protože ceny a částky ověřuje Store API na straně serveru.
 * EUR je orientační přepočet, aby se zahraniční hráč zorientoval.
 *
 * Kurz je zatím pevný – až bude hotová funkční fáze, dá se nahradit
 * hodnotou z /api/config, aby ho šlo měnit bez zásahu do kódu.
 */

window.MINEKUBE_FX = (function () {
  const STORAGE_KEY = "minekube-store-display-currency";
  const BASE = "CZK";

  /*
   * charm = zaokrouhlení na "psychologickou" cenu končící devítkou.
   *   step   … rozestup mezi sousedními cenami (CZK po desetikorunách, EUR po eurech)
   *   ending … na co má cena končit (9 Kč, 0,99 €)
   *   min    … nejnižší povolený výsledek
   * Zaokrouhluje se na NEJBLIŽŠÍ takovou cenu, přesná půlka nahoru.
   * Nastav charm na null, pokud chceš u dané měny přesnou částku.
   */
  const CURRENCIES = {
    CZK: {
      code: "CZK", name: "Česká koruna", locale: "cs-CZ", rate: 1, decimals: 0,
      charm: { step: 10, ending: 9, min: 9 }
    },
    EUR: {
      code: "EUR", name: "Euro", locale: "cs-CZ", rate: 0.0395, decimals: 2,
      charm: { step: 1, ending: 0.99, min: 0.99 }
    }
  };

  /** Přiklopí částku na nejbližší cenu končící devítkou. */
  function charmRound(value, charm) {
    if (!charm) return value;
    // Nulu (prázdný košík, nulová sleva) nikdy nezvedáme.
    if (!(value > 0)) return value;

    const steps = Math.round((value - charm.ending) / charm.step);
    const result = steps * charm.step + charm.ending;
    return Math.round(Math.max(result, charm.min) * 100) / 100;
  }

  let current = BASE;
  const listeners = new Set();

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && CURRENCIES[saved]) current = saved;
  } catch { /* localStorage je volitelný */ }

  function config() {
    return CURRENCIES[current] || CURRENCIES[BASE];
  }

  /** Převede částku ze základní měny (CZK) do zvolené měny včetně charm zaokrouhlení. */
  function convert(valueInBase) {
    const fx = config();
    const converted = Number(valueInBase) * fx.rate;
    return charmRound(Math.round((converted + Number.EPSILON) * 100) / 100, fx.charm);
  }

  /*
   * Přeškrtnutá původní cena musí zůstat vyšší než aktuální.
   * Po zaokrouhlení na devítky se totiž dvě blízké ceny můžou potkat
   * (89 Kč a 109 Kč vyjdou obě na 3,99 €) – pak původní cenu posuneme
   * o jeden krok nahoru, aby sleva dávala smysl.
   */
  function convertOld(oldValueInBase, currentValueInBase) {
    const fx = config();
    let old = convert(oldValueInBase);
    const current = convert(currentValueInBase);
    if (fx.charm && old <= current) {
      old = Math.round((current + fx.charm.step) * 100) / 100;
    }
    return old;
  }

  /** Naformátuje částku zadanou v základní měně (CZK) do aktuálně zvolené měny. */
  function format(valueInBase) {
    return formatExact(convert(valueInBase));
  }

  /** Naformátuje už převedenou částku (bez dalšího přepočtu). */
  function formatExact(value) {
    const fx = config();
    const normalized = Number(value);
    const hasFraction = Math.abs(normalized - Math.round(normalized)) > 0.000001;

    return new Intl.NumberFormat(fx.locale, {
      style: "currency",
      currency: fx.code,
      minimumFractionDigits: hasFraction ? 2 : fx.decimals,
      maximumFractionDigits: 2
    }).format(normalized);
  }

  /** Naformátuje původní (přeškrtnutou) cenu vůči aktuální. */
  function formatOld(oldValueInBase, currentValueInBase) {
    return formatExact(convertOld(oldValueInBase, currentValueInBase));
  }

  function set(code) {
    if (!CURRENCIES[code] || code === current) return;
    current = code;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(code));
    } catch { /* bez uložení se přepínač chová stejně, jen se nezapamatuje */ }
    listeners.forEach(fn => { try { fn(code); } catch (err) { console.error(err); } });
  }

  return {
    get current() { return current; },
    get isBase() { return current === BASE; },
    base: BASE,
    list: Object.values(CURRENCIES),
    format,
    formatOld,
    convert,
    set,
    onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }
  };
})();

/* -------------------------------------------------------------------------
   Ovládací prvek
   ------------------------------------------------------------------------- */
(function () {
  const FX = window.MINEKUBE_FX;

  const CARET = '<svg class="mk-fx-caret" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 15 6-6 6 6"></path></svg>';
  const CHECK = '<svg class="mk-fx-check" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 5 5L20 7"></path></svg>';

  function build(idSuffix) {
    const wrap = document.createElement("div");
    wrap.className = "mk-fx";

    const toggleId = `mkFxToggle${idSuffix}`;
    const menuId = `mkFxMenu${idSuffix}`;

    wrap.innerHTML = `
      <button class="mk-fx-toggle" id="${toggleId}" type="button"
              aria-haspopup="listbox" aria-expanded="false" aria-controls="${menuId}"
              title="Přepnout zobrazovanou měnu">
        <span class="mk-fx-code" data-fx-current>${FX.current}</span>
        ${CARET}
      </button>
      <div class="mk-fx-menu" id="${menuId}" role="listbox" aria-labelledby="${toggleId}">
        ${FX.list.map(c => `
          <button class="mk-fx-option" type="button" role="option" data-fx-set="${c.code}"
                  aria-checked="${c.code === FX.current}">
            <span class="mk-fx-option-code">${c.code}</span>
            <span class="mk-fx-option-name">${c.name}</span>
            ${CHECK}
          </button>`).join("")}
      </div>`;

    const toggle = wrap.querySelector(".mk-fx-toggle");

    function close() {
      wrap.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    function open() {
      // Zavřeme ostatní instance (desktop / mobil), ať nesvítí obě naráz.
      document.querySelectorAll(".mk-fx.is-open").forEach(el => {
        if (el === wrap) return;
        el.classList.remove("is-open");
        el.querySelector(".mk-fx-toggle")?.setAttribute("aria-expanded", "false");
      });
      wrap.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    }

    toggle.addEventListener("click", event => {
      event.stopPropagation();
      wrap.classList.contains("is-open") ? close() : open();
    });

    wrap.querySelectorAll("[data-fx-set]").forEach(button => {
      button.addEventListener("click", event => {
        event.stopPropagation();
        FX.set(button.dataset.fxSet);
        close();
        toggle.focus();
      });
    });

    document.addEventListener("click", event => {
      if (!wrap.contains(event.target)) close();
    });

    wrap.addEventListener("keydown", event => {
      if (event.key === "Escape" && wrap.classList.contains("is-open")) {
        event.stopPropagation();
        close();
        toggle.focus();
      }
    });

    return wrap;
  }

  function syncAll() {
    document.querySelectorAll("[data-fx-current]").forEach(node => {
      node.textContent = FX.current;
    });
    document.querySelectorAll("[data-fx-set]").forEach(node => {
      node.setAttribute("aria-checked", String(node.dataset.fxSet === FX.current));
    });
  }

  function mount() {
    // Desktop – vedle přepínače motivu v hlavičce.
    const themeToggle = document.querySelector("#themeToggle");
    if (themeToggle && !document.querySelector(".store-header-actions .mk-fx")) {
      themeToggle.parentElement.insertBefore(build("Desktop"), themeToggle);
    }

    // Mobil – do rozbalovací navigace.
    const mobileNav = document.querySelector("#mobileNav");
    if (mobileNav && !mobileNav.querySelector(".mk-fx")) {
      const helpLink = mobileNav.querySelector('a[href="#faq"]');
      mobileNav.insertBefore(build("Mobile"), helpLink);
    }

    syncAll();
  }

  FX.onChange(() => {
    syncAll();
    // Necháme store překreslit ceny podle nové měny.
    if (typeof window.mkRefreshPrices === "function") window.mkRefreshPrices();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();

"use strict";

/*
 * Minekube Store — tlačítko "+" pro dobití herní měny
 * ---------------------------------------------------
 * Vloží mezi Mythic Prisms a Premium Coins tlačítko, které otevře
 * výběr měny. Efekty (jiskry, blesk, rázová vlna) jsou v currency-hub.css.
 *
 * Poznámka: tlačítko je vnořené uvnitř .ow-currency-hub, což je samo
 * o sobě <button>. Vnořený <button> není platné HTML, takže prvek
 * vytváříme jako <span role="button"> s vlastní obsluhou klávesnice.
 */

(function () {
  const PLUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg>';

  const SPARKS = '<span class="mk-hub-sparks" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>';

  const BOLT = `
    <span class="mk-hub-bolt" aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <path d="M50 6 44 34l12-6-8 26 14-10-16 38"></path>
        <path d="M50 6 58 30l-13-4 10 24-15-8 14 44"></path>
        <path d="M14 50h22M64 50h22M22 22l14 14M78 22 64 36M22 78l14-14M78 78 64 64"></path>
      </svg>
    </span>`;

  /** Krátce rozsvítí zůstatky, ať je vidět, že se něco děje. */
  function flashBalances(hub) {
    hub.querySelectorAll(".ow-currency-hub-segment").forEach((segment, index) => {
      setTimeout(() => {
        segment.classList.add("is-flash");
        setTimeout(() => segment.classList.remove("is-flash"), 420);
      }, index * 90);
    });
  }

  function trigger(button, hub) {
    button.classList.remove("is-charged");
    hub?.classList.remove("is-charged");
    // Restart animace – bez přečtení offsetWidth by se nespustila znovu.
    void button.offsetWidth;
    button.classList.add("is-charged");
    hub?.classList.add("is-charged");
    flashBalances(hub || document);

    setTimeout(() => {
      button.classList.remove("is-charged");
      hub?.classList.remove("is-charged");
    }, 560);

    // Otevřeme výběr měny přes stejnou cestu, jakou používá zbytek storu.
    setTimeout(() => {
      const selector = document.querySelector("#currencySelectModal");
      if (typeof window.mkOpenCurrencyTopup === "function") window.mkOpenCurrencyTopup();
      else if (typeof window.mkOpenModal === "function" && selector) window.mkOpenModal(selector);
    }, 150);
  }

  function build({ mobile = false } = {}) {
    const button = document.createElement("span");
    button.className = `mk-hub-plus${mobile ? " is-mobile" : ""}`;
    button.setAttribute("role", "button");
    button.setAttribute("tabindex", "0");
    button.setAttribute("aria-label", "Dobít herní měnu");
    button.setAttribute("title", "Dobít herní měnu");
    button.innerHTML = `${PLUS}${BOLT}`;

    const activate = event => {
      event.preventDefault();
      event.stopPropagation();
      trigger(button, button.closest(".ow-currency-hub"));
    };

    button.addEventListener("click", activate);
    button.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") activate(event);
    });

    return button;
  }

  function mount() {
    // Desktop – nahradí tenkou svislou linku mezi měnami.
    const hub = document.querySelector("#currencyHubButton");
    const divider = hub?.querySelector(".ow-currency-hub-divider");
    if (divider && !hub.querySelector(".mk-hub-plus")) {
      const plus = build();
      divider.replaceWith(plus);
      plus.insertAdjacentHTML("afterend", SPARKS);
    }

    // Mobil – tlačítko vpravo v pruhu s měnami.
    const mobileBar = document.querySelector("#mobileCurrencyButton");
    if (mobileBar && !mobileBar.querySelector(".mk-hub-plus")) {
      mobileBar.appendChild(build({ mobile: true }));
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();

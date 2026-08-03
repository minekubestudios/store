"use strict";

/*
 * Minekube Store — hub herních měn
 * ---------------------------------
 * Vizuálně navazuje na tlačítko STORE z hlavního webu: vnitřní vesmír,
 * mlhoviny, blesky, orbity a 3D naklánění podle pohybu myši.
 *
 * Prostřední "+" otevírá dobití měny. Je to <span role="button">, protože
 * hub sám je <button> a vnořený button není platné HTML.
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

  /* Vrstvy pozadí. Čistě dekorativní, proto aria-hidden. */
  const LAYERS = `
    <span class="mk-hub-universe" aria-hidden="true">
      <span class="mk-hub-nebula mk-hub-nebula-a"></span>
      <span class="mk-hub-nebula mk-hub-nebula-b"></span>
      <span class="mk-hub-stars"></span>
      <span class="mk-hub-scan"></span>
    </span>
    <span class="mk-hub-lightning" aria-hidden="true">
      <svg class="mk-hub-bolt-svg mk-hub-bolt-a" viewBox="0 0 300 84"><path d="M12 55 40 38 62 45 90 18 114 31 143 8"></path></svg>
      <svg class="mk-hub-bolt-svg mk-hub-bolt-b" viewBox="0 0 300 84"><path d="M288 23 259 38 239 30 211 61 183 48 155 74"></path></svg>
      <svg class="mk-hub-bolt-svg mk-hub-bolt-c" viewBox="0 0 300 84"><path d="M22 18 51 28 69 14 97 35"></path></svg>
    </span>
    <span class="mk-hub-orbits" aria-hidden="true"><i></i><i></i><i></i></span>
    <span class="mk-hub-corners" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
    <span class="mk-hub-wave" aria-hidden="true"></span>
    <span class="mk-hub-pulse" aria-hidden="true"><i></i><i></i></span>`;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /** Krátce rozsvítí zůstatky, ať je vidět, že se něco děje. */
  function flashBalances(hub) {
    (hub || document).querySelectorAll(".ow-currency-hub-segment").forEach((segment, index) => {
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
    flashBalances(hub);

    setTimeout(() => {
      button.classList.remove("is-charged");
      hub?.classList.remove("is-charged");
    }, 640);

    setTimeout(() => {
      const selector = document.querySelector("#currencySelectModal");
      if (typeof window.mkOpenCurrencyTopup === "function") window.mkOpenCurrencyTopup();
      else if (typeof window.mkOpenModal === "function" && selector) window.mkOpenModal(selector);
    }, 160);
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

  /** 3D naklánění a světelný bod sledující kurzor – jako na hlavním webu. */
  function bindTilt(hub) {
    if (reducedMotion.matches) return;

    hub.addEventListener("pointermove", event => {
      const rect = hub.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      hub.style.setProperty("--hub-x", `${x * 100}%`);
      hub.style.setProperty("--hub-y", `${y * 100}%`);
      hub.style.setProperty("--hub-tilt-x", `${(y - .5) * -8}deg`);
      hub.style.setProperty("--hub-tilt-y", `${(x - .5) * 10}deg`);
    });

    hub.addEventListener("pointerleave", () => {
      hub.style.setProperty("--hub-x", "50%");
      hub.style.setProperty("--hub-y", "50%");
      hub.style.setProperty("--hub-tilt-x", "0deg");
      hub.style.setProperty("--hub-tilt-y", "0deg");
    });
  }

  function mount() {
    const hub = document.querySelector("#currencyHubButton");
    if (hub && !hub.querySelector(".mk-hub-universe")) {
      hub.insertAdjacentHTML("afterbegin", LAYERS);
      bindTilt(hub);
    }

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

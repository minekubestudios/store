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

  /* Blesky žijí MIMO tělo hubu. Hub má 3D transform (perspective +
     preserve-3d), který potomky vtahuje do 3D kontextu a SVG výboje
     se pak vykreslují pod jeho neprůhledným pozadím. */
  const LIGHTNING = `
    <span class="mk-hub-lightning" aria-hidden="true">
      <span class="mk-hub-side mk-hub-side-mythic">
        <svg class="mk-bolt-1" viewBox="0 0 160 110" preserveAspectRatio="none">
          <path vector-effect="non-scaling-stroke" class="mk-bolt-glow"   d="M150 54 116 48 98 62 74 40 52 52 30 30 12 38"></path>
          <path vector-effect="non-scaling-stroke" class="mk-bolt-mid"    d="M150 54 116 48 98 62 74 40 52 52 30 30 12 38"></path>
          <path vector-effect="non-scaling-stroke" class="mk-bolt-core"   d="M150 54 116 48 98 62 74 40 52 52 30 30 12 38"></path>
        </svg>
        <svg class="mk-bolt-2" viewBox="0 0 160 110" preserveAspectRatio="none">
          <path vector-effect="non-scaling-stroke" class="mk-bolt-glow"   d="M150 60 122 72 104 60 82 80 58 66 34 84 14 74"></path>
          <path vector-effect="non-scaling-stroke" class="mk-bolt-mid"    d="M150 60 122 72 104 60 82 80 58 66 34 84 14 74"></path>
          <path vector-effect="non-scaling-stroke" class="mk-bolt-core"   d="M150 60 122 72 104 60 82 80 58 66 34 84 14 74"></path>
        </svg>
        <svg class="mk-bolt-3" viewBox="0 0 160 110" preserveAspectRatio="none">
          <path vector-effect="non-scaling-stroke" class="mk-bolt-thread" d="M148 46C120 30 104 66 78 48 52 30 40 74 10 56"></path>
        </svg>
      </span>
      <span class="mk-hub-side mk-hub-side-premium">
        <svg class="mk-bolt-1" viewBox="0 0 160 110" preserveAspectRatio="none">
          <path vector-effect="non-scaling-stroke" class="mk-bolt-glow"   d="M10 54 44 48 62 62 86 40 108 52 130 30 148 38"></path>
          <path vector-effect="non-scaling-stroke" class="mk-bolt-mid"    d="M10 54 44 48 62 62 86 40 108 52 130 30 148 38"></path>
          <path vector-effect="non-scaling-stroke" class="mk-bolt-core"   d="M10 54 44 48 62 62 86 40 108 52 130 30 148 38"></path>
        </svg>
        <svg class="mk-bolt-2" viewBox="0 0 160 110" preserveAspectRatio="none">
          <path vector-effect="non-scaling-stroke" class="mk-bolt-glow"   d="M10 60 38 72 56 60 78 80 102 66 126 84 146 74"></path>
          <path vector-effect="non-scaling-stroke" class="mk-bolt-mid"    d="M10 60 38 72 56 60 78 80 102 66 126 84 146 74"></path>
          <path vector-effect="non-scaling-stroke" class="mk-bolt-core"   d="M10 60 38 72 56 60 78 80 102 66 126 84 146 74"></path>
        </svg>
        <svg class="mk-bolt-3" viewBox="0 0 160 110" preserveAspectRatio="none">
          <path vector-effect="non-scaling-stroke" class="mk-bolt-thread" d="M12 46C40 30 56 66 82 48 108 30 120 74 150 56"></path>
        </svg>
      </span>
    </span>`;

  /* Vrstvy pozadí. Čistě dekorativní, proto aria-hidden. */
  const LAYERS = `
    <span class="mk-hub-universe" aria-hidden="true">
      <span class="mk-hub-nebula mk-hub-nebula-a"></span>
      <span class="mk-hub-nebula mk-hub-nebula-b"></span>
      <span class="mk-hub-nebula mk-hub-nebula-c"></span>
      <span class="mk-hub-nebula mk-hub-nebula-d"></span>
      <span class="mk-hub-stars"></span>
      <span class="mk-hub-scan"></span>
    </span>
    <span class="mk-hub-core mk-hub-core-mythic" aria-hidden="true"></span>
    <span class="mk-hub-core mk-hub-core-premium" aria-hidden="true"></span>
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

    const wrap = hub?.closest(".ow-currency-hub-wrap");
    if (wrap && !wrap.querySelector(".mk-hub-lightning")) {
      // Vkládáme ZA tlačítko, ne před něj – hub tvoří vlastní vykreslovací
      // vrstvu (3D transform) a cokoli před ním v DOM by překryl.
      hub.insertAdjacentHTML("afterend", LIGHTNING);
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

"use strict";

/* Minekube Store — profesionální Currency Hub VFX */
(function () {
  const PLUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg>';

  const SPARKS = '<span class="mk-hub-sparks" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>';

  const BOLT = `
    <span class="mk-hub-bolt" aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <path d="M50 8 44 35l12-7-8 25 14-9-16 38"></path>
        <path d="M16 50h20M64 50h20M24 24l13 13M76 24 63 37M24 76l13-13M76 76 63 63"></path>
      </svg>
    </span>`;

  /* Zrcadlově přesné SVG oblouky. VFX leží mimo samotné tlačítko,
     takže nepřekrývá text ani ikony. */
  const VFX = `
    <span class="mk-hub-vfx" aria-hidden="true">
      <span class="mk-hub-side-glow is-left"></span>
      <span class="mk-hub-side-glow is-right"></span>
      <span class="mk-hub-lightning">
        <span class="mk-hub-side mk-hub-side-mythic">
          <svg class="mk-bolt-1" viewBox="0 0 180 80" preserveAspectRatio="none">
            <path vector-effect="non-scaling-stroke" class="mk-bolt-glow" d="M174 40 C151 25 139 53 117 37 S82 24 64 41 S31 57 6 40"></path>
            <path vector-effect="non-scaling-stroke" class="mk-bolt-mid" d="M174 40 C151 25 139 53 117 37 S82 24 64 41 S31 57 6 40"></path>
            <path vector-effect="non-scaling-stroke" class="mk-bolt-core" d="M174 40 C151 25 139 53 117 37 S82 24 64 41 S31 57 6 40"></path>
          </svg>
          <svg class="mk-bolt-2" viewBox="0 0 180 80" preserveAspectRatio="none">
            <path vector-effect="non-scaling-stroke" class="mk-bolt-glow" d="M174 40 C151 55 139 27 117 43 S82 56 64 39 S31 23 6 40"></path>
            <path vector-effect="non-scaling-stroke" class="mk-bolt-mid" d="M174 40 C151 55 139 27 117 43 S82 56 64 39 S31 23 6 40"></path>
            <path vector-effect="non-scaling-stroke" class="mk-bolt-core" d="M174 40 C151 55 139 27 117 43 S82 56 64 39 S31 23 6 40"></path>
          </svg>
          <svg class="mk-bolt-3" viewBox="0 0 180 80" preserveAspectRatio="none">
            <path vector-effect="non-scaling-stroke" class="mk-bolt-thread" d="M174 40 C150 39 139 55 116 42 S82 26 62 40 S30 50 6 40"></path>
          </svg>
        </span>
        <span class="mk-hub-side mk-hub-side-premium">
          <svg class="mk-bolt-1" viewBox="0 0 180 80" preserveAspectRatio="none">
            <path vector-effect="non-scaling-stroke" class="mk-bolt-glow" d="M6 40 C29 25 41 53 63 37 S98 24 116 41 S149 57 174 40"></path>
            <path vector-effect="non-scaling-stroke" class="mk-bolt-mid" d="M6 40 C29 25 41 53 63 37 S98 24 116 41 S149 57 174 40"></path>
            <path vector-effect="non-scaling-stroke" class="mk-bolt-core" d="M6 40 C29 25 41 53 63 37 S98 24 116 41 S149 57 174 40"></path>
          </svg>
          <svg class="mk-bolt-2" viewBox="0 0 180 80" preserveAspectRatio="none">
            <path vector-effect="non-scaling-stroke" class="mk-bolt-glow" d="M6 40 C29 55 41 27 63 43 S98 56 116 39 S149 23 174 40"></path>
            <path vector-effect="non-scaling-stroke" class="mk-bolt-mid" d="M6 40 C29 55 41 27 63 43 S98 56 116 39 S149 23 174 40"></path>
            <path vector-effect="non-scaling-stroke" class="mk-bolt-core" d="M6 40 C29 55 41 27 63 43 S98 56 116 39 S149 23 174 40"></path>
          </svg>
          <svg class="mk-bolt-3" viewBox="0 0 180 80" preserveAspectRatio="none">
            <path vector-effect="non-scaling-stroke" class="mk-bolt-thread" d="M6 40 C30 39 41 55 64 42 S98 26 118 40 S150 50 174 40"></path>
          </svg>
        </span>
      </span>
      <span class="mk-hub-particles"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
    </span>`;

  const LAYERS = `
    <span class="mk-hub-universe" aria-hidden="true">
      <span class="mk-hub-nebula mk-hub-nebula-a"></span>
      <span class="mk-hub-nebula mk-hub-nebula-b"></span>
      <span class="mk-hub-nebula mk-hub-nebula-c"></span>
      <span class="mk-hub-nebula mk-hub-nebula-d"></span>
      <span class="mk-hub-stars"></span>
      <span class="mk-hub-scan"></span>
    </span>
    <span class="mk-hub-wave" aria-hidden="true"></span>
    <span class="mk-hub-pulse" aria-hidden="true"><i></i><i></i></span>`;

  function flashBalances(hub) {
    hub?.querySelectorAll(".ow-currency-hub-segment").forEach((segment, index) => {
      window.setTimeout(() => {
        segment.classList.add("is-flash");
        window.setTimeout(() => segment.classList.remove("is-flash"), 440);
      }, index * 75);
    });
  }

  function animateHub(hub, plus) {
    const wrap = hub?.closest(".ow-currency-hub-wrap");
    [hub, plus, wrap].forEach(node => node?.classList.remove("is-charged"));
    if (hub) void hub.offsetWidth;
    [hub, plus, wrap].forEach(node => node?.classList.add("is-charged"));
    flashBalances(hub);

    window.setTimeout(() => {
      [hub, plus, wrap].forEach(node => node?.classList.remove("is-charged"));
    }, 760);
  }

  function openCurrencySelector() {
    const modal = document.querySelector("#currencySelectModal");
    if (typeof window.mkOpenCurrencyTopup === "function") {
      window.mkOpenCurrencyTopup();
    } else if (typeof window.mkOpenModal === "function" && modal) {
      window.mkOpenModal(modal);
    }
  }

  function buildPlus({ mobile = false } = {}) {
    const plus = document.createElement("span");
    plus.className = `mk-hub-plus${mobile ? " is-mobile" : ""}`;
    plus.setAttribute("role", "button");
    plus.setAttribute("tabindex", "0");
    plus.setAttribute("aria-label", "Dobít herní měnu");
    plus.setAttribute("title", "Dobít herní měnu");
    plus.innerHTML = `${PLUS}${BOLT}`;

    const activate = event => {
      event.preventDefault();
      event.stopPropagation();
      const hub = plus.closest(".ow-currency-hub");
      animateHub(hub, plus);
      window.setTimeout(openCurrencySelector, 220);
    };

    plus.addEventListener("click", activate);
    plus.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") activate(event);
    });
    return plus;
  }

  function mount() {
    const hub = document.querySelector("#currencyHubButton");
    if (hub && !hub.querySelector(".mk-hub-universe")) {
      hub.insertAdjacentHTML("afterbegin", LAYERS);
    }

    const wrap = hub?.closest(".ow-currency-hub-wrap");
    if (wrap && !wrap.querySelector(".mk-hub-vfx")) {
      hub.insertAdjacentHTML("afterend", VFX);
    }

    const divider = hub?.querySelector(".ow-currency-hub-divider");
    if (divider && !hub.querySelector(".mk-hub-plus")) {
      const plus = buildPlus();
      divider.replaceWith(plus);
      plus.insertAdjacentHTML("afterend", SPARKS);
    }

    /* Tlačítko jako celek: nejdřív se ukáže krátký pulz, potom se otevře
       stávající obrazovka měn. StopImmediatePropagation zabrání dvojímu
       otevření z původního listeneru v app.js, funkčnost zůstává stejná. */
    if (hub && !hub.dataset.vfxBound) {
      hub.dataset.vfxBound = "true";
      hub.addEventListener("click", event => {
        if (event.target.closest(".mk-hub-plus")) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        animateHub(hub, hub.querySelector(".mk-hub-plus"));
        window.setTimeout(openCurrencySelector, 220);
      });
    }

    const mobileBar = document.querySelector("#mobileCurrencyButton");
    if (mobileBar && !mobileBar.querySelector(".mk-hub-plus")) {
      mobileBar.appendChild(buildPlus({ mobile: true }));
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }
})();

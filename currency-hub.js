"use strict";

/* Minekube Store — Currency Hub: profesionální galaxy/lightning VFX */
(function () {
  const PLUS = `
    <svg class="mk-hub-plus-icon" viewBox="0 0 32 32" aria-hidden="true">
      <path class="mk-plus-glow" d="M16 7v18M7 16h18"></path>
      <path class="mk-plus-core" d="M16 7v18M7 16h18"></path>
    </svg>`;

  const SPARKS = '<span class="mk-hub-sparks" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>';

  const BOLT = `
    <span class="mk-hub-bolt" aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <path d="M50 5 40 38l15-8-8 25 17-10-18 49"></path>
        <path d="M10 50h23M67 50h23M20 20l17 17M80 20 63 37M20 80l17-17M80 80 63 63"></path>
      </svg>
    </span>`;

  const leftBoltA = "M216 45 L199 36 L186 48 L169 27 L152 43 L134 18 L116 38 L97 13 L79 34 L59 17 L43 40 L23 27 L5 44";
  const leftBoltB = "M216 45 L201 54 L187 42 L171 62 L153 48 L136 70 L118 54 L99 75 L82 57 L63 70 L47 51 L29 62 L6 45";
  const rightBoltA = "M4 45 L21 36 L34 48 L51 27 L68 43 L86 18 L104 38 L123 13 L141 34 L161 17 L177 40 L197 27 L215 44";
  const rightBoltB = "M4 45 L19 54 L33 42 L49 62 L67 48 L84 70 L102 54 L121 75 L138 57 L157 70 L173 51 L191 62 L214 45";

  function layeredPath(path, groupClass) {
    return `
      <g class="${groupClass}">
        <path pathLength="100" class="mk-bolt-glow" d="${path}"></path>
        <path pathLength="100" class="mk-bolt-mid" d="${path}"></path>
        <path pathLength="100" class="mk-bolt-core" d="${path}"></path>
      </g>`;
  }

  const VFX = `
    <span class="mk-hub-vfx" aria-hidden="true">
      <span class="mk-hub-side-glow is-left"></span>
      <span class="mk-hub-side-glow is-right"></span>
      <span class="mk-hub-lightning">
        <span class="mk-hub-side mk-hub-side-mythic">
          <svg viewBox="0 0 220 90" preserveAspectRatio="none">
            ${layeredPath(leftBoltA, "mk-bolt-a")}
            ${layeredPath(leftBoltB, "mk-bolt-b")}
            <g class="mk-bolt-branches">
              <path pathLength="100" d="M169 27 L158 7 L146 20"></path>
              <path pathLength="100" d="M116 38 L101 27 L90 31"></path>
              <path pathLength="100" d="M59 17 L48 3 L36 16"></path>
            </g>
          </svg>
        </span>
        <span class="mk-hub-side mk-hub-side-premium">
          <svg viewBox="0 0 220 90" preserveAspectRatio="none">
            ${layeredPath(rightBoltA, "mk-bolt-a")}
            ${layeredPath(rightBoltB, "mk-bolt-b")}
            <g class="mk-bolt-branches">
              <path pathLength="100" d="M51 27 L62 7 L74 20"></path>
              <path pathLength="100" d="M104 38 L119 27 L130 31"></path>
              <path pathLength="100" d="M161 17 L172 3 L184 16"></path>
            </g>
          </svg>
        </span>
      </span>
      <span class="mk-hub-galaxy-particles">
        <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
        <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
      </span>
      <span class="mk-hub-click-pulse">
        <i class="mk-pulse-core"></i>
        <i class="mk-pulse-ring ring-a"></i>
        <i class="mk-pulse-ring ring-b"></i>
        <i class="mk-pulse-ring ring-c"></i>
        <i class="mk-pulse-cross cross-a"></i>
        <i class="mk-pulse-cross cross-b"></i>
      </span>
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
    <span class="mk-hub-wave" aria-hidden="true"></span>`;

  function flashBalances(hub) {
    hub?.querySelectorAll(".ow-currency-hub-segment").forEach((segment, index) => {
      window.setTimeout(() => {
        segment.classList.add("is-flash");
        window.setTimeout(() => segment.classList.remove("is-flash"), 520);
      }, index * 90);
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
    }, 980);
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
      window.setTimeout(openCurrencySelector, 520);
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

    if (hub && !hub.dataset.vfxBound) {
      hub.dataset.vfxBound = "true";
      hub.addEventListener("click", event => {
        if (event.target.closest(".mk-hub-plus")) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        animateHub(hub, hub.querySelector(".mk-hub-plus"));
        window.setTimeout(openCurrencySelector, 520);
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

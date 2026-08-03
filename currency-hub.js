"use strict";

/* Minekube Store — Currency Hub / Ultimate lightning VFX */
(function () {
  const PLUS = `
    <span class="mk-plus-reactor" aria-hidden="true">
      <span class="mk-plus-orbit"><i></i><i></i><i></i><i></i></span>
      <svg class="mk-hub-plus-icon" viewBox="0 0 40 40" aria-hidden="true">
        <path class="mk-plus-shadow" d="M20 10v20M10 20h20"></path>
        <path class="mk-plus-energy" d="M20 10v20M10 20h20"></path>
        <path class="mk-plus-core" d="M20 11.5v17M11.5 20h17"></path>
      </svg>
    </span>`;

  const SPARKS = `
    <span class="mk-hub-sparks" aria-hidden="true">
      <i></i><i></i><i></i><i></i><i></i><i></i>
      <i></i><i></i><i></i><i></i><i></i><i></i>
    </span>`;

  function arc(path, className) {
    return `
      <g class="${className}">
        <path pathLength="100" class="mk-arc-haze" d="${path}"></path>
        <path pathLength="100" class="mk-arc-body" d="${path}"></path>
        <path pathLength="100" class="mk-arc-core" d="${path}"></path>
      </g>`;
  }

  const leftMain = "M234 50 C221 50 214 45 205 48 L191 34 L177 46 L164 27 L149 42 L135 16 L119 39 L104 28 L90 53 L73 39 L57 62 L40 49 L24 68 L7 59";
  const leftAlt = "M233 53 C217 54 209 60 198 57 L186 69 L171 56 L158 76 L143 59 L127 82 L111 60 L95 72 L80 49 L64 62 L48 41 L31 55 L15 40 L4 48";
  const leftBranchA = "M178 46 L168 23 L154 31";
  const leftBranchB = "M119 39 L107 17 L94 27";
  const leftBranchC = "M73 39 L62 19 L49 28";

  const rightMain = "M6 50 C19 50 26 45 35 48 L49 34 L63 46 L76 27 L91 42 L105 16 L121 39 L136 28 L150 53 L167 39 L183 62 L200 49 L216 68 L233 59";
  const rightAlt = "M7 53 C23 54 31 60 42 57 L54 69 L69 56 L82 76 L97 59 L113 82 L129 60 L145 72 L160 49 L176 62 L192 41 L209 55 L225 40 L236 48";
  const rightBranchA = "M62 46 L72 23 L86 31";
  const rightBranchB = "M121 39 L133 17 L146 27";
  const rightBranchC = "M167 39 L178 19 L191 28";

  const VFX = `
    <span class="mk-hub-vfx" aria-hidden="true">
      <span class="mk-hub-side-glow is-left"></span>
      <span class="mk-hub-side-glow is-right"></span>
      <span class="mk-hub-lightning-field">
        <span class="mk-hub-lightning-side is-left">
          <svg viewBox="0 0 240 100" preserveAspectRatio="none">
            ${arc(leftMain, "mk-arc mk-arc-main")}
            ${arc(leftAlt, "mk-arc mk-arc-alt")}
            <g class="mk-arc-branches">
              <path pathLength="100" d="${leftBranchA}"></path>
              <path pathLength="100" d="${leftBranchB}"></path>
              <path pathLength="100" d="${leftBranchC}"></path>
            </g>
          </svg>
        </span>
        <span class="mk-hub-lightning-side is-right">
          <svg viewBox="0 0 240 100" preserveAspectRatio="none">
            ${arc(rightMain, "mk-arc mk-arc-main")}
            ${arc(rightAlt, "mk-arc mk-arc-alt")}
            <g class="mk-arc-branches">
              <path pathLength="100" d="${rightBranchA}"></path>
              <path pathLength="100" d="${rightBranchB}"></path>
              <path pathLength="100" d="${rightBranchC}"></path>
            </g>
          </svg>
        </span>
      </span>
      <span class="mk-hub-galaxy-particles">
        ${"<i></i>".repeat(28)}
      </span>
      <span class="mk-hub-click-pulse">
        <i class="mk-pulse-core"></i>
        <i class="mk-pulse-ring ring-a"></i>
        <i class="mk-pulse-ring ring-b"></i>
        <i class="mk-pulse-ring ring-c"></i>
        <i class="mk-pulse-cross cross-a"></i>
        <i class="mk-pulse-cross cross-b"></i>
        <span class="mk-pulse-shards">${"<i></i>".repeat(12)}</span>
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
        window.setTimeout(() => segment.classList.remove("is-flash"), 540);
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
    }, 1080);
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
    plus.innerHTML = PLUS;

    const activate = event => {
      event.preventDefault();
      event.stopPropagation();
      const hub = plus.closest(".ow-currency-hub") || document.querySelector("#currencyHubButton");
      animateHub(hub, plus);
      window.setTimeout(openCurrencySelector, 560);
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

    if (hub && !hub.querySelector(".mk-hub-plus")) {
      const plus = buildPlus();
      const arrow = hub.querySelector(".ow-currency-hub-arrow");
      if (arrow) arrow.insertAdjacentElement("beforebegin", plus);
      else hub.appendChild(plus);
      plus.insertAdjacentHTML("afterend", SPARKS);
    }

    if (hub && !hub.dataset.vfxBound) {
      hub.dataset.vfxBound = "true";
      hub.addEventListener("click", event => {
        if (event.target.closest(".mk-hub-plus")) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        animateHub(hub, hub.querySelector(".mk-hub-plus"));
        window.setTimeout(openCurrencySelector, 560);
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

"use strict";

/*
 * Minekube Store — hub herních měn
 * Efekty jsou převzaté přímo z hlavního webu:
 * - blesky a částice z tlačítka STORE,
 * - klikací pulz z tlačítka Stáhnout modpack.
 * Vzhled, rozložení a funkce samotného tlačítka zůstávají beze změny.
 */

(function () {
  const PLUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg>';

  const STORE_EFFECTS = `
    <span class="store-button-fx mk-currency-store-fx" aria-hidden="true"></span>
    <span class="store-button-lightning mk-currency-store-lightning" aria-hidden="true">
      <svg class="store-lightning store-lightning-a" viewBox="0 0 210 84"><path d="M9 55 31 38 48 45 70 18 89 31 112 8"></path></svg>
      <svg class="store-lightning store-lightning-b" viewBox="0 0 210 84"><path d="M202 23 179 38 163 30 141 61 119 48 97 74"></path></svg>
      <svg class="store-lightning store-lightning-c" viewBox="0 0 210 84"><path d="M17 18 40 28 54 14 76 35"></path></svg>
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
    <span class="mk-hub-core mk-hub-core-mythic" aria-hidden="true"></span>
    <span class="mk-hub-core mk-hub-core-premium" aria-hidden="true"></span>
    <span class="mk-hub-orbits" aria-hidden="true"><i></i><i></i><i></i></span>
    <span class="mk-hub-corners" aria-hidden="true"><i></i><i></i><i></i><i></i></span>`;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(pointer: fine)");
  const fxPalette = ["#69f7ff", "#8f6cff", "#ff58df", "#ffd36e", "#78adff"];
  const fxIcons = ["✦", "◇", "⬡", "+", "✧"];
  let fxTimer = 0;
  let lastPulseAt = 0;

  const randomBetween = (min, max) => Math.random() * (max - min) + min;

  function spawnStoreFx(hub, amount = 16, force = false) {
    const wrap = hub?.closest(".ow-currency-hub-wrap");
    const fxLayer = wrap?.querySelector(".mk-currency-store-fx");
    if (!fxLayer || (!force && !hub.matches(":hover"))) return;

    for (let index = 0; index < amount; index += 1) {
      const roll = Math.random();
      const node = document.createElement("i");
      const angle = randomBetween(0, Math.PI * 2);
      const distanceX = randomBetween(64, 138);
      const distanceY = randomBetween(46, 104);
      const color = fxPalette[Math.floor(Math.random() * fxPalette.length)];
      const x = Math.cos(angle) * distanceX;
      const y = Math.sin(angle) * distanceY;

      if (roll < .19) {
        node.className = "store-fx-bolt";
      } else if (roll < .44) {
        node.className = "store-fx-icon";
        node.textContent = fxIcons[Math.floor(Math.random() * fxIcons.length)];
      } else {
        node.className = "store-fx-particle";
      }

      node.style.setProperty("--fx-x", `${x.toFixed(1)}px`);
      node.style.setProperty("--fx-y", `${y.toFixed(1)}px`);
      node.style.setProperty("--fx-size", `${randomBetween(3, roll < .44 ? 15 : 7.5).toFixed(1)}px`);
      node.style.setProperty("--fx-duration", `${Math.round(randomBetween(720, 1260))}ms`);
      node.style.setProperty("--fx-delay", `${Math.round(randomBetween(0, 100))}ms`);
      node.style.setProperty("--fx-rotation", `${Math.round(randomBetween(-180, 180))}deg`);
      node.style.setProperty("--fx-scale", randomBetween(.38, 1.08).toFixed(2));
      node.style.setProperty("--fx-color", color);
      fxLayer.appendChild(node);
      node.addEventListener("animationend", () => node.remove(), { once: true });
    }
  }

  /* Přesný klikací pulz z tlačítka „Stáhnout modpack“ na hlavním webu. */
  function launchDownloadPulse(event, target) {
    if (reducedMotion.matches) return;

    const now = performance.now();
    if (now - lastPulseAt < 180) return;
    lastPulseAt = now;

    const rect = target.getBoundingClientRect();
    const hasPointerPosition = event
      && Number.isFinite(event.clientX)
      && Number.isFinite(event.clientY)
      && (event.clientX || event.clientY);
    const x = hasPointerPosition ? event.clientX : rect.left + rect.width / 2;
    const y = hasPointerPosition ? event.clientY : rect.top + rect.height / 2;

    const burst = document.createElement("span");
    burst.className = "download-click-burst download-click-burst-classic-plus";
    burst.style.left = `${x}px`;
    burst.style.top = `${y}px`;

    for (let index = 0; index < 3; index += 1) {
      const ring = document.createElement("span");
      ring.className = "download-burst-ring";
      ring.style.setProperty("--ring-delay", `${index * 74}ms`);
      ring.style.setProperty("--ring-scale", `${6.9 + index * 2.25}`);
      burst.appendChild(ring);
    }

    const sparkCount = 28;
    for (let index = 0; index < sparkCount; index += 1) {
      const spark = document.createElement("i");
      const angle = (360 / sparkCount) * index + (Math.random() * 10 - 5);
      spark.style.setProperty("--spark-angle", `${angle}deg`);
      spark.style.setProperty("--spark-distance", `${64 + Math.random() * 72}px`);
      spark.style.setProperty("--spark-length", `${10 + Math.random() * 21}px`);
      spark.style.setProperty("--spark-delay", `${Math.random() * 105}ms`);
      spark.style.setProperty("--spark-width", `${1.7 + Math.random() * 2.2}px`);
      burst.appendChild(spark);
    }

    const fragmentCount = 16;
    for (let index = 0; index < fragmentCount; index += 1) {
      const fragment = document.createElement("b");
      const angle = (360 / fragmentCount) * index + (Math.random() * 20 - 10);
      fragment.style.setProperty("--fragment-angle", `${angle}deg`);
      fragment.style.setProperty("--fragment-distance", `${48 + Math.random() * 74}px`);
      fragment.style.setProperty("--fragment-spin", `${180 + Math.random() * 500}deg`);
      fragment.style.setProperty("--fragment-delay", `${25 + Math.random() * 115}ms`);
      burst.appendChild(fragment);
    }

    const microParticleCount = 14;
    for (let index = 0; index < microParticleCount; index += 1) {
      const particle = document.createElement("u");
      const angle = (360 / microParticleCount) * index + (Math.random() * 26 - 13);
      particle.style.setProperty("--micro-angle", `${angle}deg`);
      particle.style.setProperty("--micro-distance", `${38 + Math.random() * 64}px`);
      particle.style.setProperty("--micro-delay", `${55 + Math.random() * 135}ms`);
      particle.style.setProperty("--micro-size", `${2 + Math.random() * 2.6}px`);
      burst.appendChild(particle);
    }

    document.body.appendChild(burst);
    window.setTimeout(() => burst.remove(), 1240);
  }

  function openCurrencySelector() {
    const selector = document.querySelector("#currencySelectModal");
    if (typeof window.mkOpenCurrencyTopup === "function") window.mkOpenCurrencyTopup();
    else if (typeof window.mkOpenModal === "function" && selector) window.mkOpenModal(selector);
  }

  function buildPlus({ mobile = false } = {}) {
    const button = document.createElement("span");
    button.className = `mk-hub-plus${mobile ? " is-mobile" : ""}`;
    button.setAttribute("role", "button");
    button.setAttribute("tabindex", "0");
    button.setAttribute("aria-label", "Dobít herní měnu");
    button.setAttribute("title", "Dobít herní měnu");
    button.innerHTML = PLUS;

    const activate = event => {
      event.preventDefault();
      event.stopPropagation();
      const hub = button.closest(".ow-currency-hub") || button.closest("#mobileCurrencyButton") || button;
      launchDownloadPulse(event, hub);
      window.setTimeout(openCurrencySelector, 160);
    };

    button.addEventListener("click", activate);
    button.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") activate(event);
    });

    return button;
  }

  function bindMainWebEffects(hub) {
    if (reducedMotion.matches) return;

    hub.addEventListener("pointermove", event => {
      const rect = hub.getBoundingClientRect();
      const x = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
      const y = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);
      hub.style.setProperty("--hub-x", `${x * 100}%`);
      hub.style.setProperty("--hub-y", `${y * 100}%`);
      hub.style.setProperty("--hub-tilt-x", `${(y - .5) * -8}deg`);
      hub.style.setProperty("--hub-tilt-y", `${(x - .5) * 10}deg`);
    });

    hub.addEventListener("pointerenter", () => {
      spawnStoreFx(hub, 32);
      window.clearInterval(fxTimer);
      fxTimer = window.setInterval(() => spawnStoreFx(hub, 9), 210);
    });

    hub.addEventListener("pointerleave", () => {
      window.clearInterval(fxTimer);
      hub.style.setProperty("--hub-x", "50%");
      hub.style.setProperty("--hub-y", "50%");
      hub.style.setProperty("--hub-tilt-x", "0deg");
      hub.style.setProperty("--hub-tilt-y", "0deg");
    });

    hub.addEventListener("pointerdown", event => launchDownloadPulse(event, hub));
    hub.addEventListener("click", event => {
      if (event.detail === 0) launchDownloadPulse(event, hub);
    });
  }

  function mount() {
    const hub = document.querySelector("#currencyHubButton");
    const wrap = hub?.closest(".ow-currency-hub-wrap");

    if (hub && !hub.querySelector(".mk-hub-universe")) {
      hub.insertAdjacentHTML("afterbegin", LAYERS);
    }

    if (wrap && !wrap.querySelector(".mk-currency-store-fx")) {
      wrap.insertAdjacentHTML("afterbegin", STORE_EFFECTS);
    }

    if (hub) bindMainWebEffects(hub);

    const divider = hub?.querySelector(".ow-currency-hub-divider");
    if (divider && !hub.querySelector(".mk-hub-plus")) {
      divider.replaceWith(buildPlus());
    }

    const mobileBar = document.querySelector("#mobileCurrencyButton");
    if (mobileBar && !mobileBar.querySelector(".mk-hub-plus")) {
      mobileBar.appendChild(buildPlus({ mobile: true }));
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();

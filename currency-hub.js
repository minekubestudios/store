"use strict";

/*
 * Minekube Store — VFX tlačítka měn a plynulý přechod do fullscreen nabídky.
 * Struktura tlačítka zůstává beze změny: dvě měny vlevo, plusko vpravo.
 */

(function () {
  const STORE_EFFECTS = `
    <span class="mk-currency-line-particles" aria-hidden="true"></span>
    <span class="store-button-fx mk-currency-store-fx" aria-hidden="true"></span>
    <span class="store-button-lightning mk-currency-store-lightning" aria-hidden="true">
      <svg class="store-lightning store-lightning-a" viewBox="0 0 210 84"><path d="M9 55 31 38 48 45 70 18 89 31 112 8"></path></svg>
      <svg class="store-lightning store-lightning-b" viewBox="0 0 210 84"><path d="M202 23 179 38 163 30 141 61 119 48 97 74"></path></svg>
      <svg class="store-lightning store-lightning-c" viewBox="0 0 210 84"><path d="M17 18 40 28 54 14 76 35"></path></svg>
    </span>`;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const fxPalette = ["#69f7ff", "#8f6cff", "#ff58df", "#ffd36e", "#78adff"];
  const fxIcons = ["✦", "◇", "⬡", "+", "✧"];
  const portalPalette = ["#55efff", "#7e79ff", "#ae67ff", "#ff5ad4", "#ffc44e"];
  let fxTimer = 0;
  let lastPulseAt = 0;
  let portalBusy = false;

  const randomBetween = (min, max) => Math.random() * (max - min) + min;

  function populateLineParticles(wrap, amount = 30) {
    const layer = wrap?.querySelector(".mk-currency-line-particles");
    if (!layer || layer.childElementCount) return;

    for (let index = 0; index < amount; index += 1) {
      const particle = document.createElement("i");
      const progress = (index + .5) / amount;
      const segment = Math.floor(progress * 4);
      const local = (progress * 4) - segment;
      let left = 0;
      let top = 0;

      if (segment === 0) { left = local * 100; top = 0; }
      else if (segment === 1) { left = 100; top = local * 100; }
      else if (segment === 2) { left = (1 - local) * 100; top = 100; }
      else { left = 0; top = (1 - local) * 100; }

      const color = fxPalette[index % fxPalette.length];
      particle.style.setProperty("--line-x", `${left.toFixed(2)}%`);
      particle.style.setProperty("--line-y", `${top.toFixed(2)}%`);
      particle.style.setProperty("--line-size", `${randomBetween(1.7, 4.1).toFixed(1)}px`);
      particle.style.setProperty("--line-color", color);
      particle.style.setProperty("--line-delay", `${(-randomBetween(0, 5.5)).toFixed(2)}s`);
      particle.style.setProperty("--line-idle-duration", `${randomBetween(3.8, 6.8).toFixed(2)}s`);
      particle.style.setProperty("--line-hover-duration", `${randomBetween(1.35, 2.45).toFixed(2)}s`);
      particle.style.setProperty("--line-drift-x", `${randomBetween(-7, 7).toFixed(1)}px`);
      particle.style.setProperty("--line-drift-y", `${randomBetween(-7, 7).toFixed(1)}px`);
      particle.style.setProperty("--line-peak", randomBetween(.38, .78).toFixed(2));
      layer.appendChild(particle);
    }
  }

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

  /* Klikací pulz převzatý z tlačítka „Stáhnout modpack“. */
  function launchDownloadPulse(event, target) {
    if (reducedMotion.matches || !target) return;

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

    for (let index = 0; index < 28; index += 1) {
      const spark = document.createElement("i");
      const angle = (360 / 28) * index + (Math.random() * 10 - 5);
      spark.style.setProperty("--spark-angle", `${angle}deg`);
      spark.style.setProperty("--spark-distance", `${64 + Math.random() * 72}px`);
      spark.style.setProperty("--spark-length", `${10 + Math.random() * 21}px`);
      spark.style.setProperty("--spark-delay", `${Math.random() * 105}ms`);
      spark.style.setProperty("--spark-width", `${1.7 + Math.random() * 2.2}px`);
      burst.appendChild(spark);
    }

    for (let index = 0; index < 16; index += 1) {
      const fragment = document.createElement("b");
      const angle = (360 / 16) * index + (Math.random() * 20 - 10);
      fragment.style.setProperty("--fragment-angle", `${angle}deg`);
      fragment.style.setProperty("--fragment-distance", `${48 + Math.random() * 74}px`);
      fragment.style.setProperty("--fragment-spin", `${180 + Math.random() * 500}deg`);
      fragment.style.setProperty("--fragment-delay", `${25 + Math.random() * 115}ms`);
      burst.appendChild(fragment);
    }

    for (let index = 0; index < 14; index += 1) {
      const particle = document.createElement("u");
      const angle = (360 / 14) * index + (Math.random() * 26 - 13);
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

  function addPortalRing(layer, index) {
    const ring = document.createElement("span");
    ring.className = "mk-currency-portal-ring";
    ring.style.setProperty("--ring-size", `${86 + index * 17}px`);
    ring.style.setProperty("--ring-width", `${index % 2 ? 2 : 3}px`);
    ring.style.setProperty("--ring-color", portalPalette[index % portalPalette.length]);
    ring.style.setProperty("--ring-delay", `${index * 42}ms`);
    ring.style.setProperty("--ring-scale", `${11.5 + index * 1.55}`);
    layer.appendChild(ring);
  }

  function addPortalBeam(layer, index) {
    const beam = document.createElement("span");
    beam.className = "mk-currency-portal-beam";
    beam.style.setProperty("--beam-angle", `${index * 30 + randomBetween(-4, 4)}deg`);
    beam.style.setProperty("--beam-width", `${randomBetween(2, 4.6).toFixed(1)}px`);
    beam.style.setProperty("--beam-color", portalPalette[index % portalPalette.length]);
    beam.style.setProperty("--beam-delay", `${50 + index * 17}ms`);
    layer.appendChild(beam);
  }

  function addPortalParticle(layer, viewportDiagonal, index) {
    const particle = document.createElement("i");
    particle.className = "mk-currency-portal-particle";
    const angle = randomBetween(0, Math.PI * 2);
    const distance = randomBetween(viewportDiagonal * .16, viewportDiagonal * .64);
    particle.style.setProperty("--particle-x", `${(Math.cos(angle) * distance).toFixed(1)}px`);
    particle.style.setProperty("--particle-y", `${(Math.sin(angle) * distance).toFixed(1)}px`);
    particle.style.setProperty("--particle-size", `${randomBetween(2.3, 7.4).toFixed(1)}px`);
    particle.style.setProperty("--particle-radius", index % 5 === 0 ? "1px" : "50%");
    particle.style.setProperty("--particle-color", portalPalette[index % portalPalette.length]);
    particle.style.setProperty("--particle-rotation", `${randomBetween(-180, 180).toFixed(1)}deg`);
    particle.style.setProperty("--particle-scale", randomBetween(.45, 1.1).toFixed(2));
    particle.style.setProperty("--particle-delay", `${randomBetween(20, 170).toFixed(0)}ms`);
    layer.appendChild(particle);
  }

  function createPortalLayer(target) {
    const rect = target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const diagonal = Math.hypot(window.innerWidth, window.innerHeight);
    const portalScale = Math.max(18, (diagonal / Math.min(rect.width, rect.height)) * 1.65);

    const layer = document.createElement("div");
    layer.className = "mk-currency-portal-transition";
    layer.setAttribute("aria-hidden", "true");
    layer.style.setProperty("--portal-x", `${centerX.toFixed(1)}px`);
    layer.style.setProperty("--portal-y", `${centerY.toFixed(1)}px`);
    layer.style.setProperty("--portal-w", `${rect.width.toFixed(1)}px`);
    layer.style.setProperty("--portal-h", `${rect.height.toFixed(1)}px`);
    layer.style.setProperty("--portal-scale", portalScale.toFixed(2));

    const grid = document.createElement("span");
    grid.className = "mk-currency-portal-grid";
    layer.appendChild(grid);

    const core = document.createElement("span");
    core.className = "mk-currency-portal-core";
    layer.appendChild(core);

    for (let index = 0; index < 5; index += 1) addPortalRing(layer, index);
    for (let index = 0; index < 12; index += 1) addPortalBeam(layer, index);
    for (let index = 0; index < 54; index += 1) addPortalParticle(layer, diagonal, index);

    const flash = document.createElement("span");
    flash.className = "mk-currency-portal-flash";
    layer.appendChild(flash);

    return layer;
  }

  function launchCurrencyPortal(event, target) {
    const hub = target?.closest?.("#currencyHubButton") || document.querySelector("#currencyHubButton");
    if (!hub) return false;

    /* Původní pulz tlačítka „Stáhnout modpack“ se přehraje přímo z místa
       kliknutí. Výběr měny se přitom otevírá okamžitě bez prodlevy. */
    launchDownloadPulse(event, hub);
    openCurrencySelector();
    return true;
  }

  function launchCheckoutPortal(event, target) {
    const trigger = target instanceof Element ? target : null;
    if (!trigger || portalBusy || reducedMotion.matches) return false;

    portalBusy = true;
    launchDownloadPulse(event, trigger);

    const layer = createPortalLayer(trigger);
    layer.classList.add("is-payment-transition");
    document.body.appendChild(layer);
    document.body.classList.add("payment-transition-active");

    requestAnimationFrame(() => requestAnimationFrame(() => layer.classList.add("is-active")));
    window.setTimeout(() => layer.classList.add("is-revealing"), 680);

    window.setTimeout(() => {
      layer.remove();
      document.body.classList.remove("payment-transition-active");
      portalBusy = false;
    }, 1120);

    return true;
  }

  function findPaymentTrigger(event) {
    const selector = [
      "#minekubePayPalButton",
      "[data-start-mock-payment]",
      ".place-order-button",
      "[data-complete-payment]",
      "[data-confirm-purchase]",
      "[data-purchase]"
    ].join(",");

    const path = typeof event.composedPath === "function" ? event.composedPath() : [event.target];
    return path.find(node => node instanceof Element && node.matches?.(selector)) || null;
  }

  function bindCheckoutTransition() {
    document.addEventListener("click", event => {
      const trigger = findPaymentTrigger(event);
      if (!trigger || trigger.matches(":disabled") || trigger.getAttribute("aria-disabled") === "true") return;
      launchCheckoutPortal(event, trigger);
    }, true);
  }

  function mount() {
    const hub = document.querySelector("#currencyHubButton");
    const wrap = hub?.closest(".ow-currency-hub-wrap");
    if (!hub || !wrap) return;

    if (!wrap.querySelector(".mk-currency-store-fx")) {
      wrap.insertAdjacentHTML("afterbegin", STORE_EFFECTS);
    }
    populateLineParticles(wrap);

    if (!reducedMotion.matches) {
      hub.addEventListener("pointermove", event => {
        const rect = hub.getBoundingClientRect();
        const x = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
        const y = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);
        hub.style.setProperty("--hub-x", `${x * 100}%`);
        hub.style.setProperty("--hub-y", `${y * 100}%`);
      });

      hub.addEventListener("pointerenter", () => {
        spawnStoreFx(hub, 42);
        window.clearInterval(fxTimer);
        fxTimer = window.setInterval(() => spawnStoreFx(hub, 12), 175);
      });

      hub.addEventListener("pointerleave", () => {
        window.clearInterval(fxTimer);
        hub.style.setProperty("--hub-x", "50%");
        hub.style.setProperty("--hub-y", "50%");
      });

    }

    hub.addEventListener("click", event => {
      if (event.target.closest(".mk-hub-plus")) return;
      launchDownloadPulse(event, hub);
    });

    const plus = hub.querySelector(".mk-hub-plus");
    if (plus) {
      const activate = event => {
        event.preventDefault();
        event.stopPropagation();
        launchCurrencyPortal(event, hub);
      };

      plus.addEventListener("click", activate);
      plus.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") activate(event);
      });
    }

    bindCheckoutTransition();
  }

  window.mkLaunchCurrencyPortal = launchCurrencyPortal;
  window.mkLaunchCheckoutPortal = launchCheckoutPortal;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();

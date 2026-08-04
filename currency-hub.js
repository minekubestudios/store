"use strict";

/*
 * Minekube Store — interakce hlavního tlačítka měn
 * Procedurální VFX vrstva inspirovaná STORE tlačítkem na hlavním webu.
 * Nemění nákupní logiku ani modály; pouze řídí blesky, částice a pulz.
 */

(function () {
  const hub = document.querySelector("#currencyHubButton");
  if (!hub) return;

  const plus = hub.querySelector(".mk-hub-plus");
  const particleLayer = hub.querySelector(".mk-back-particles");
  const boltNodes = Array.from(hub.querySelectorAll("[data-bolt]"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let pulseTimer = 0;
  let boltTimer = 0;
  let particleTimer = 0;
  let burstTimer = 0;
  let lastPulseAt = 0;
  let vfxActive = false;

  const palette = ["#22eaff", "#397cff", "#8b4cff", "#ff36c8", "#ffb52f", "#ffd04a"];
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const random = (min, max) => Math.random() * (max - min) + min;

  const boltConfigs = {
    "left-a": { side: "left", y: 38, amplitude: 14, segments: 7 },
    "left-b": { side: "left", branch: true, y: 48, lengthMin: 54, lengthMax: 78, rise: -5 },
    "right-a": { side: "right", y: 38, amplitude: 14, segments: 7 },
    "right-b": { side: "right", branch: true, y: 48, lengthMin: 54, lengthMax: 78, rise: -5 },
    "left-branch": { side: "left", branch: true, y: 30, lengthMin: 34, lengthMax: 52, rise: -18 },
    "right-branch": { side: "right", branch: true, y: 30, lengthMin: 34, lengthMax: 52, rise: -18 }
  };

  function buildMainBolt(config, burst = false) {
    const startX = config.side === "left" ? 130 : 2;
    const endX = config.side === "left" ? 2 : 130;
    const points = [];
    const amplitude = config.amplitude * (burst ? 1.32 : 1);

    let previousY = config.y + random(-2, 2);
    let progress = 0;

    for (let index = 0; index <= config.segments; index += 1) {
      if (index === config.segments) progress = 1;
      else if (index > 0) progress = Math.min(.94, progress + random(.09, .18));

      const x = startX + (endX - startX) * progress;
      const edgeFactor = Math.sin(progress * Math.PI);
      const correction = (config.y - previousY) * random(.18, .42);
      const impulse = index === 0 || index === config.segments
        ? random(-1.2, 1.2)
        : random(-amplitude, amplitude) * edgeFactor;
      previousY = clamp(previousY + correction + impulse, config.y - amplitude * 1.2, config.y + amplitude * 1.2);
      points.push(`${index === 0 ? "M" : "L"}${x.toFixed(1)} ${previousY.toFixed(1)}`);
    }

    return points.join(" ");
  }

  function buildBranchBolt(config, burst = false) {
    const left = config.side === "left";
    const originX = left ? random(67, 98) : random(34, 65);
    const direction = left ? -1 : 1;
    const branchLength = burst ? random((config.lengthMin || 34) * 1.2, (config.lengthMax || 52) * 1.25) : random(config.lengthMin || 30, config.lengthMax || 46);
    const baseY = config.y + random(-7, 7);
    const rise = config.rise || -10;
    const points = [
      [originX, baseY],
      [originX + direction * branchLength * .22, clamp(baseY + rise * .35 + random(-8, 7), 4, 72)],
      [originX + direction * branchLength * .47, clamp(baseY + rise * .12 + random(-9, 9), 4, 72)],
      [originX + direction * branchLength * .73, clamp(baseY + rise * .72 + random(-7, 7), 4, 72)],
      [originX + direction * branchLength, clamp(baseY + rise + random(-6, 6), 4, 72)]
    ];

    return points.map((point, index) => `${index === 0 ? "M" : "L"}${point[0].toFixed(1)} ${point[1].toFixed(1)}`).join(" ");
  }

  function renderBolts(burst = false) {
    const paths = new Map();

    boltNodes.forEach(node => {
      const key = node.dataset.bolt;
      if (!paths.has(key)) {
        const config = boltConfigs[key];
        if (!config) return;
        paths.set(key, config.branch ? buildBranchBolt(config, burst) : buildMainBolt(config, burst));
      }
      node.setAttribute("d", paths.get(key));
    });
  }

  function spawnParticles(amount = 8, burst = false) {
    if (!particleLayer || reducedMotion.matches) return;

    for (let index = 0; index < amount; index += 1) {
      const node = document.createElement("i");
      const typeRoll = Math.random();
      const side = Math.random() < .5 ? -1 : 1;
      const vertical = random(-1, 1);
      const distanceX = random(burst ? 72 : 42, burst ? 145 : 92) * side;
      const distanceY = vertical * random(burst ? 35 : 18, burst ? 86 : 58);
      const color = palette[Math.floor(Math.random() * palette.length)];

      node.className = "mk-vfx-particle";
      if (typeRoll < .23) node.classList.add("is-spark");
      else if (typeRoll < .5) node.classList.add("is-shard");

      node.style.left = `${random(28, 72).toFixed(1)}%`;
      node.style.top = `${random(24, 76).toFixed(1)}%`;
      node.style.setProperty("--fx-x", `${distanceX.toFixed(1)}px`);
      node.style.setProperty("--fx-y", `${distanceY.toFixed(1)}px`);
      node.style.setProperty("--fx-size", `${random(typeRoll < .23 ? 4 : 2.7, typeRoll < .23 ? 8 : 6.8).toFixed(1)}px`);
      node.style.setProperty("--fx-duration", `${Math.round(random(burst ? 540 : 620, burst ? 880 : 1050))}ms`);
      node.style.setProperty("--fx-delay", `${Math.round(random(0, burst ? 90 : 55))}ms`);
      node.style.setProperty("--fx-rotation", `${Math.round(random(-220, 220))}deg`);
      node.style.setProperty("--fx-color", color);
      particleLayer.appendChild(node);

      node.addEventListener("animationend", () => node.remove(), { once: true });
      window.setTimeout(() => node.remove(), 1300);
    }
  }

  function startVfx() {
    if (reducedMotion.matches || vfxActive) return;
    vfxActive = true;
    renderBolts();
    spawnParticles(30);
    window.clearInterval(boltTimer);
    window.clearInterval(particleTimer);
    boltTimer = window.setInterval(() => renderBolts(false), 105);
    particleTimer = window.setInterval(() => spawnParticles(7), 125);
  }

  function stopVfx() {
    vfxActive = false;
    window.clearInterval(boltTimer);
    window.clearInterval(particleTimer);
    boltTimer = 0;
    particleTimer = 0;
  }

  function lightningBurst() {
    if (reducedMotion.matches) return;
    spawnParticles(42, true);
    window.clearInterval(burstTimer);
    let frames = 0;
    renderBolts(true);
    burstTimer = window.setInterval(() => {
      renderBolts(true);
      frames += 1;
      if (frames >= 8) {
        window.clearInterval(burstTimer);
        burstTimer = 0;
      }
    }, 52);
  }

  function pulse() {
    const now = performance.now();
    if (now - lastPulseAt < 180) return;
    lastPulseAt = now;

    window.clearTimeout(pulseTimer);
    hub.classList.remove("is-charged");
    void hub.offsetWidth;
    hub.classList.add("is-charged");
    lightningBurst();

    hub.querySelectorAll(".ow-currency-hub-segment").forEach((segment, index) => {
      window.setTimeout(() => {
        segment.classList.add("is-flash");
        window.setTimeout(() => segment.classList.remove("is-flash"), 380);
      }, index * 62);
    });

    pulseTimer = window.setTimeout(() => hub.classList.remove("is-charged"), 980);
  }

  function openCurrencySelector() {
    pulse();
    window.setTimeout(() => {
      if (typeof window.mkOpenCurrencyTopup === "function") {
        window.mkOpenCurrencyTopup();
        return;
      }

      const modal = document.querySelector("#currencySelectModal");
      if (modal && typeof window.mkOpenModal === "function") window.mkOpenModal(modal);
    }, 460);
  }

  renderBolts();

  if (!reducedMotion.matches) {
    hub.addEventListener("pointermove", event => {
      const rect = hub.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      hub.style.setProperty("--hub-x", `${(x * 100).toFixed(2)}%`);
      hub.style.setProperty("--hub-y", `${(y * 100).toFixed(2)}%`);
    });

    hub.addEventListener("pointerenter", startVfx);
    hub.addEventListener("pointerleave", () => {
      stopVfx();
      hub.style.setProperty("--hub-x", "50%");
      hub.style.setProperty("--hub-y", "50%");
    });
    hub.addEventListener("focusin", startVfx);
    hub.addEventListener("focusout", stopVfx);
  }

  hub.addEventListener("pointerdown", pulse);

  if (plus) {
    const activate = event => {
      event.preventDefault();
      event.stopPropagation();
      openCurrencySelector();
    };

    plus.addEventListener("click", activate);
    plus.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") activate(event);
    });
  }
})();

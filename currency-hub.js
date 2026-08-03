"use strict";

/*
 * Minekube Store — interakce hlavního tlačítka měn
 * Vzhled je nyní shodný s tlačítkem STORE na hlavním webu. Skript pouze
 * spouští jemný pulz, udržuje světelný bod pod kurzorem a zachovává
 * samostatnou funkci pravého pluska. Otevírání modálů dál řeší původní
 * Store logika v app.js.
 */

(function () {
  const hub = document.querySelector("#currencyHubButton");
  if (!hub) return;

  const plus = hub.querySelector(".mk-hub-plus");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let pulseTimer = 0;

  function pulse() {
    window.clearTimeout(pulseTimer);
    hub.classList.remove("is-charged");
    void hub.offsetWidth;
    hub.classList.add("is-charged");

    hub.querySelectorAll(".ow-currency-hub-segment").forEach((segment, index) => {
      window.setTimeout(() => {
        segment.classList.add("is-flash");
        window.setTimeout(() => segment.classList.remove("is-flash"), 380);
      }, index * 70);
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

  if (!reducedMotion.matches) {
    hub.addEventListener("pointermove", event => {
      const rect = hub.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      hub.style.setProperty("--hub-x", `${(x * 100).toFixed(2)}%`);
      hub.style.setProperty("--hub-y", `${(y * 100).toFixed(2)}%`);
    });

    hub.addEventListener("pointerleave", () => {
      hub.style.setProperty("--hub-x", "50%");
      hub.style.setProperty("--hub-y", "50%");
    });
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

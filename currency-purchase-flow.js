(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let selectedProduct = null;
  let selectedOptions = null;
  let selectedPayment = "paypal";
  let flightBusy = false;

  function formatMoney(value) {
    if (window.MINEKUBE_FX?.format) return window.MINEKUBE_FX.format(value);
    return new Intl.NumberFormat("cs-CZ", {
      style: "currency",
      currency: "CZK",
      maximumFractionDigits: Number(value) % 1 ? 2 : 0
    }).format(Number(value) || 0);
  }

  function amountLabel(product) {
    return new Intl.NumberFormat("cs-CZ").format(Number(product?.currencyAmount) || 0);
  }

  function currencyMeta(product) {
    const mythic = product?.currencyType === "mythic";
    return {
      mythic,
      name: mythic ? "Mythic Prisms" : "Premium Coins",
      short: mythic ? "MYTHIC PRISMS" : "PREMIUM COINS",
      icon: mythic
        ? '<i class="ow-currency-gem" aria-hidden="true"></i>'
        : '<i class="ow-currency-coin" aria-hidden="true">M</i>'
    };
  }

  function ensureModal() {
    let modal = document.querySelector("#currencyPurchaseModal");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.id = "currencyPurchaseModal";
    modal.className = "store-modal-shell currency-purchase-shell";
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "currencyPurchaseTitle");
    modal.innerHTML = `
      <div class="currency-purchase-backdrop" aria-hidden="true">
        <i></i><i></i><i></i><i></i><span></span><span></span>
      </div>
      <div class="currency-purchase-stage">
        <button class="currency-purchase-close" type="button" data-currency-purchase-close aria-label="Zavřít objednávku">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"></path></svg>
        </button>
        <header class="currency-purchase-header">
          <span class="currency-purchase-kicker"><i></i> PŘÍMÝ NÁKUP HERNÍ MĚNY</span>
          <h2 id="currencyPurchaseTitle">Tvoje <span>objednávka</span></h2>
          <p>Jeden balíček. Jedna přehledná objednávka. Bez košíku a zbytečných kroků.</p>
          <div class="currency-purchase-progress" aria-label="Průběh objednávky">
            <span class="is-active" data-purchase-step-indicator="1"><b>1</b> Balíček</span>
            <i></i>
            <span data-purchase-step-indicator="2"><b>2</b> Platba</span>
          </div>
        </header>
        <div class="currency-purchase-content" id="currencyPurchaseContent"></div>
      </div>`;
    document.body.appendChild(modal);

    modal.addEventListener("click", event => {
      if (event.target.closest("[data-currency-purchase-close]")) {
        closePurchase();
        return;
      }

      const continueButton = event.target.closest("[data-currency-purchase-continue]");
      if (continueButton) {
        showPaymentStep();
        return;
      }

      const backButton = event.target.closest("[data-currency-purchase-back]");
      if (backButton) {
        showSummaryStep({ reverse: true });
        return;
      }

      const paymentButton = event.target.closest("[data-currency-payment]");
      if (paymentButton) {
        selectedPayment = paymentButton.dataset.currencyPayment;
        modal.querySelectorAll("[data-currency-payment]").forEach(button => {
          const active = button === paymentButton;
          button.classList.toggle("is-selected", active);
          button.setAttribute("aria-pressed", String(active));
        });
        updatePaymentAction();
        return;
      }

      const finishButton = event.target.closest("[data-currency-payment-finish]");
      if (finishButton) {
        finishButton.classList.remove("is-confirmed");
        void finishButton.offsetWidth;
        finishButton.classList.add("is-confirmed");
        const title = selectedPayment === "card" ? "Platba kartou" : "Platba přes PayPal";
        window.mkToast?.(title, "Design platebního kroku je připravený. Skutečné propojení doplníme až po dokončení Store.");
      }
    });

    return modal;
  }

  function selectedCardMarkup(product, { awaitFlight = false } = {}) {
    const meta = currencyMeta(product);
    const bonus = String(product?.bonusLabel || "").trim();
    const subscribed = selectedOptions?.billing === "subscription";
    return `
      <article class="currency-selected-pack ${meta.mythic ? "is-mythic" : "is-premium"} ${awaitFlight ? "is-awaiting-flight" : "is-arrived"}" data-selected-product-card>
        <div class="currency-selected-visual">
          <span class="currency-selected-pattern" aria-hidden="true"></span>
          <span class="currency-selected-glow" aria-hidden="true"></span>
          <div class="currency-selected-emblem">${meta.icon}</div>
          <div class="currency-selected-amount">${meta.icon}<strong>${amountLabel(product)}</strong></div>
          ${bonus ? `<span class="currency-selected-bonus">${bonus}</span>` : ""}
        </div>
        <div class="currency-selected-copy">
          <small>${subscribed ? "MĚSÍČNÍ PŘEDPLATNÉ" : "JEDNORÁZOVÉ DOBITÍ"}</small>
          <h3>${amountLabel(product)} ${meta.name}</h3>
          <p>${subscribed ? "Balíček se obnoví každých 30 dní." : "Vybraný balíček bude po úspěšné platbě připravený k připsání."}</p>
          <strong>${formatMoney(product?.price)}${subscribed ? " / měsíc" : ""}</strong>
        </div>
      </article>`;
  }

  function showSummaryStep({ reverse = false, awaitFlight = false } = {}) {
    const modal = ensureModal();
    const content = modal.querySelector("#currencyPurchaseContent");
    if (!selectedProduct || !content) return;
    const meta = currencyMeta(selectedProduct);

    modal.dataset.purchaseStep = "summary";
    modal.dataset.currencyType = meta.mythic ? "mythic" : "premium";
    modal.querySelectorAll("[data-purchase-step-indicator]").forEach((node, index) => {
      node.classList.toggle("is-active", index === 0);
      node.classList.toggle("is-complete", false);
    });

    const render = () => {
      content.innerHTML = `
        <section class="currency-purchase-summary ${reverse ? "is-reverse" : ""}">
          <div class="currency-purchase-product-slot" id="currencyPurchaseProductSlot">
            ${selectedCardMarkup(selectedProduct, { awaitFlight })}
          </div>
          <div class="currency-purchase-order-panel">
            <span class="currency-order-label"><i></i> VYBRANÝ BALÍČEK</span>
            <h3>Pokračovat k objednávce?</h3>
            <p>Balíček zůstane samostatný a nebude se přidávat do žádného košíku.</p>
            <dl>
              <div><dt>Měna</dt><dd>${meta.icon}${meta.name}</dd></div>
              <div><dt>Množství</dt><dd>${amountLabel(selectedProduct)}</dd></div>
              <div><dt>Typ nákupu</dt><dd>${selectedOptions?.billing === "subscription" ? "Měsíční předplatné" : "Jednorázový nákup"}</dd></div>
              <div class="is-total"><dt>Celkem</dt><dd>${formatMoney(selectedProduct.price)}</dd></div>
            </dl>
            <button class="currency-purchase-primary" type="button" data-currency-purchase-continue>
              <span><small>POKRAČOVAT</small><strong>K objednávce a platbě</strong></span>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>
            </button>
            <small class="currency-purchase-note">Platební funkce zatím zůstává beze změny a není do tohoto designového kroku přepojená.</small>
          </div>
        </section>`;
      content.classList.remove("is-changing");
      requestAnimationFrame(() => content.classList.add("is-visible"));
    };

    if (content.children.length) {
      content.classList.add("is-changing");
      window.setTimeout(render, 160);
    } else {
      render();
    }
  }

  function paymentIcon(type) {
    if (type === "card") {
      return `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="7" width="26" height="18" rx="3"></rect><path d="M3 12h26M8 20h6"></path></svg>`;
    }
    return `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M12 5h9c5 0 7 2 6 7-1 6-5 8-11 8h-3l-2 7H6l5-22Z"></path><path d="M13 9h7c2.5 0 3.8 1 3.2 3.3-.5 2.5-2.3 3.7-5.5 3.7h-4.2"></path></svg>`;
  }

  function showPaymentStep() {
    const modal = ensureModal();
    const content = modal.querySelector("#currencyPurchaseContent");
    if (!selectedProduct || !content) return;
    const meta = currencyMeta(selectedProduct);

    modal.dataset.purchaseStep = "payment";
    modal.querySelectorAll("[data-purchase-step-indicator]").forEach((node, index) => {
      node.classList.toggle("is-active", index === 1);
      node.classList.toggle("is-complete", index === 0);
    });

    content.classList.add("is-changing");
    window.setTimeout(() => {
      content.innerHTML = `
        <section class="currency-purchase-payment">
          <aside class="currency-payment-summary">
            <button type="button" data-currency-purchase-back>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"></path></svg>
              Změnit balíček
            </button>
            <div class="currency-payment-mini-card ${meta.mythic ? "is-mythic" : "is-premium"}">
              <span>${meta.icon}</span>
              <div><small>${meta.short}</small><strong>${amountLabel(selectedProduct)}</strong></div>
              <b>${formatMoney(selectedProduct.price)}</b>
            </div>
            <div class="currency-payment-security">
              <i aria-hidden="true"></i>
              <div><strong>Zabezpečená objednávka</strong><span>Platební propojení zůstává nedotčené a doplní se až ve finální fázi.</span></div>
            </div>
          </aside>
          <div class="currency-payment-panel">
            <span class="currency-order-label"><i></i> ZPŮSOB PLATBY</span>
            <h3>Jak chceš zaplatit?</h3>
            <p>Vyber pouze jednu platební metodu. Žádné další kroky ani košík.</p>
            <div class="currency-payment-methods" role="group" aria-label="Výběr platební metody">
              <button class="currency-payment-method" type="button" data-currency-payment="card" aria-pressed="false">
                <span class="currency-payment-method-icon">${paymentIcon("card")}</span>
                <span><small>PLATEBNÍ KARTA</small><strong>Karta</strong><p>Visa, Mastercard a další podporované karty.</p></span>
                <i class="currency-payment-check"></i>
              </button>
              <button class="currency-payment-method is-selected" type="button" data-currency-payment="paypal" aria-pressed="true">
                <span class="currency-payment-method-icon is-paypal">${paymentIcon("paypal")}</span>
                <span><small>RYCHLÁ PLATBA</small><strong>PayPal</strong><p>Přihlášení a potvrzení v zabezpečeném okně PayPal.</p></span>
                <i class="currency-payment-check"></i>
              </button>
            </div>
            <button class="currency-purchase-primary currency-payment-finish" type="button" data-currency-payment-finish>
              <span><small>VYBRANÁ METODA</small><strong id="currencyPaymentActionLabel">Pokračovat přes PayPal</strong></span>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>
            </button>
          </div>
        </section>`;
      content.classList.remove("is-changing");
      requestAnimationFrame(() => content.classList.add("is-visible"));
      updatePaymentAction();
    }, 180);
  }

  function updatePaymentAction() {
    const label = document.querySelector("#currencyPaymentActionLabel");
    if (label) label.textContent = selectedPayment === "card" ? "Pokračovat platbou kartou" : "Pokračovat přes PayPal";
  }

  function animateCardToModal(sourceCard, modal) {
    const target = modal.querySelector("[data-selected-product-card]");
    if (!sourceCard || !target || reducedMotion.matches) {
      target?.classList.remove("is-awaiting-flight");
      target?.classList.add("is-arrived");
      return Promise.resolve();
    }

    const from = sourceCard.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    if (!from.width || !from.height || !to.width || !to.height) {
      target.classList.remove("is-awaiting-flight");
      target.classList.add("is-arrived");
      return Promise.resolve();
    }

    const clone = sourceCard.cloneNode(true);
    clone.classList.add("currency-purchase-flight-card");
    clone.setAttribute("aria-hidden", "true");
    Object.assign(clone.style, {
      position: "fixed",
      left: `${from.left}px`,
      top: `${from.top}px`,
      width: `${from.width}px`,
      height: `${from.height}px`,
      margin: "0",
      zIndex: "10050",
      pointerEvents: "none",
      transformOrigin: "top left"
    });
    document.body.appendChild(clone);
    target.classList.add("is-awaiting-flight");

    const dx = to.left - from.left;
    const dy = to.top - from.top;
    const sx = to.width / from.width;
    const sy = to.height / from.height;

    const animation = clone.animate([
      { transform: "translate3d(0,0,0) scale(1)", filter: "brightness(1) saturate(1)", opacity: 1 },
      { transform: `translate3d(${dx * .42}px, ${dy * .18 - 28}px, 0) scale(${1 + (sx - 1) * .24}, ${1 + (sy - 1) * .24}) rotate(-1.2deg)`, filter: "brightness(1.28) saturate(1.24)", opacity: 1, offset: .38 },
      { transform: `translate3d(${dx}px, ${dy}px, 0) scale(${sx}, ${sy}) rotate(0deg)`, filter: "brightness(1.08) saturate(1.08)", opacity: 1 }
    ], {
      duration: 760,
      easing: "cubic-bezier(.18,.82,.18,1)",
      fill: "forwards"
    });

    return animation.finished.catch(() => {}).then(() => {
      clone.remove();
      target.classList.remove("is-awaiting-flight");
      target.classList.add("is-arrived");
    });
  }

  function closePurchase() {
    const modal = document.querySelector("#currencyPurchaseModal");
    if (!modal) return;
    if (typeof window.mkCloseModal === "function") window.mkCloseModal(modal);
    else {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
    }
    selectedProduct = null;
    selectedOptions = null;
    selectedPayment = "paypal";
    flightBusy = false;
  }

  async function openCurrencyPurchase(product, sourceCard, options = {}) {
    if (!product || flightBusy) return;
    flightBusy = true;
    selectedProduct = product;
    selectedOptions = options;
    selectedPayment = "paypal";

    const modal = ensureModal();
    modal.dataset.currencyType = product.currencyType === "mythic" ? "mythic" : "premium";
    showSummaryStep({ awaitFlight: true });

    if (typeof window.mkOpenModal === "function") window.mkOpenModal(modal);
    else {
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
    }

    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const flight = animateCardToModal(sourceCard, modal);

    const packsModal = document.querySelector("#currencyPacksModal");
    if (packsModal && typeof window.mkCloseModal === "function") {
      window.mkCloseModal(packsModal, { restoreFocus: false });
    } else if (packsModal) {
      packsModal.classList.remove("is-open");
      packsModal.setAttribute("aria-hidden", "true");
    }

    await flight;
    modal.classList.add("is-ready");
    flightBusy = false;
  }

  window.mkOpenCurrencyPurchase = openCurrencyPurchase;
  window.mkCloseCurrencyPurchase = closePurchase;

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && document.querySelector("#currencyPurchaseModal.is-open")) closePurchase();
  });

  document.documentElement.classList.add("currency-direct-purchase-enabled");
})();

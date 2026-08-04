(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const state = {
    product: null,
    options: { billing: "onetime" },
    payment: "paypal",
    consents: { terms: false, privacy: false },
    quickPurchase: false,
    quantity: 1,
    sourceCard: null,
    busy: false,
    renderToken: 0,
    errorTimer: 0
  };

  const ICONS = {
    wallet: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7.5h14a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h12"></path><path d="M20 11h-5a2 2 0 0 0 0 4h5"></path><circle cx="15" cy="13" r=".75"></circle></svg>',
    card: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="7" width="26" height="18" rx="3"></rect><path d="M3 12h26M8 20h6"></path></svg>',
    paypal: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M12 5h9c5 0 7 2 6 7-1 6-5 8-11 8h-3l-2 7H6l5-22Z"></path><path d="M13 9h7c2.5 0 3.8 1 3.2 3.3-.5 2.5-2.3 3.7-5.5 3.7h-4.2"></path></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"></path></svg>',
    chevron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 10 4 4 4-4"></path></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>',
    back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"></path></svg>',
    shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z"></path><path d="m9 12 2 2 4-4"></path></svg>',
    info: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 11v5M12 8h.01"></path></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"></path></svg>'
  };

  function formatMoney(value) {
    if (window.MINEKUBE_FX?.format) return window.MINEKUBE_FX.format(value);
    return new Intl.NumberFormat("cs-CZ", {
      style: "currency",
      currency: "CZK",
      maximumFractionDigits: Number(value) % 1 ? 2 : 0
    }).format(Number(value) || 0);
  }

  function quantityValue() {
    return Math.max(1, Math.min(99, Number(state.quantity) || 1));
  }

  function amountLabel(product = state.product, quantity = quantityValue()) {
    const amount = (Number(product?.currencyAmount) || 0) * Math.max(1, Number(quantity) || 1);
    return new Intl.NumberFormat("cs-CZ").format(amount);
  }

  function totalPrice(product = state.product, quantity = quantityValue()) {
    return (Number(product?.price) || 0) * Math.max(1, Number(quantity) || 1);
  }

  function readPlayer() {
    const direct = String(window.MINEKUBE_PROFILE?.player || "").trim();
    if (direct) return direct;
    try {
      const stored = JSON.parse(localStorage.getItem("minekube-store-player") || '""');
      return typeof stored === "string" ? stored.trim() : "";
    } catch {
      return "";
    }
  }

  function currencyMeta(product = state.product) {
    const mythic = product?.currencyType === "mythic";
    return {
      mythic,
      type: mythic ? "mythic" : "premium",
      name: mythic ? "Mythic Prisms" : "Premium Coins",
      short: mythic ? "MYTHIC PRISMS" : "PREMIUM COINS",
      verb: state.options.billing === "subscription" ? "Předplatit" : "Dobít",
      accent: mythic ? "#2bf2ff" : "#ffb323",
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
      <div class="currency-purchase-backdrop" aria-hidden="true"><i></i><i></i><i></i></div>
      <section class="currency-purchase-window" data-purchase-window>
        <header class="currency-purchase-topbar">
          <div class="currency-purchase-brand">
            <span class="currency-purchase-wallet">${ICONS.wallet}</span>
            <div class="currency-purchase-brand-content">
              <small>PŘÍMÝ NÁKUP HERNÍ MĚNY</small>
              <h2 id="currencyPurchaseTitle"><span data-purchase-verb>Dobít</span> <b data-purchase-currency-title>Premium Coins</b></h2>
              <div class="currency-purchase-inline-controls">
                <div class="currency-purchase-billing" role="group" aria-label="Typ nákupu">
                  <button type="button" data-purchase-billing="onetime" aria-pressed="true">Jednorázově</button>
                  <button type="button" data-purchase-billing="subscription" aria-pressed="false">Měsíčně</button>
                </div>
                <div class="currency-purchase-quantity" aria-label="Počet balíčků">
                  <span>Počet balíčků</span>
                  <div>
                    <button type="button" data-purchase-quantity="-1" aria-label="Odebrat jeden balíček">−</button>
                    <b data-purchase-quantity-value>1</b>
                    <button type="button" data-purchase-quantity="1" aria-label="Přidat jeden balíček">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="currency-purchase-top-actions">
            <button class="currency-purchase-currency" type="button" aria-label="Měna platby: česká koruna">
              CZK ${ICONS.chevron}
            </button>
            <button class="currency-purchase-close" type="button" data-currency-purchase-close aria-label="Zavřít objednávku">${ICONS.close}</button>
          </div>
        </header>

        <div class="currency-purchase-scroll" data-purchase-scroll>

          <section class="currency-purchase-section currency-payment-section">
            <h3><span>1.</span> Vyber platební metodu</h3>
            <div class="currency-payment-methods" role="group" aria-label="Výběr platební metody">
              <button class="currency-payment-method" type="button" data-currency-payment="card" aria-pressed="false">
                <span class="currency-payment-logo is-card">${ICONS.card}</span>
                <span><strong>Platba kartou</strong><small>Visa / Mastercard</small></span>
                <i class="currency-payment-check">${ICONS.check}</i>
              </button>
              <button class="currency-payment-method is-selected" type="button" data-currency-payment="paypal" aria-pressed="true">
                <span class="currency-payment-logo is-paypal">${ICONS.paypal}</span>
                <span><strong>PayPal</strong><small>Zabezpečená platba PayPal</small></span>
                <i class="currency-payment-check">${ICONS.check}</i>
              </button>
            </div>
          </section>

          <section class="currency-purchase-section currency-package-section">
            <div class="currency-purchase-section-head">
              <h3><span>2.</span> Zkontroluj vybraný balíček</h3>
              <button type="button" class="currency-change-pack" data-currency-purchase-back>${ICONS.back} Změnit balíček</button>
            </div>
            <div class="currency-purchase-package-grid">
              <div class="currency-purchase-product-slot" data-purchase-product-slot></div>
              <div class="currency-order-summary" data-purchase-order-summary></div>
            </div>
          </section>
        </div>

        <footer class="currency-purchase-footer">
          <div class="currency-purchase-footer-row">
            <div class="currency-purchase-consents">
              <label><input type="checkbox" data-purchase-consent="terms"><span>${ICONS.check}</span> Souhlasím s <b>obchodními podmínkami</b></label>
              <label><input type="checkbox" data-purchase-consent="privacy"><span>${ICONS.check}</span> Souhlasím se <b>zpracováním osobních údajů</b></label>
            </div>
            <div class="currency-purchase-total">
              <span><small>CELKEM</small><strong data-purchase-total>0 Kč</strong></span>
              <button class="currency-purchase-submit" type="button" data-currency-payment-finish aria-disabled="true">
                <span class="currency-purchase-submit-icon">${ICONS.wallet}</span>
                <span><small data-purchase-submit-kicker>PAYPAL</small><strong data-purchase-submit-label>Pokračovat k platbě</strong></span>
                ${ICONS.arrow}
              </button>
            </div>
          </div>
        </footer>
      </section>

      <div class="currency-purchase-validation" role="status" aria-live="polite" data-purchase-validation>
        ${ICONS.info}<span></span>
      </div>

      <div class="currency-confirm-layer" aria-hidden="true" data-purchase-confirm-layer>
        <section class="currency-confirm-card" role="alertdialog" aria-modal="true" aria-labelledby="currencyConfirmTitle">
          <header>
            <span>${ICONS.wallet}</span>
            <div><small>POSLEDNÍ KROK</small><h3 id="currencyConfirmTitle">Potvrdit nákup?</h3></div>
          </header>
          <p data-purchase-confirm-copy></p>
          <label class="currency-quick-purchase">
            <span><strong>Rychlý nákup</strong><small>Příště tento potvrzovací krok přeskočit.</small></span>
            <input type="checkbox" data-purchase-quick>
            <i></i>
          </label>
          <footer>
            <button type="button" data-purchase-confirm-cancel>Ještě ne</button>
            <button type="button" data-purchase-confirm>${ICONS.wallet}<span>Potvrdit nákup</span></button>
          </footer>
        </section>
      </div>`;
    document.body.appendChild(modal);

    modal.addEventListener("click", onModalClick);
    modal.addEventListener("change", onModalChange);
    return modal;
  }

  function selectedCardMarkup(product, { awaitingFlight = false } = {}) {
    const meta = currencyMeta(product);
    const bonus = String(product?.bonusLabel || "").trim();
    const subscribed = state.options.billing === "subscription";
    return `
      <article class="currency-selected-pack ${meta.mythic ? "is-mythic" : "is-premium"} ${awaitingFlight ? "is-awaiting-flight" : "is-arrived"}" data-selected-product-card>
        <div class="currency-selected-art">
          <span class="currency-selected-stars" aria-hidden="true"></span>
          <span class="currency-selected-emblem">${meta.icon}</span>
          <strong class="currency-selected-amount">${meta.icon}<b>${amountLabel(product)}</b></strong>
          ${bonus ? `<small class="currency-selected-bonus">${bonus}</small>` : ""}
        </div>
        <div class="currency-selected-copy">
          <small>${subscribed ? "MĚSÍČNÍ PŘEDPLATNÉ" : "JEDNORÁZOVÉ DOBITÍ"}</small>
          <h4>${amountLabel(product)} ${meta.name}</h4>
          <p>${quantityValue() > 1 ? `${quantityValue()}× vybraný balíček. ` : ""}${subscribed ? "Balíček se připíše každých 30 dní. Předplatné lze později zrušit." : "Herní měna bude po úspěšné platbě připravena k připsání na účet."}</p>
          <strong>${formatMoney(totalPrice(product))}${subscribed ? " / měsíc" : ""}</strong>
        </div>
      </article>`;
  }

  function renderPurchase({ awaitingFlight = false } = {}) {
    const modal = ensureModal();
    if (!state.product) return;
    const meta = currencyMeta();
    const player = readPlayer();

    modal.dataset.currencyType = meta.type;
    modal.querySelector("[data-purchase-verb]").textContent = meta.verb;
    modal.querySelector("[data-purchase-currency-title]").textContent = meta.name;

    modal.querySelectorAll("[data-purchase-billing]").forEach(button => {
      const active = button.dataset.purchaseBilling === state.options.billing;
      button.classList.toggle("is-selected", active);
      button.setAttribute("aria-pressed", String(active));
    });

    modal.querySelectorAll("[data-currency-payment]").forEach(button => {
      const active = button.dataset.currencyPayment === state.payment;
      button.classList.toggle("is-selected", active);
      button.setAttribute("aria-pressed", String(active));
    });

    const quantity = quantityValue();
    modal.querySelectorAll("[data-purchase-quantity-value]").forEach(node => { node.textContent = String(quantity); });
    modal.querySelectorAll("[data-purchase-quantity]").forEach(button => {
      const delta = Number(button.dataset.purchaseQuantity) || 0;
      const disabled = (delta < 0 && quantity <= 1) || (delta > 0 && quantity >= 99);
      button.disabled = disabled;
      button.setAttribute("aria-disabled", String(disabled));
    });

    const slot = modal.querySelector("[data-purchase-product-slot]");
    if (slot) slot.innerHTML = selectedCardMarkup(state.product, { awaitingFlight });

    const summary = modal.querySelector("[data-purchase-order-summary]");
    if (summary) {
      summary.innerHTML = `
        <span class="currency-order-label"><i></i> OBJEDNÁVKA</span>
        <h4>${state.options.billing === "subscription" ? "Pravidelné dobíjení" : "Okamžité dobití"}</h4>
        <dl>
          <div><dt>Herní měna</dt><dd>${meta.icon}${meta.name}</dd></div>
          <div><dt>Počet balíčků</dt><dd>${quantity}×</dd></div>
          <div><dt>Množství měny</dt><dd>${amountLabel()}</dd></div>
          <div><dt>Typ nákupu</dt><dd>${state.options.billing === "subscription" ? "Každých 30 dní" : "Jednorázově"}</dd></div>
          <div><dt>Příjemce</dt><dd class="${player ? "" : "is-warning"}">${player || "Minecraft účet není nastavený"}</dd></div>
          <div class="is-total"><dt>Celkem</dt><dd>${formatMoney(totalPrice())}${state.options.billing === "subscription" ? " / měsíc" : ""}</dd></div>
        </dl>
        <div class="currency-order-security">${ICONS.shield}<span><strong>Bezpečný postup</strong><small>API, webhooky a PayPal propojení zůstávají v tomto designovém kroku beze změny.</small></span></div>`;
    }

    const total = modal.querySelector("[data-purchase-total]");
    if (total) total.textContent = `${formatMoney(totalPrice())}${state.options.billing === "subscription" ? " / měsíc" : ""}`;
    updateAction();
  }

  function updateAction() {
    const modal = ensureModal();
    const ready = state.consents.terms && state.consents.privacy;
    const kicker = modal.querySelector("[data-purchase-submit-kicker]");
    const label = modal.querySelector("[data-purchase-submit-label]");
    const button = modal.querySelector("[data-currency-payment-finish]");
    if (kicker) kicker.textContent = state.payment === "card" ? "PLATEBNÍ KARTA" : "PAYPAL";
    if (label) label.textContent = state.options.billing === "subscription" ? "Předplatit" : "Pokračovat k platbě";
    if (button) {
      button.classList.toggle("is-ready", ready);
      button.setAttribute("aria-disabled", String(!ready));
    }
  }

  function showValidation(message) {
    const modal = ensureModal();
    const toast = modal.querySelector("[data-purchase-validation]");
    if (!toast) return;
    clearTimeout(state.errorTimer);
    toast.querySelector("span").textContent = message;
    toast.classList.remove("is-visible");
    void toast.offsetWidth;
    toast.classList.add("is-visible");
    state.errorTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3400);
  }

  function openConfirmation() {
    const modal = ensureModal();
    if (!(state.consents.terms && state.consents.privacy)) {
      showValidation("Nejdřív potvrď obchodní podmínky a zpracování osobních údajů.");
      modal.querySelector(".currency-purchase-consents")?.classList.add("is-attention");
      window.setTimeout(() => modal.querySelector(".currency-purchase-consents")?.classList.remove("is-attention"), 780);
      return;
    }

    const meta = currencyMeta();
    const layer = modal.querySelector("[data-purchase-confirm-layer]");
    const copy = modal.querySelector("[data-purchase-confirm-copy]");
    if (copy) {
      copy.innerHTML = `Opravdu chceš ${state.options.billing === "subscription" ? "předplatit" : "zakoupit"} <strong>${quantityValue()}× balíček</strong> v celkové hodnotě <strong>${amountLabel()} ${meta.name}</strong> za <strong>${formatMoney(totalPrice())}${state.options.billing === "subscription" ? " měsíčně" : ""}</strong>?`;
    }
    layer?.classList.add("is-open");
    layer?.setAttribute("aria-hidden", "false");
    window.setTimeout(() => modal.querySelector("[data-purchase-confirm]")?.focus(), 80);
  }

  function closeConfirmation() {
    const layer = ensureModal().querySelector("[data-purchase-confirm-layer]");
    layer?.classList.remove("is-open");
    layer?.setAttribute("aria-hidden", "true");
  }

  function onModalClick(event) {
    if (event.target.closest("[data-currency-purchase-close]")) {
      closePurchase();
      return;
    }

    const billing = event.target.closest("[data-purchase-billing]");
    if (billing) {
      state.options.billing = billing.dataset.purchaseBilling === "subscription" ? "subscription" : "onetime";
      renderPurchase();
      return;
    }

    const payment = event.target.closest("[data-currency-payment]");
    if (payment) {
      state.payment = payment.dataset.currencyPayment === "card" ? "card" : "paypal";
      renderPurchase();
      return;
    }

    const quantityButton = event.target.closest("[data-purchase-quantity]");
    if (quantityButton && !quantityButton.disabled) {
      const delta = Number(quantityButton.dataset.purchaseQuantity) || 0;
      state.quantity = Math.max(1, Math.min(99, quantityValue() + delta));
      const windowNode = ensureModal().querySelector("[data-purchase-window]");
      windowNode?.classList.remove("is-quantity-updated");
      void windowNode?.offsetWidth;
      windowNode?.classList.add("is-quantity-updated");
      renderPurchase();
      window.setTimeout(() => windowNode?.classList.remove("is-quantity-updated"), 420);
      return;
    }

    if (event.target.closest("[data-currency-purchase-back]")) {
      const modal = ensureModal();
      if (typeof window.mkCloseModal === "function") window.mkCloseModal(modal, { restoreFocus: false });
      else modal.classList.remove("is-open");
      const packs = document.querySelector("#currencyPacksModal");
      if (packs) {
        if (typeof window.mkOpenModal === "function") window.mkOpenModal(packs);
        else packs.classList.add("is-open");
      }
      return;
    }

    if (event.target.closest("[data-currency-payment-finish]")) {
      openConfirmation();
      return;
    }

    if (event.target.closest("[data-purchase-confirm-cancel]")) {
      closeConfirmation();
      return;
    }

    if (event.target.closest("[data-purchase-confirm]")) {
      const button = event.target.closest("[data-purchase-confirm]");
      button.classList.remove("is-confirmed");
      void button.offsetWidth;
      button.classList.add("is-confirmed");
      window.setTimeout(() => {
        closeConfirmation();
        window.mkToast?.(
          state.payment === "card" ? "Platba kartou" : "Platba přes PayPal",
          "Nákupní postup je připravený. Skutečné platební propojení zůstalo nedotčené."
        );
      }, reducedMotion.matches ? 0 : 420);
    }
  }

  function onModalChange(event) {
    const consent = event.target.closest("[data-purchase-consent]");
    if (consent) {
      state.consents[consent.dataset.purchaseConsent] = consent.checked;
      updateAction();
      return;
    }
    if (event.target.matches("[data-purchase-quick]")) state.quickPurchase = event.target.checked;
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
    clone.querySelectorAll("[id]").forEach(node => node.removeAttribute("id"));
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
      { transform: `translate3d(${dx * .46}px, ${dy * .25 - 24}px, 0) scale(${1 + (sx - 1) * .34}, ${1 + (sy - 1) * .34}) rotate(-.8deg)`, filter: "brightness(1.3) saturate(1.25)", opacity: 1, offset: .42 },
      { transform: `translate3d(${dx}px, ${dy}px, 0) scale(${sx}, ${sy}) rotate(0deg)`, filter: "brightness(1.04) saturate(1.05)", opacity: 1 }
    ], { duration: 720, easing: "cubic-bezier(.18,.82,.18,1)", fill: "forwards" });

    return animation.finished.catch(() => {}).then(() => {
      clone.remove();
      target.classList.remove("is-awaiting-flight");
      target.classList.add("is-arrived");
    });
  }

  function resetInteractiveState() {
    state.payment = "paypal";
    state.consents = { terms: false, privacy: false };
    state.quickPurchase = false;
    const modal = ensureModal();
    modal.querySelectorAll("[data-purchase-consent], [data-purchase-quick]").forEach(input => { input.checked = false; });
    closeConfirmation();
    modal.querySelector("[data-purchase-validation]")?.classList.remove("is-visible");
  }

  function closePurchase() {
    const modal = document.querySelector("#currencyPurchaseModal");
    if (!modal) return;
    state.renderToken += 1;
    clearTimeout(state.errorTimer);
    closeConfirmation();
    if (typeof window.mkCloseModal === "function") window.mkCloseModal(modal);
    else {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
    }
    modal.classList.remove("is-ready");
    state.product = null;
    state.sourceCard = null;
    state.busy = false;
  }

  async function openCurrencyPurchase(product, sourceCard, options = {}) {
    if (!product || state.busy) return;
    state.busy = true;
    state.product = product;
    state.sourceCard = sourceCard || null;
    state.quantity = 1;
    state.options = { billing: options.billing === "subscription" ? "subscription" : "onetime" };
    resetInteractiveState();

    const modal = ensureModal();
    renderPurchase({ awaitingFlight: true });
    modal.querySelector("[data-purchase-scroll]")?.scrollTo({ top: 0, behavior: "auto" });

    if (typeof window.mkOpenModal === "function") window.mkOpenModal(modal);
    else {
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
    }

    const token = ++state.renderToken;
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const flight = animateCardToModal(sourceCard, modal);
    const packsModal = document.querySelector("#currencyPacksModal");
    if (packsModal) {
      if (typeof window.mkCloseModal === "function") window.mkCloseModal(packsModal, { restoreFocus: false });
      else {
        packsModal.classList.remove("is-open");
        packsModal.setAttribute("aria-hidden", "true");
      }
    }

    try {
      await flight;
      if (token !== state.renderToken) return;
      modal.classList.add("is-ready");
      modal.querySelector("[data-currency-purchase-close]")?.focus();
    } finally {
      state.busy = false;
    }
  }

  window.mkOpenCurrencyPurchase = openCurrencyPurchase;
  window.mkCloseCurrencyPurchase = closePurchase;

  document.addEventListener("keydown", event => {
    const modal = document.querySelector("#currencyPurchaseModal.is-open");
    if (!modal || event.key !== "Escape") return;
    if (modal.querySelector("[data-purchase-confirm-layer].is-open")) closeConfirmation();
    else closePurchase();
  });

  document.documentElement.classList.add("currency-direct-purchase-enabled");
})();

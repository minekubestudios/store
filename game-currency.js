"use strict";

/*
 * Minekube Store — ceny v herní měně
 * ----------------------------------
 * Hráč si za skutečné peníze kupuje jen herní měnu (Premium Coins,
 * Mythic Prisms). Všechno ostatní – ranky, klíče, kosmetika, balíčky –
 * se platí touto měnou.
 *
 * Kurzy vycházejí z existujících balíčků měny:
 *   500 Premium Coins  = 126 Kč  →  ~4 coiny za korunu
 *   10 Mythic Prisms   = 249 Kč  →  ~25 Kč za prism
 *
 * Balíčky měny samotné zůstávají v korunách – jsou to jediné produkty,
 * které se kupují za skutečné peníze.
 */

window.MINEKUBE_GAME_CURRENCY = (function () {
  const RATES = {
    premium: { perCzk: 4, step: 50, min: 50 },
    mythic: { czkPer: 24.9, step: 1, min: 1 }
  };

  /** Přepočte cenu v Kč na Premium Coins, zaokrouhleno na hezká čísla. */
  function toCoins(czk) {
    const raw = Number(czk) * RATES.premium.perCzk;
    const rounded = Math.round(raw / RATES.premium.step) * RATES.premium.step;
    return Math.max(RATES.premium.min, rounded);
  }

  /** Přepočte cenu v Kč na Mythic Prisms. */
  function toPrisms(czk) {
    const raw = Number(czk) / RATES.mythic.czkPer;
    const rounded = Math.round(raw / RATES.mythic.step) * RATES.mythic.step;
    return Math.max(RATES.mythic.min, rounded);
  }

  /** Kterou měnou se produkt platí. Balíčky měny zůstávají v Kč. */
  function currencyOf(product) {
    if (!product) return "premium";
    // Vše, co samo o sobě prodává herní měnu, se platí penězi –
    // jinak by hráč kupoval coiny za coiny.
    if (product.currencyOnly || product.category === "currency" || product.currencyType) return "money";
    return isMythic(product) ? "mythic" : "premium";
  }

  function isMythic(product) {
    return product?.currencyType === "mythic"
      || ["elite-30", "legendary-key", "particle-pack", "pet-pack", "mvp-30"].includes(product?.id);
  }

  /** Cena produktu v jeho herní měně. */
  function priceOf(product, czk) {
    const value = czk === undefined ? product?.price : czk;
    const type = currencyOf(product);
    if (type === "mythic") return toPrisms(value);
    if (type === "premium") return toCoins(value);
    return value;
  }

  const NUMBER = new Intl.NumberFormat("cs-CZ");

  /** Naformátuje množství měny s oddělovačem tisíců. */
  function amount(value) {
    return NUMBER.format(Math.round(Number(value) || 0));
  }

  return {
    rates: RATES,
    toCoins,
    toPrisms,
    currencyOf,
    isMythic,
    priceOf,
    amount
  };
})();

"use strict";

const iconPaths = {
  crown: '<path d="m4 8 4 4 4-7 4 7 4-4-2 11H6L4 8Z"></path><path d="M7 19h10"></path>',
  star: '<path d="m12 3 2.6 5.2 5.7.8-4.1 4 1 5.7-5.2-2.7-5.2 2.7 1-5.7-4.1-4 5.7-.8L12 3Z"></path>',
  crystal: '<path d="m12 3 7 5-2.7 10H7.7L5 8l7-5Z"></path><path d="m5 8 7 4 7-4M12 12v9M8 4.8 12 12l4-7.2"></path>',
  key: '<circle cx="8" cy="15" r="4"></circle><path d="m11 12 8-8M15 8l2 2M17 6l2 2"></path>',
  keys: '<circle cx="7" cy="15" r="3.5"></circle><path d="m9.5 12.5 7-7M13 8l2 2M15 6l2 2"></path><circle cx="14.5" cy="15.5" r="2.5"></circle><path d="m16.5 13.5 3.5-3.5"></path>',
  coins: '<ellipse cx="12" cy="6" rx="7" ry="3"></ellipse><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"></path>',
  gift: '<path d="M20 12v8H4v-8M2 8h20v4H2zM12 8v12M12 8H7.5A2.5 2.5 0 1 1 10 5.5L12 8ZM12 8h4.5A2.5 2.5 0 1 0 14 5.5L12 8Z"></path>',
  sword: '<path d="m14 5 5-2-2 5-8 8-3 1 1-3 7-9Z"></path><path d="m5 15 4 4M4 20l2-2"></path>',
  particles: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"></path><circle cx="12" cy="12" r="3"></circle>',
  pet: '<path d="M8 14c-2 0-4-1.3-4-3 0-1.4 1-2.5 2.4-2.5.5 0 1 .2 1.4.5C8 7.3 9.8 6 12 6s4 1.3 4.2 3c.4-.3.9-.5 1.4-.5C19 8.5 20 9.6 20 11c0 1.7-2 3-4 3"></path><path d="M8 14c0 3 1.8 6 4 6s4-3 4-6M9.5 12h.01M14.5 12h.01"></path>',
  shield: '<path d="M12 3 19 6v5c0 4.4-2.7 7.8-7 10-4.3-2.2-7-5.6-7-10V6l7-3Z"></path><path d="m8.5 12 2.2 2.2 4.8-5"></path>',
  cart: '<path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20 7H6"></path><circle cx="10" cy="20" r="1"></circle><circle cx="17" cy="20" r="1"></circle>',
  info: '<circle cx="12" cy="12" r="9"></circle><path d="M12 11v5M12 8h.01"></path>',
  check: '<path d="m5 12 4 4L19 6"></path>',
  trash: '<path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"></path>',
  card: '<rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 10h18M7 15h3"></path>',
  bank: '<path d="m3 9 9-5 9 5M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18"></path>',
  wallet: '<path d="M4 6h13a2 2 0 0 1 2 2v10H4a2 2 0 0 1-2-2V6h2Z"></path><path d="M4 6V4h11v2M15 11h6v4h-6a2 2 0 0 1 0-4Z"></path>'
};

let products = [
  {
    id: "vip-30",
    name: "VIP Rank",
    code: "VIP // 30D",
    category: "ranks",
    categoryLabel: "RANK • 30 DNÍ",
    badge: "COMMUNITY",
    icon: "crown",
    accent: "#72f4ff",
    accentRgb: "114,244,255",
    price: 99,
    oldPrice: 129,
    sale: 23,
    featured: 2,
    maxQty: 1,
    description: "První úroveň Minekube ranku s barevným prefixem, kosmetikou a pohodlnějšími funkcemi.",
    features: ["VIP prefix a barevný chat", "3× /home a 5× /sethome", "Základní částicové efekty", "Denní VIP odměna"],
    tags: ["30 dní", "Celá síť", "Automatické doručení"]
  },
  {
    id: "mvp-30",
    name: "MVP Rank",
    code: "MVP // 30D",
    category: "ranks",
    categoryLabel: "RANK • 30 DNÍ",
    badge: "POPULAR",
    icon: "star",
    accent: "#ff55dc",
    accentRgb: "255,85,220",
    price: 199,
    oldPrice: null,
    sale: 0,
    featured: 1,
    maxQty: 1,
    description: "Nejoblíbenější rank pro aktivní hráče. Obsahuje VIP výhody a další síťové bonusy.",
    features: ["Všechny výhody VIP", "6× /home a prioritní připojení", "Exkluzivní gadgety", "MVP crate každý týden"],
    tags: ["30 dní", "Celá síť", "Doporučeno"]
  },
  {
    id: "elite-30",
    name: "ELITE Rank",
    code: "ELITE // 30D",
    category: "ranks",
    categoryLabel: "RANK • 30 DNÍ",
    badge: "ULTIMATE",
    icon: "crystal",
    accent: "#9568ff",
    accentRgb: "149,104,255",
    price: 299,
    oldPrice: 349,
    sale: 14,
    featured: 3,
    maxQty: 1,
    description: "Nejvyšší úroveň s kompletním balíkem výhod, ELITE aurou a unikátní kosmetikou.",
    features: ["Všechny výhody MVP", "10× /home a ELITE aura", "Exkluzivní létající pet", "ELITE crate každý týden"],
    tags: ["30 dní", "Celá síť", "Maximum výhod"]
  },
  {
    id: "vip-lifetime",
    name: "VIP Navždy",
    code: "VIP // LIFE",
    category: "ranks",
    categoryLabel: "RANK • TRVALÝ",
    badge: "LIFETIME",
    icon: "shield",
    accent: "#72f4ff",
    accentRgb: "114,244,255",
    price: 699,
    oldPrice: 799,
    sale: 13,
    featured: 7,
    maxQty: 1,
    description: "Trvalý VIP rank bez časového omezení. Jednou koupíš a výhody zůstávají na účtu.",
    features: ["VIP výhody bez expirace", "Trvalý prefix a chat", "Kosmetické efekty", "Speciální Lifetime badge"],
    tags: ["Navždy", "Celá síť", "Jednorázová platba"]
  },
  {
    id: "vote-keys-5",
    name: "5× Vote klíč",
    code: "KEY // VOTE 05",
    category: "keys",
    categoryLabel: "KLÍČE • VOTE",
    badge: "QUICK DROP",
    icon: "key",
    accent: "#72f4ff",
    accentRgb: "114,244,255",
    price: 49,
    oldPrice: null,
    sale: 0,
    featured: 8,
    maxQty: 10,
    description: "Pět klíčů k Vote crate se směsí základních odměn, MineCoins a kosmetiky.",
    features: ["5 Vote klíčů", "Okamžité připsání", "Šance na MineCoins", "Kosmetické odměny"],
    tags: ["5 kusů", "Vote crate", "Spotřební produkt"]
  },
  {
    id: "epic-keys-3",
    name: "3× Epic klíč",
    code: "KEY // EPIC 03",
    category: "keys",
    categoryLabel: "KLÍČE • EPIC",
    badge: "EPIC DROP",
    icon: "keys",
    accent: "#ff55dc",
    accentRgb: "255,85,220",
    price: 89,
    oldPrice: 109,
    sale: 18,
    featured: 5,
    maxQty: 10,
    description: "Tři Epic klíče s výrazně vyšší šancí na cenné odměny a raritní kosmetiku.",
    features: ["3 Epic klíče", "Vyšší tier odměn", "Raritní kosmetika", "Bonusové MineCoins"],
    tags: ["3 kusy", "Epic crate", "Vyšší šance"]
  },
  {
    id: "legendary-key",
    name: "Legendary klíč",
    code: "KEY // LEGEND",
    category: "keys",
    categoryLabel: "KLÍČ • LEGENDARY",
    badge: "RARE",
    icon: "crystal",
    accent: "#9568ff",
    accentRgb: "149,104,255",
    price: 79,
    oldPrice: null,
    sale: 0,
    featured: 10,
    maxQty: 10,
    description: "Jeden klíč k nejvyšší Legendary crate s exkluzivními a vzácnými odměnami.",
    features: ["1 Legendary klíč", "Nejvyšší tier odměn", "Exkluzivní efekty", "Šance na speciální pety"],
    tags: ["1 kus", "Legendary crate", "Top odměny"]
  },
  {
    id: "minecoins-2500",
    name: "2 500 MineCoins",
    code: "COIN // 2.5K",
    category: "currency",
    categoryLabel: "MĚNA • MINECOINS",
    badge: "CURRENCY",
    icon: "coins",
    accent: "#72f4ff",
    accentRgb: "114,244,255",
    price: 79,
    oldPrice: null,
    sale: 0,
    featured: 9,
    maxQty: 10,
    description: "Základní balíček serverové měny na kosmetiku, herní služby a komunitní předměty.",
    features: ["2 500 MineCoins", "Platnost na celé síti", "Okamžité připsání", "Bez expirace"],
    tags: ["2 500 MC", "Celá síť", "Bez expirace"]
  },
  {
    id: "minecoins-7000",
    name: "7 000 MineCoins",
    code: "COIN // 7K",
    category: "currency",
    categoryLabel: "MĚNA • MINECOINS",
    badge: "BEST VALUE",
    icon: "coins",
    accent: "#9568ff",
    accentRgb: "149,104,255",
    price: 169,
    oldPrice: 219,
    sale: 23,
    featured: 4,
    maxQty: 10,
    description: "Nejvýhodnější MineCoins balíček s 1 500 bonusovými coiny proti základnímu poměru.",
    features: ["7 000 MineCoins", "1 500 bonusových coinů", "Platnost na celé síti", "Bez expirace"],
    tags: ["7 000 MC", "Bonus 1 500", "Nejvýhodnější"]
  },
  {
    id: "starter-bundle",
    name: "Network Starter",
    code: "BUNDLE // START",
    category: "bundles",
    categoryLabel: "BALÍČEK • STARTER",
    badge: "LAUNCH OFFER",
    icon: "gift",
    accent: "#72f4ff",
    accentRgb: "114,244,255",
    price: 199,
    oldPrice: 289,
    sale: 30,
    featured: 0,
    maxQty: 1,
    description: "Kompletní startovací výbava pro nového hráče: VIP, klíče a MineCoins v jednom.",
    features: ["VIP rank na 30 dní", "5× Vote klíč", "2 500 MineCoins", "Starter kosmetický badge"],
    tags: ["4 produkty", "Ušetříš 30 %", "Ideální začátek"]
  },
  {
    id: "warrior-bundle",
    name: "Network Warrior",
    code: "BUNDLE // WARRIOR",
    category: "bundles",
    categoryLabel: "BALÍČEK • WARRIOR",
    badge: "POWER PACK",
    icon: "sword",
    accent: "#ff55dc",
    accentRgb: "255,85,220",
    price: 349,
    oldPrice: 449,
    sale: 22,
    featured: 6,
    maxQty: 1,
    description: "Silný komunitní balíček s MVP rankem, Epic klíči a velkou zásobou MineCoins.",
    features: ["MVP rank na 30 dní", "3× Epic klíč", "7 000 MineCoins", "Warrior částicová stopa"],
    tags: ["4 produkty", "Ušetříš 22 %", "MVP výbava"]
  },
  {
    id: "particle-pack",
    name: "Particle Collection",
    code: "COSMETIC // FX",
    category: "cosmetics",
    categoryLabel: "KOSMETIKA • EFEKTY",
    badge: "VISUAL FX",
    icon: "particles",
    accent: "#ff55dc",
    accentRgb: "255,85,220",
    price: 129,
    oldPrice: null,
    sale: 0,
    featured: 11,
    maxQty: 1,
    description: "Kolekce výrazných částicových efektů pro lobby, spawn a vybrané herní režimy.",
    features: ["8 částicových efektů", "Lobby a Survival", "Menu rychlého přepnutí", "Trvalé odemčení"],
    tags: ["8 efektů", "Trvalé", "Celá síť"]
  },
  {
    id: "pet-pack",
    name: "Companion Pack",
    code: "COSMETIC // PET",
    category: "cosmetics",
    categoryLabel: "KOSMETIKA • PETI",
    badge: "COMPANIONS",
    icon: "pet",
    accent: "#9568ff",
    accentRgb: "149,104,255",
    price: 159,
    oldPrice: 199,
    sale: 20,
    featured: 12,
    maxQty: 1,
    description: "Pět originálních Minekube společníků, kteří tě budou následovat v podporovaných světech.",
    features: ["5 unikátních petů", "Vlastní animace", "Rychlé přivolání", "Trvalé odemčení"],
    tags: ["5 petů", "Trvalé", "Animované"]
  }
];

const categoryNames = {
  all: "Všechny produkty",
  ranks: "Ranky",
  keys: "Klíče",
  currency: "MineCoins",
  bundles: "Balíčky",
  cosmetics: "Kosmetika"
};

const state = {
  category: "all",
  search: "",
  sort: "featured",
  saleOnly: false,
  cart: new Map(),
  player: "",
  coupon: null,
  checkoutStep: 1,
  payment: "paypal",
  apiConfig: null,
  activeOrder: null,
  paymentBusy: false,
  paypalSdkPromise: null,
  paypalInstance: null,
  legal: {
    termsAccepted: false,
    instantDeliveryAccepted: false
  }
};


const STORE_CONFIG = window.MINEKUBE_STORE_CONFIG || {};
const API_BASE_URL = String(STORE_CONFIG.apiBaseUrl || "http://localhost:8787").replace(/\/$/, "");

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    signal: options.signal || AbortSignal.timeout(10000),
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload?.error?.message || `API chyba ${response.status}`);
    error.code = payload?.error?.code || "API_ERROR";
    error.requestId = payload?.error?.requestId || null;
    throw error;
  }
  return payload;
}

async function loadApiData() {
  try {
    const [configPayload, productPayload] = await Promise.all([
      apiRequest("/api/config"),
      apiRequest("/api/products")
    ]);
    state.apiConfig = configPayload;
    if (Array.isArray(productPayload.products) && productPayload.products.length) {
      products = productPayload.products;
    }
    document.documentElement.dataset.storeApi = "online";
  } catch (error) {
    console.warn("Minekube Store API není dostupné, používám vestavěný katalog.", error);
    state.apiConfig = { paypalMode: "offline", paypalEnabled: false };
    document.documentElement.dataset.storeApi = "offline";
  }
}

function checkoutClientNonce() {
  const existing = safeStorageGet("minekube-store-checkout-nonce-v2", "");
  if (existing) return existing;
  const value = globalThis.crypto?.randomUUID?.() || `web-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  safeStorageSet("minekube-store-checkout-nonce-v2", value);
  return value;
}

function clearCheckoutNonce() {
  try { localStorage.removeItem("minekube-store-checkout-nonce-v2"); } catch {}
}

function resetPendingCheckout() {
  state.activeOrder = null;
  state.legal.termsAccepted = false;
  state.legal.instantDeliveryAccepted = false;
  clearCheckoutNonce();
}

function legalAcceptanceReady() {
  return Boolean(state.legal.termsAccepted && state.legal.instantDeliveryAccepted);
}

function legalVersions() {
  return {
    termsVersion: state.apiConfig?.legal?.termsVersion || "2026-07-24",
    privacyVersion: state.apiConfig?.legal?.privacyVersion || "2026-07-24"
  };
}
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const productGrid = $("#productGrid");
const resultCount = $("#resultCount");
const emptyState = $("#emptyState");
const productSearch = $("#productSearch");
const searchClear = $("#searchClear");
const productSort = $("#productSort");
const saleFilter = $("#saleFilter");
const categoryTabs = $("#categoryTabs");
const cartDrawer = $("#cartDrawer");
const storeOverlay = $("#storeOverlay");
const cartButton = $("#cartButton");
const cartCount = $("#cartCount");
const cartItems = $("#cartItems");
const cartEmpty = $("#cartEmpty");
const cartCheckout = $("#cartCheckout");
const cartSubtotal = $("#cartSubtotal");
const cartDiscount = $("#cartDiscount");
const cartTotal = $("#cartTotal");
const discountRow = $("#discountRow");
const couponInput = $("#couponInput");
const couponMessage = $("#couponMessage");
const playerModal = $("#playerModal");
const productModal = $("#productModal");
const checkoutModal = $("#checkoutModal");
const playerNameInput = $("#playerName");
const playerInputWrap = playerNameInput?.closest(".player-input-wrap");
const playerFormError = $("#playerFormError");
const toast = $("#storeToast");
let toastTimerId = null;
let lastFocusedElement = null;

function safeStorageGet(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage is optional; storefront remains fully usable without it.
  }
}

function hydrateState() {
  const savedCart = safeStorageGet("minekube-store-cart", []);
  if (Array.isArray(savedCart)) {
    savedCart.forEach(item => {
      if (item && products.some(product => product.id === item.id)) {
        state.cart.set(item.id, Math.max(1, Number(item.quantity) || 1));
      }
    });
  }
  const savedPlayer = safeStorageGet("minekube-store-player", "");
  if (typeof savedPlayer === "string" && isValidPlayerName(savedPlayer)) state.player = savedPlayer;
}

function persistCart() {
  safeStorageSet("minekube-store-cart", [...state.cart].map(([id, quantity]) => ({ id, quantity })));
}

function money(value) {
  const normalized = Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  const hasHalere = Math.abs(normalized - Math.round(normalized)) > 0.000001;
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    minimumFractionDigits: hasHalere ? 2 : 0,
    maximumFractionDigits: 2
  }).format(normalized);
}

function svgIcon(name, className = "") {
  return `<svg class="${className}" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.star}</svg>`;
}

function isValidPlayerName(value) {
  return /^[A-Za-z0-9_]{3,16}$/.test(value.trim());
}

function initials(value) {
  return value ? value.slice(0, 2).toUpperCase() : "?";
}

function getProduct(id) {
  return products.find(product => product.id === id);
}

function createProductCard(product, index) {
  const inCart = state.cart.has(product.id);
  return `
    <article class="store-product-card is-entering" data-product-id="${product.id}" style="--product-accent:${product.accent};--product-accent-rgb:${product.accentRgb};--delay:${Math.min(index * 45, 360)}ms">
      <div class="product-visual">
        <div class="product-card-topline">
          <span class="product-badge"><i></i>${product.badge}</span>
          ${product.sale ? `<span class="product-discount">−${product.sale} %</span>` : ""}
        </div>
        <div class="product-emblem">
          ${svgIcon(product.icon)}
          <strong>${product.code.split(" // ")[0]}</strong>
        </div>
        <div class="product-data-strip"><span><i></i> MINEKUBE NETWORK</span><b>${product.code}</b></div>
      </div>
      <div class="product-content">
        <div class="product-category-label"><span>${product.categoryLabel}</span><b>MK-${String(products.indexOf(product) + 1).padStart(2, "0")}</b></div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <ul class="product-feature-list">
          ${product.features.slice(0, 3).map(feature => `<li>${svgIcon("check")}<span>${feature}</span></li>`).join("")}
        </ul>
        <div class="product-price-row">
          <div class="product-price"><strong>${money(product.price)}</strong>${product.oldPrice ? `<del>${money(product.oldPrice)}</del>` : ""}</div>
          <small>${product.category === "ranks" ? "za rank" : "jednorázově"}</small>
        </div>
        <div class="product-actions">
          <button class="add-to-cart-button ${inCart ? "is-added" : ""}" type="button" data-add-product="${product.id}">
            ${svgIcon(inCart ? "check" : "cart")}
            <span>${inCart ? "V košíku" : "Přidat do košíku"}</span>
          </button>
          <button class="product-detail-button" type="button" data-product-detail="${product.id}" aria-label="Detail produktu ${product.name}" title="Detail produktu">
            ${svgIcon("info")}
          </button>
        </div>
      </div>
    </article>`;
}

function filteredProducts() {
  const query = state.search.trim().toLocaleLowerCase("cs");
  const result = products.filter(product => {
    const categoryMatch = state.category === "all" || product.category === state.category;
    const saleMatch = !state.saleOnly || product.sale > 0;
    const haystack = `${product.name} ${product.description} ${product.categoryLabel} ${product.features.join(" ")} ${product.tags.join(" ")}`.toLocaleLowerCase("cs");
    const queryMatch = !query || haystack.includes(query);
    return categoryMatch && saleMatch && queryMatch;
  });

  const sorters = {
    featured: (a, b) => a.featured - b.featured,
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    name: (a, b) => a.name.localeCompare(b.name, "cs")
  };

  return result.sort(sorters[state.sort] || sorters.featured);
}

function updateCategoryCounts() {
  $$('[data-category-count]').forEach(node => {
    const category = node.dataset.categoryCount;
    node.textContent = category === "all" ? products.length : products.filter(product => product.category === category).length;
  });
}

function renderProducts() {
  const result = filteredProducts();
  productGrid.innerHTML = result.map(createProductCard).join("");
  resultCount.textContent = String(result.length);
  emptyState.hidden = result.length !== 0;
  productGrid.hidden = result.length === 0;
  attachProductPointerEffects();
}

function setCategory(category, { scroll = false, transition = false } = {}) {
  if (!categoryNames[category]) category = "all";
  const perform = () => {
    state.category = category;
    $$('[data-category]', categoryTabs).forEach(button => {
      const active = button.dataset.category === category;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });
    renderProducts();
    if (scroll) $("#catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (transition) playPageTransition(category, perform);
  else perform();
}

function resetCatalog() {
  state.category = "all";
  state.search = "";
  state.sort = "featured";
  state.saleOnly = false;
  productSearch.value = "";
  productSearch.parentElement.classList.remove("has-value");
  productSort.value = "featured";
  saleFilter.setAttribute("aria-pressed", "false");
  setCategory("all");
}

function addToCart(id, quantity = 1) {
  const product = getProduct(id);
  if (!product) return;
  const current = state.cart.get(id) || 0;
  state.cart.set(id, Math.min(product.maxQty, current + quantity));
  resetPendingCheckout();
  persistCart();
  renderCart();
  renderProducts();
  pulseCart();
  showToast("Přidáno do košíku", `${product.name} je připravený v košíku.`);
}

function removeFromCart(id) {
  const product = getProduct(id);
  state.cart.delete(id);
  resetPendingCheckout();
  persistCart();
  renderCart();
  renderProducts();
  if (product) showToast("Odebráno", `${product.name} byl odebrán z košíku.`);
}

function changeQuantity(id, delta) {
  const product = getProduct(id);
  if (!product || !state.cart.has(id)) return;
  const next = (state.cart.get(id) || 1) + delta;
  if (next <= 0) {
    removeFromCart(id);
    return;
  }
  state.cart.set(id, Math.min(product.maxQty, next));
  resetPendingCheckout();
  persistCart();
  renderCart();
}

function cartEntries() {
  return [...state.cart].map(([id, quantity]) => ({ product: getProduct(id), quantity })).filter(entry => entry.product);
}

function calculateTotals() {
  const subtotal = cartEntries().reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);
  const discountRate = state.coupon?.rate || 0;
  const discount = Math.round((subtotal * discountRate + Number.EPSILON) * 100) / 100;
  const total = Math.round((Math.max(0, subtotal - discount) + Number.EPSILON) * 100) / 100;
  return { subtotal, discount, total };
}

function renderCart() {
  const entries = cartEntries();
  const quantity = entries.reduce((sum, entry) => sum + entry.quantity, 0);
  cartCount.textContent = String(quantity);
  cartButton.setAttribute("aria-label", `Otevřít košík, ${quantity} položek`);

  cartItems.innerHTML = entries.map(({ product, quantity: amount }) => `
    <article class="cart-item" style="--cart-accent-rgb:${product.accentRgb}">
      <span class="cart-item-icon">${svgIcon(product.icon)}</span>
      <div class="cart-item-copy"><small>${product.categoryLabel}</small><strong>${product.name}</strong><span>${money(product.price * amount)}</span></div>
      <div class="cart-item-controls">
        <button type="button" data-remove-cart="${product.id}" aria-label="Odebrat ${product.name}">${svgIcon("trash")}</button>
        <div class="quantity-control">
          <button type="button" data-quantity="${product.id}" data-delta="-1" aria-label="Snížit množství">−</button>
          <b>${amount}</b>
          <button type="button" data-quantity="${product.id}" data-delta="1" aria-label="Zvýšit množství" ${amount >= product.maxQty ? "disabled" : ""}>+</button>
        </div>
      </div>
    </article>`).join("");

  const hasItems = entries.length > 0;
  cartEmpty.hidden = hasItems;
  cartItems.hidden = !hasItems;
  cartCheckout.hidden = !hasItems;

  const totals = calculateTotals();
  cartSubtotal.textContent = money(totals.subtotal);
  cartDiscount.textContent = `−${money(totals.discount)}`;
  cartTotal.textContent = money(totals.total);
  discountRow.hidden = totals.discount === 0;
  renderPlayerUI();
}

function renderPlayerUI() {
  const name = state.player;
  const avatarText = initials(name);
  $("#sidebarPlayerName").textContent = name || "Nenastaveno";
  $("#sidebarPlayerStatus").textContent = name ? "Objednávka bude doručena na tento účet." : "Před nákupem zadej svůj přesný Minecraft nick.";
  $("#heroPlayerLabel").textContent = name ? `Hráč: ${name}` : "Nastavit Minecraft účet";
  $("#playerAvatar span").textContent = avatarText;
  $("#playerModalAvatar span").textContent = avatarText;
  $$(".mini-avatar span").forEach(node => node.textContent = avatarText);

  const summary = $("#cartPlayerSummary");
  if (summary) {
    $("strong", summary).textContent = name || "Není nastavený";
    $("button", summary).textContent = name ? "Změnit" : "Nastavit";
  }

  const setButton = $("#setPlayerButton span");
  if (setButton) setButton.textContent = name ? "Změnit hráče" : "Nastavit hráče";
}

function pulseCart() {
  cartButton.classList.remove("is-pulsing");
  void cartButton.offsetWidth;
  cartButton.classList.add("is-pulsing");
  setTimeout(() => cartButton.classList.remove("is-pulsing"), 500);
}

function openCart() {
  lastFocusedElement = document.activeElement;
  cartDrawer.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden", "false");
  cartButton.setAttribute("aria-expanded", "true");
  storeOverlay.classList.add("is-visible");
  storeOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("drawer-open");
  setTimeout(() => $("#closeCart")?.focus(), 60);
}

function closeCart({ restoreFocus = true } = {}) {
  cartDrawer.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  cartButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("drawer-open");
  syncOverlay();
  if (restoreFocus) lastFocusedElement?.focus?.();
}

function syncOverlay() {
  const anyModal = $$(".store-modal-shell.is-open").length > 0;
  const drawerOpen = cartDrawer.classList.contains("is-open");
  const visible = anyModal || drawerOpen;
  storeOverlay.classList.toggle("is-visible", visible);
  storeOverlay.setAttribute("aria-hidden", String(!visible));
  document.body.classList.toggle("modal-open", anyModal);
}

function openModal(modal) {
  if (!modal) return;
  lastFocusedElement = document.activeElement;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  syncOverlay();
  setTimeout(() => $("button, input, select", modal)?.focus(), 80);
}

function closeModal(modal, { restoreFocus = true } = {}) {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  syncOverlay();
  if (restoreFocus) lastFocusedElement?.focus?.();
}

function closeAllPanels() {
  closeCart({ restoreFocus: false });
  $$(".store-modal-shell.is-open").forEach(modal => closeModal(modal, { restoreFocus: false }));
}

function openProductDetail(id) {
  const product = getProduct(id);
  if (!product) return;
  const content = $("#productModalContent");
  content.innerHTML = `
    <div class="product-modal-layout" style="--modal-accent-rgb:${product.accentRgb}">
      <div class="product-modal-visual" style="--modal-accent-rgb:${product.accentRgb}">
        <div class="product-modal-emblem">${svgIcon(product.icon)}<strong>${product.code.split(" // ")[0]}</strong></div>
        <small>MINEKUBE PRODUCT // ${product.code}</small>
      </div>
      <div class="product-modal-copy" style="--modal-accent-rgb:${product.accentRgb}">
        <span class="modal-kicker"><i></i>${product.categoryLabel}</span>
        <h2 id="productModalTitle">${product.name}</h2>
        <p>${product.description}</p>
        <div class="modal-product-meta">${product.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
        <div class="modal-feature-box"><strong>CO PRODUKT OBSAHUJE</strong><ul>${product.features.map(feature => `<li>${svgIcon("check")}<span>${feature}</span></li>`).join("")}</ul></div>
        <div class="modal-buy-row">
          <div class="modal-price"><small>CENA PRODUKTU</small><span><strong>${money(product.price)}</strong>${product.oldPrice ? `<del>${money(product.oldPrice)}</del>` : ""}</span></div>
          <button class="modal-add-button" type="button" data-add-product="${product.id}">${svgIcon("cart")}<span>Přidat do košíku</span></button>
        </div>
      </div>
    </div>`;
  openModal(productModal);
}

function openPlayerEditor() {
  closeCart({ restoreFocus: false });
  playerNameInput.value = state.player;
  validatePlayerInput();
  playerFormError.textContent = "";
  openModal(playerModal);
  setTimeout(() => playerNameInput.focus(), 90);
}

function validatePlayerInput() {
  const value = playerNameInput.value.trim();
  const valid = isValidPlayerName(value);
  const neutral = value.length === 0;
  playerInputWrap.classList.toggle("valid", valid);
  playerInputWrap.classList.toggle("invalid", !neutral && !valid);
  $("#playerModalAvatar span").textContent = initials(value);
  return valid;
}

function savePlayer(value) {
  state.player = value.trim();
  resetPendingCheckout();
  safeStorageSet("minekube-store-player", state.player);
  renderPlayerUI();
  closeModal(playerModal);
  showToast("Hráč uložen", `Objednávky budou směřovat na účet ${state.player}.`);
}

function openCheckout() {
  if (state.cart.size === 0) {
    showToast("Košík je prázdný", "Nejdřív přidej alespoň jeden produkt.");
    return;
  }
  closeCart({ restoreFocus: false });
  state.checkoutStep = state.player ? 2 : 1;
  renderCheckout();
  openModal(checkoutModal);
}

function renderCheckout() {
  $$('[data-step-indicator]').forEach(indicator => {
    indicator.classList.toggle("active", Number(indicator.dataset.stepIndicator) <= Math.min(state.checkoutStep, 3));
  });

  const body = $("#checkoutBody");
  const totals = calculateTotals();

  if (state.checkoutStep === 1) {
    body.innerHTML = `
      <div class="checkout-panel">
        <h3>1. Zkontroluj cílového hráče</h3>
        <p>Produkt bude po dokončení objednávky přiřazen přesně tomuto premium Minecraft účtu.</p>
        <div class="checkout-player-card">
          <div class="mini-avatar"><span>${initials(state.player)}</span></div>
          <div><small>MINECRAFT ÚČET</small><strong>${state.player || "Není nastavený"}</strong></div>
          <button type="button" data-checkout-player>${state.player ? "Změnit" : "Nastavit"}</button>
        </div>
      </div>
      <div class="checkout-nav"><button class="secondary" type="button" data-checkout-close>Zpět do košíku</button><button class="primary" type="button" data-checkout-next ${state.player ? "" : "disabled"}>Pokračovat na souhrn</button></div>`;
  } else if (state.checkoutStep === 2) {
    body.innerHTML = `
      <div class="checkout-panel">
        <h3>2. Souhrn objednávky</h3>
        <p>Cenu vždy znovu vypočítá Minekube API. Úpravou webu ji nelze změnit.</p>
        <div class="checkout-summary-list">
          ${cartEntries().map(({ product, quantity }) => `<div class="checkout-summary-item"><span>${svgIcon(product.icon)}</span><div><small>${quantity}× ${product.categoryLabel}</small><strong>${product.name}</strong></div><b>${money(product.price * quantity)}</b></div>`).join("")}
        </div>
        <div class="checkout-summary-total"><span>Hráč: <strong>${state.player}</strong></span><strong>${money(totals.total)}</strong></div>
      </div>
      <div class="checkout-nav"><button class="secondary" type="button" data-checkout-back>Zpět</button><button class="primary" type="button" data-checkout-next>Pokračovat k platbě</button></div>`;
  } else if (state.checkoutStep === 3) {
    const mode = state.apiConfig?.paypalMode || "offline";
    const unavailable = !state.apiConfig?.paypalEnabled;
    const legalReady = legalAcceptanceReady();
    body.innerHTML = `
      <div class="checkout-panel paypal-checkout-panel">
        <h3>3. Souhlasy a zaplacení přes PayPal</h3>
        <p>${mode === "sandbox" ? "Testovací režim Sandbox – nepoužívá skutečné peníze." : mode === "mock" ? "Lokální vývojový režim – platba se pouze simuluje." : "Po schválení platby PayPal Minekube API ověří částku a připraví odměny pro server."}</p>

        <div class="legal-consent-box" aria-label="Povinná potvrzení objednávky">
          <label class="legal-consent-row">
            <input type="checkbox" data-legal-terms ${state.legal.termsAccepted ? "checked" : ""}>
            <span class="legal-checkbox-mark" aria-hidden="true">${svgIcon("check")}</span>
            <span>
              Souhlasím s <a href="terms.html" target="_blank" rel="noopener">obchodními podmínkami</a>,
              potvrzuji správnost Minecraft nicku <strong>${state.player}</strong> a beru na vědomí
              <a href="privacy.html" target="_blank" rel="noopener">zásady ochrany osobních údajů</a>.
            </span>
          </label>
          <label class="legal-consent-row legal-consent-critical">
            <input type="checkbox" data-legal-instant ${state.legal.instantDeliveryAccepted ? "checked" : ""}>
            <span class="legal-checkbox-mark" aria-hidden="true">${svgIcon("check")}</span>
            <span>
              Výslovně souhlasím s okamžitým dodáním digitálního obsahu před uplynutím 14denní lhůty
              a beru na vědomí, že jeho okamžitým dodáním ztrácím právo od smlouvy odstoupit.
            </span>
          </label>
          <small>Obě políčka musíš zaškrtnout sám. Store jejich verzi a čas potvrzení uloží k objednávce.</small>
        </div>

        <div class="payment-notice ${unavailable ? "payment-error" : ""}">
          <strong>${unavailable ? "Platební API není dostupné." : `MINEKUBE PAYMENT CHANNEL // ${mode.toUpperCase()}`}</strong>
          <span id="paymentStatus">${unavailable ? "Spusť store-api a zkontroluj store-config.js." : legalReady ? "Připravuji zabezpečené platební tlačítko…" : "Nejdřív potvrď obě povinná políčka výše."}</span>
        </div>
        <div class="checkout-summary-total"><span>Celkem k úhradě</span><strong>${money(totals.total)}</strong></div>
        <div class="paypal-button-shell ${legalReady ? "" : "is-locked"}" id="paypalButtonShell" ${legalReady ? "" : "hidden"}>
          ${mode === "mock" ? '<button class="place-order-button" type="button" data-start-mock-payment>Simulovat úspěšnou Sandbox platbu</button>' : '<paypal-button id="minekubePayPalButton" type="pay" hidden></paypal-button>'}
        </div>
        <small class="payment-legal">Kliknutím na PayPal potvrzuješ objednávku zavazující k platbě. Platba se vytvoří pouze pro produkty, cenu a právní souhlasy potvrzené Minekube API.</small>
      </div>
      <div class="checkout-nav"><button class="secondary" type="button" data-checkout-back ${state.paymentBusy ? "disabled" : ""}>Zpět na souhrn</button></div>`;
    if (!unavailable && legalReady) queueMicrotask(setupPaymentUi);
  } else {
    const order = state.activeOrder;
    const status = order?.status || "UNKNOWN";
    const delivered = status === "DELIVERED";
    const waiting = ["WAITING_FOR_PLAYER", "QUEUED", "DELIVERING", "PAID"].includes(status);
    body.innerHTML = `
      <div class="checkout-success ${delivered ? "is-delivered" : ""}">
        <span>${svgIcon(delivered ? "check" : "shield")}</span>
        <h3>${delivered ? "Objednávka byla doručena" : "Platba byla potvrzena"}</h3>
        <p>${waiting ? `Objednávka pro hráče <strong>${state.player}</strong> je bezpečně uložená. Odměny budou doručeny po synchronizaci s Minekube Network.` : `Aktuální stav objednávky: <strong>${status}</strong>.`}</p>
        <b>${order?.publicId || "Objednávka"}</b>
        <div class="order-status-line"><i></i><span>${humanOrderStatus(status)}</span></div>
        <button type="button" data-refresh-order>Obnovit stav</button>
        <button type="button" data-checkout-finish>Zavřít objednávku</button>
      </div>`;
  }
}

function humanOrderStatus(status) {
  const labels = {
    CREATED: "Objednávka vytvořena",
    PAYPAL_CREATED: "Čeká na schválení v PayPalu",
    WAITING_FOR_PLAYER: "Čeká na první připojení hráče",
    PAID: "Platba potvrzena",
    QUEUED: "Odměny čekají ve frontě",
    DELIVERING: "Server právě doručuje odměny",
    DELIVERED: "Všechny odměny byly doručeny",
    DELIVERY_FAILED: "Část doručení vyžaduje zásah administrátora",
    PAYMENT_FAILED: "Platba nebyla dokončena",
    REFUNDED: "Platba byla vrácena"
  };
  return labels[status] || status;
}

async function createInternalOrder() {
  if (!legalAcceptanceReady()) {
    throw new Error("Nejdřív potvrď obchodní podmínky a okamžité dodání digitálního obsahu.");
  }
  if (state.activeOrder?.publicId && !state.activeOrder.paidAt) return state.activeOrder;
  const versions = legalVersions();
  const payload = await apiRequest("/api/orders", {
    method: "POST",
    body: JSON.stringify({
      playerName: state.player,
      couponCode: state.coupon?.code || null,
      clientNonce: checkoutClientNonce(),
      legalAcceptance: {
        termsAccepted: true,
        instantDeliveryAccepted: true,
        playerNameConfirmed: true,
        termsVersion: versions.termsVersion,
        privacyVersion: versions.privacyVersion
      },
      items: cartEntries().map(({ product, quantity }) => ({ productId: product.id, quantity }))
    })
  });
  state.activeOrder = payload.order;
  safeStorageSet("minekube-store-last-order", state.activeOrder.publicId);
  return state.activeOrder;
}

async function ensurePayPalOrder() {
  const order = await createInternalOrder();
  if (order.paypalOrderId) return order.paypalOrderId;
  const payload = await apiRequest(`/api/orders/${encodeURIComponent(order.publicId)}/paypal`, { method: "POST", body: "{}" });
  state.activeOrder = payload.order;
  return payload.paypalOrderId;
}

async function captureActiveOrder() {
  const payload = await apiRequest(`/api/orders/${encodeURIComponent(state.activeOrder.publicId)}/paypal/capture`, { method: "POST", body: "{}" });
  state.activeOrder = payload.order;
  clearCheckoutNonce();
  state.cart.clear();
  state.coupon = null;
  persistCart();
  renderCart();
  state.checkoutStep = 4;
  renderCheckout();
  startOrderPolling();
}

async function setupPaymentUi() {
  const status = $("#paymentStatus");
  if (!status || state.paymentBusy) return;
  if (state.apiConfig?.paypalMode === "mock") {
    status.textContent = "Lokální simulace je připravená.";
    return;
  }
  try {
    state.paymentBusy = true;
    status.textContent = "Navazuji zabezpečené spojení s PayPal Sandboxem…";
    const sdkConfig = await apiRequest("/api/paypal/client-token", { method: "POST", body: "{}" });
    await loadPayPalSdk(sdkConfig.sdkUrl);
    const sdkInstance = await window.paypal.createInstance({
      clientId: sdkConfig.clientId,
      components: ["paypal-payments"],
      pageType: "checkout"
    });
    state.paypalInstance = sdkInstance;
    const methods = await sdkInstance.findEligibleMethods({ currencyCode: "CZK" });
    if (!methods.isEligible("paypal")) throw new Error("PayPal není pro tento prohlížeč dostupný.");
    const session = sdkInstance.createPayPalOneTimePaymentSession({
      async onApprove() {
        try {
          status.textContent = "Platba schválena. Ověřuji částku na serveru…";
          await captureActiveOrder();
        } catch (error) {
          console.error(error);
          state.paymentBusy = false;
          status.textContent = error.message || "Platbu se nepodařilo serverově ověřit.";
        }
      },
      onCancel() {
        state.paymentBusy = false;
        status.textContent = "Platba byla zrušena. Můžeš ji zkusit znovu.";
      },
      onError(error) {
        console.error(error);
        state.paymentBusy = false;
        status.textContent = "PayPal platbu nedokončil. Zkus to znovu.";
      }
    });
    const button = $("#minekubePayPalButton");
    if (!button) return;

    button.hidden = false;
    if (!button.dataset.bound) {
      button.dataset.bound = "true";
      button.addEventListener("click", async () => {
        try {
          state.paymentBusy = true;
          status.textContent = "Otevírám zabezpečené okno PayPal…";

          // PayPal Web SDK v6 expects a create-order FUNCTION as the second
          // argument. The SDK calls it and expects a Promise resolving to an
          // object shaped exactly as { orderId: "PAYPAL_ORDER_ID" }.
          const createOrderOnServer = async () => {
            const orderId = await ensurePayPalOrder();
            if (typeof orderId !== "string" || !orderId.trim()) {
              throw new Error("PayPal vrátil neplatné ID objednávky.");
            }
            return { orderId: orderId.trim() };
          };

          // The second argument must be the INVOKED create-order Promise.
          // It resolves to the exact object required by PayPal: { orderId: string }.
          await session.start(
            { presentationMode: "auto" },
            createOrderOnServer()
          );
        } catch (error) {
          console.error(error);
          state.paymentBusy = false;
          status.textContent = error.message || "Platbu se nepodařilo zahájit.";
        }
      });
    }
    status.textContent = "PayPal Sandbox je připravený.";
    state.paymentBusy = false;
  } catch (error) {
    console.error(error);
    state.paymentBusy = false;
    status.textContent = error.message || "PayPal tlačítko se nepodařilo připravit.";
  }
}

function loadPayPalSdk(src) {
  if (window.paypal?.createInstance) return Promise.resolve();
  if (state.paypalSdkPromise) return state.paypalSdkPromise;
  state.paypalSdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error("PayPal SDK se nepodařilo načíst."));
    document.head.appendChild(script);
  });
  return state.paypalSdkPromise;
}

async function startMockPayment() {
  if (state.paymentBusy) return;
  const status = $("#paymentStatus");
  try {
    state.paymentBusy = true;
    if (status) status.textContent = "Vytvářím lokální testovací objednávku…";
    await ensurePayPalOrder();
    if (status) status.textContent = "Simuluji potvrzení platby…";
    await captureActiveOrder();
  } catch (error) {
    console.error(error);
    if (status) status.textContent = error.message || "Testovací platba selhala.";
  } finally {
    state.paymentBusy = false;
  }
}

async function refreshActiveOrder() {
  if (!state.activeOrder?.publicId) return;
  try {
    const payload = await apiRequest(`/api/orders/${encodeURIComponent(state.activeOrder.publicId)}`);
    state.activeOrder = payload.order;
    renderCheckout();
  } catch (error) {
    showToast("Stav nelze načíst", error.message);
  }
}

function startOrderPolling() {
  const orderId = state.activeOrder?.publicId;
  if (!orderId) return;
  let attempts = 0;
  const timer = setInterval(async () => {
    attempts += 1;
    if (!state.activeOrder || state.activeOrder.publicId !== orderId || attempts > 60) return clearInterval(timer);
    try {
      const payload = await apiRequest(`/api/orders/${encodeURIComponent(orderId)}`);
      state.activeOrder = payload.order;
      if (state.checkoutStep === 4) renderCheckout();
      if (["DELIVERED", "DELIVERY_FAILED", "REFUNDED"].includes(state.activeOrder.status)) clearInterval(timer);
    } catch {}
  }, 5000);
}

function applyCoupon() {
  const code = couponInput.value.trim().toUpperCase();
  const coupons = {
    MINEKUBE10: { code: "MINEKUBE10", rate: .10 },
    START20: { code: "START20", rate: .20 }
  };
  if (!code) {
    couponMessage.className = "coupon-message error";
    couponMessage.textContent = "Nejdřív zadej slevový kód.";
    return;
  }
  if (!coupons[code]) {
    state.coupon = null;
    resetPendingCheckout();
    couponMessage.className = "coupon-message error";
    couponMessage.textContent = "Tento kód neexistuje nebo už není aktivní.";
    renderCart();
    return;
  }
  state.coupon = coupons[code];
  resetPendingCheckout();
  couponMessage.className = "coupon-message";
  couponMessage.textContent = `Kód ${code} byl použit: sleva ${Math.round(state.coupon.rate * 100)} %.`;
  renderCart();
  showToast("Sleva aktivována", `Na objednávku byla přidána sleva ${Math.round(state.coupon.rate * 100)} %.`);
}

function showToast(title, message) {
  clearTimeout(toastTimerId);
  $("#toastTitle").textContent = title;
  $("#toastMessage").textContent = message;
  toast.classList.remove("is-visible");
  void toast.offsetWidth;
  toast.classList.add("is-visible");
  toastTimerId = setTimeout(() => toast.classList.remove("is-visible"), 3500);
}

function attachProductPointerEffects() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  $$(".store-product-card").forEach(card => {
    card.addEventListener("pointermove", event => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--card-x", `${x}%`);
      card.style.setProperty("--card-y", `${y}%`);
    });
  });
}

function playPageTransition(category, callback) {
  const transition = $("#pageTransition");
  if (!transition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    callback();
    return;
  }
  const configs = {
    all: ["KATALOG", "Načítám všechny produkty", "MK-S01", "#72f4ff", "114,244,255"],
    ranks: ["RANKY", "Synchronizuji rank matrix", "MK-S02", "#72f4ff", "114,244,255"],
    keys: ["KLÍČE", "Otevírám crate databázi", "MK-S03", "#ff55dc", "255,85,220"],
    currency: ["MINECOINS", "Načítám síťovou měnu", "MK-S04", "#9568ff", "149,104,255"],
    bundles: ["BALÍČKY", "Sestavuji zvýhodněné nabídky", "MK-S05", "#ff55dc", "255,85,220"],
    cosmetics: ["KOSMETIKA", "Aktivuji visual FX katalog", "MK-S06", "#9568ff", "149,104,255"]
  };
  const config = configs[category] || configs.all;
  $("#pageTransitionTitle").textContent = config[0];
  $("#pageTransitionStatus").textContent = config[1];
  $("#pageTransitionCode").textContent = config[2];
  transition.style.setProperty("--transition-accent", config[3]);
  transition.style.setProperty("--transition-accent-rgb", config[4]);
  transition.setAttribute("aria-hidden", "false");
  transition.classList.remove("is-active");
  void transition.offsetWidth;
  transition.classList.add("is-active");
  setTimeout(callback, 650);
  setTimeout(() => {
    transition.classList.remove("is-active");
    transition.setAttribute("aria-hidden", "true");
  }, 1500);
}

function initLoader() {
  const loader = $("#futureLoader");
  const bar = $("#loaderProgressBar");
  const percent = $("#loaderPercent");
  const status = $("#loaderStatus");
  if (!loader) {
    document.body.classList.remove("future-loading");
    return;
  }

  const statuses = [
    [18, "Načítám katalog produktů..."],
    [42, "Připojuji Minekube Store Core..."],
    [67, "Inicializuji košík a hráčský účet..."],
    [86, "Synchronizuji vizuální systém..."],
    [100, "Minekube Store je připravený."]
  ];
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const duration = reduced ? 150 : 1250;
  const start = performance.now();

  function frame(now) {
    const raw = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - raw, 3);
    const value = Math.round(eased * 100);
    bar.style.width = `${value}%`;
    percent.textContent = String(value);
    const active = statuses.find(([threshold]) => value <= threshold) || statuses[statuses.length - 1];
    status.textContent = active[1];
    if (raw < 1) requestAnimationFrame(frame);
    else {
      setTimeout(() => {
        loader.classList.add("is-leaving");
        document.body.classList.remove("future-loading");
        setTimeout(() => loader.remove(), 800);
      }, reduced ? 20 : 220);
    }
  }
  requestAnimationFrame(frame);
}

function initTheme() {
  const root = document.documentElement;
  const saved = safeStorageGet("minekube-store-theme", "dark");
  if (saved === "light") root.dataset.theme = "light";
  $("#themeToggle")?.addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    if (next === "dark") delete root.dataset.theme;
    else root.dataset.theme = "light";
    safeStorageSet("minekube-store-theme", next);
  });
}

function initMobileNavigation() {
  const button = $("#menuButton");
  const nav = $("#mobileNav");
  button?.addEventListener("click", () => {
    const open = !nav.classList.contains("open");
    nav.classList.toggle("open", open);
    button.classList.toggle("open", open);
    button.setAttribute("aria-expanded", String(open));
  });
  $$("a", nav).forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    button.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
  }));
}

function initScrollExperience() {
  const header = $("#siteHeader");
  const progress = $("#scrollProgress span");
  const links = $$('[data-nav-section]');
  const sections = ["store-home", "catalog", "faq"].map(id => document.getElementById(id)).filter(Boolean);

  const onScroll = () => {
    const top = window.scrollY;
    header.classList.toggle("scrolled", top > 20);
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progress.style.transform = `scaleX(${Math.min(1, top / max)})`;

    let activeId = sections[0]?.id;
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= 160) activeId = section.id;
    });
    links.forEach(link => link.classList.toggle("active", link.dataset.navSection === activeId));
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function bindEvents() {
  categoryTabs.addEventListener("click", event => {
    const button = event.target.closest("[data-category]");
    if (button) setCategory(button.dataset.category);
  });

  productSearch.addEventListener("input", event => {
    state.search = event.target.value;
    productSearch.parentElement.classList.toggle("has-value", state.search.length > 0);
    renderProducts();
  });

  searchClear.addEventListener("click", () => {
    productSearch.value = "";
    state.search = "";
    productSearch.parentElement.classList.remove("has-value");
    renderProducts();
    productSearch.focus();
  });
  searchClear.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") searchClear.click();
  });

  productSort.addEventListener("change", event => {
    state.sort = event.target.value;
    renderProducts();
  });

  saleFilter.addEventListener("click", () => {
    state.saleOnly = !state.saleOnly;
    saleFilter.setAttribute("aria-pressed", String(state.saleOnly));
    renderProducts();
  });

  $("#resetCatalog").addEventListener("click", resetCatalog);

  document.addEventListener("click", event => {
    const addButton = event.target.closest("[data-add-product]");
    if (addButton) {
      addToCart(addButton.dataset.addProduct);
      if (addButton.closest("#productModal")) closeModal(productModal, { restoreFocus: false });
      return;
    }

    const detailButton = event.target.closest("[data-product-detail]");
    if (detailButton) {
      openProductDetail(detailButton.dataset.productDetail);
      return;
    }

    const categoryLink = event.target.closest("[data-category-link]");
    if (categoryLink) {
      event.preventDefault();
      setCategory(categoryLink.dataset.categoryLink, { scroll: true, transition: true });
      return;
    }

    const quickCategory = event.target.closest("[data-quick-category]");
    if (quickCategory) {
      setCategory(quickCategory.dataset.quickCategory, { scroll: true, transition: true });
      return;
    }

    const removeButton = event.target.closest("[data-remove-cart]");
    if (removeButton) {
      removeFromCart(removeButton.dataset.removeCart);
      return;
    }

    const quantityButton = event.target.closest("[data-quantity]");
    if (quantityButton && !quantityButton.disabled) {
      changeQuantity(quantityButton.dataset.quantity, Number(quantityButton.dataset.delta));
      return;
    }

    const payment = event.target.closest("[data-payment]");
    if (payment) {
      state.payment = payment.dataset.payment;
      renderCheckout();
      return;
    }

    if (event.target.closest("[data-checkout-player]")) {
      closeModal(checkoutModal, { restoreFocus: false });
      openPlayerEditor();
      return;
    }
    if (event.target.closest("[data-checkout-next]")) {
      if (state.checkoutStep === 1 && !state.player) return;
      state.checkoutStep += 1;
      renderCheckout();
      return;
    }
    if (event.target.closest("[data-checkout-back]")) {
      state.checkoutStep = Math.max(1, state.checkoutStep - 1);
      renderCheckout();
      return;
    }
    if (event.target.closest("[data-checkout-close]")) {
      closeModal(checkoutModal, { restoreFocus: false });
      openCart();
      return;
    }
    if (event.target.closest("[data-start-mock-payment]")) {
      startMockPayment();
      return;
    }
    if (event.target.closest("[data-refresh-order]")) {
      refreshActiveOrder();
      return;
    }
    if (event.target.closest("[data-checkout-finish]")) {
      closeModal(checkoutModal);
      return;
    }

    const closeButton = event.target.closest("[data-close-modal]");
    if (closeButton) {
      closeModal(closeButton.closest(".store-modal-shell"));
    }
  });

  document.addEventListener("change", event => {
    if (event.target.matches("[data-legal-terms]")) {
      state.legal.termsAccepted = event.target.checked;
      renderCheckout();
      return;
    }
    if (event.target.matches("[data-legal-instant]")) {
      state.legal.instantDeliveryAccepted = event.target.checked;
      renderCheckout();
    }
  });

  cartButton.addEventListener("click", openCart);
  $("#closeCart").addEventListener("click", () => closeCart());
  $("#browseProducts").addEventListener("click", () => {
    closeCart({ restoreFocus: false });
    $("#catalog").scrollIntoView({ behavior: "smooth" });
  });
  $("#checkoutButton").addEventListener("click", openCheckout);
  $("#applyCoupon").addEventListener("click", applyCoupon);
  couponInput.addEventListener("keydown", event => {
    if (event.key === "Enter") applyCoupon();
  });

  ["#openPlayerPanel", "#editPlayerButton", "#setPlayerButton", "#cartSetPlayer"].forEach(selector => {
    $(selector)?.addEventListener("click", openPlayerEditor);
  });

  $("#playerForm").addEventListener("submit", event => {
    event.preventDefault();
    if (!validatePlayerInput()) {
      playerFormError.textContent = "Nick musí mít 3–16 znaků a obsahovat jen písmena, čísla nebo podtržítko.";
      return;
    }
    savePlayer(playerNameInput.value);
  });
  playerNameInput.addEventListener("input", () => {
    validatePlayerInput();
    playerFormError.textContent = "";
  });

  storeOverlay.addEventListener("click", closeAllPanels);
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeAllPanels();
  });

  $("#copyServerIp").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("play.minekube.cz");
      showToast("Adresa zkopírována", "play.minekube.cz je ve schránce.");
    } catch {
      showToast("Adresa serveru", "play.minekube.cz");
    }
  });

  $$(".faq-item > button").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const next = !item.classList.contains("open");
      $$(".faq-item").forEach(other => {
        other.classList.remove("open");
        $("button", other).setAttribute("aria-expanded", "false");
      });
      item.classList.toggle("open", next);
      button.setAttribute("aria-expanded", String(next));
    });
  });

  const primary = $(".store-primary-action");
  primary?.addEventListener("pointermove", event => {
    const rect = primary.getBoundingClientRect();
    primary.style.setProperty("--pointer-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    primary.style.setProperty("--pointer-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  });
}

async function init() {
  hydrateState();
  await loadApiData();
  initTheme();
  initLoader();
  initMobileNavigation();
  initScrollExperience();
  updateCategoryCounts();
  renderProducts();
  renderCart();
  bindEvents();
  $("#currentYear").textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", init);

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
    name: "Rank VIP",
    code: "VIP // 30D",
    category: "ranks",
    categoryLabel: "RANK • 30 DNÍ",
    badge: "COMMUNITY",
    icon: "crown",
    accent: "#ffbd29",
    accentRgb: "255,189,41",
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
    name: "Rank MVP",
    code: "MVP // 30D",
    category: "ranks",
    categoryLabel: "RANK • 30 DNÍ",
    badge: "OBLÍBENÉ",
    icon: "star",
    accent: "#ff5bac",
    accentRgb: "255,91,172",
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
    name: "Rank ELITE",
    code: "ELITE // 30D",
    category: "ranks",
    categoryLabel: "RANK • 30 DNÍ",
    badge: "NEJVYŠŠÍ",
    icon: "crystal",
    accent: "#ca6cff",
    accentRgb: "202,108,255",
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
    badge: "NAVŽDY",
    icon: "shield",
    accent: "#ffe46f",
    accentRgb: "255,228,111",
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
    badge: "RYCHLÁ ODMĚNA",
    icon: "key",
    accent: "#ffb31f",
    accentRgb: "255,179,31",
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
    badge: "EPICKÁ ODMĚNA",
    icon: "keys",
    accent: "#ff5cab",
    accentRgb: "255,92,171",
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
    badge: "VZÁCNÉ",
    icon: "crystal",
    accent: "#c86cff",
    accentRgb: "200,108,255",
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
    badge: "MĚNA",
    icon: "coins",
    accent: "#ffd55b",
    accentRgb: "255,213,91",
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
    badge: "NEJVÝHODNĚJŠÍ",
    icon: "coins",
    accent: "#ff9f1b",
    accentRgb: "255,159,27",
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
    name: "Startovací balíček",
    code: "BUNDLE // START",
    category: "bundles",
    categoryLabel: "BALÍČEK • STARTER",
    badge: "STARTOVACÍ NABÍDKA",
    icon: "gift",
    accent: "#ffbf2d",
    accentRgb: "255,191,45",
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
    name: "Válečnický balíček",
    code: "BUNDLE // WARRIOR",
    category: "bundles",
    categoryLabel: "BALÍČEK • WARRIOR",
    badge: "SILNÝ BALÍČEK",
    icon: "sword",
    accent: "#ff613f",
    accentRgb: "255,97,63",
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
    name: "Kolekce částic",
    code: "COSMETIC // FX",
    category: "cosmetics",
    categoryLabel: "KOSMETIKA • EFEKTY",
    badge: "VIZUÁLNÍ EFEKTY",
    icon: "particles",
    accent: "#ff5fae",
    accentRgb: "255,95,174",
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
    name: "Balíček společníků",
    code: "COSMETIC // PET",
    category: "cosmetics",
    categoryLabel: "KOSMETIKA • PETI",
    badge: "SPOLEČNÍCI",
    icon: "pet",
    accent: "#bd76ff",
    accentRgb: "189,118,255",
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



const currencyPurchaseProducts = [
  {
    id: "premium-coins-500",
    name: "500 Premium Coins",
    code: "PREMIUM // 500",
    category: "currency",
    categoryLabel: "MĚNA • PREMIUM COINS",
    badge: "PRÉMIOVÁ MĚNA",
    icon: "coins",
    accent: "#ffd21c",
    accentRgb: "255,210,28",
    price: 126,
    oldPrice: null,
    sale: 0,
    featured: 200,
    maxQty: 10,
    description: "Balíček 500 Premium Coins pro nákupy kosmetiky, služeb a prémiového obsahu.",
    features: ["500 Premium Coins", "Okamžité připsání", "Bez expirace", "Celá síť"],
    tags: ["500 coinů", "Premium", "Měna"],
    currencyType: "premium",
    currencyAmount: 500,
    bonusLabel: "",
    artTier: 1,
    currencyOnly: true
  },
  {
    id: "premium-coins-1000",
    name: "1 000 Premium Coins",
    code: "PREMIUM // 1K",
    category: "currency",
    categoryLabel: "MĚNA • PREMIUM COINS",
    badge: "PRÉMIOVÁ MĚNA",
    icon: "coins",
    accent: "#ffd21c",
    accentRgb: "255,210,28",
    price: 249,
    oldPrice: null,
    sale: 0,
    featured: 201,
    maxQty: 10,
    description: "Balíček 1 000 Premium Coins pro nákupy kosmetiky, služeb a prémiového obsahu.",
    features: ["1 000 Premium Coins", "Okamžité připsání", "Bez expirace", "Celá síť"],
    tags: ["1 000 coinů", "Premium", "Měna"],
    currencyType: "premium",
    currencyAmount: 1000,
    bonusLabel: "",
    artTier: 2,
    currencyOnly: true
  },
  {
    id: "premium-coins-2200",
    name: "2 200 Premium Coins",
    code: "PREMIUM // 2.2K",
    category: "currency",
    categoryLabel: "MĚNA • PREMIUM COINS",
    badge: "10% BONUS",
    icon: "coins",
    accent: "#ffd21c",
    accentRgb: "255,210,28",
    price: 499,
    oldPrice: null,
    sale: 0,
    featured: 202,
    maxQty: 10,
    description: "Balíček 2 200 Premium Coins včetně 10% bonusu.",
    features: ["2 200 Premium Coins", "10% bonus", "Okamžité připsání", "Bez expirace"],
    tags: ["2 200 coinů", "10% bonus", "Premium"],
    currencyType: "premium",
    currencyAmount: 2200,
    bonusLabel: "10% BONUS",
    artTier: 3,
    currencyOnly: true
  },
  {
    id: "premium-coins-4500",
    name: "4 500 Premium Coins",
    code: "PREMIUM // 4.5K",
    category: "currency",
    categoryLabel: "MĚNA • PREMIUM COINS",
    badge: "12% BONUS",
    icon: "coins",
    accent: "#ffd21c",
    accentRgb: "255,210,28",
    price: 997,
    oldPrice: null,
    sale: 0,
    featured: 203,
    maxQty: 10,
    description: "Balíček 4 500 Premium Coins včetně 12% bonusu.",
    features: ["4 500 Premium Coins", "12% bonus", "Okamžité připsání", "Bez expirace"],
    tags: ["4 500 coinů", "12% bonus", "Premium"],
    currencyType: "premium",
    currencyAmount: 4500,
    bonusLabel: "12% BONUS",
    artTier: 4,
    currencyOnly: true
  },
  {
    id: "premium-coins-6900",
    name: "6 900 Premium Coins",
    code: "PREMIUM // 6.9K",
    category: "currency",
    categoryLabel: "MĚNA • PREMIUM COINS",
    badge: "15% BONUS",
    icon: "coins",
    accent: "#ffd21c",
    accentRgb: "255,210,28",
    price: 1496,
    oldPrice: null,
    sale: 0,
    featured: 204,
    maxQty: 10,
    description: "Balíček 6 900 Premium Coins včetně 15% bonusu.",
    features: ["6 900 Premium Coins", "15% bonus", "Okamžité připsání", "Bez expirace"],
    tags: ["6 900 coinů", "15% bonus", "Premium"],
    currencyType: "premium",
    currencyAmount: 6900,
    bonusLabel: "15% BONUS",
    artTier: 5,
    currencyOnly: true
  },
  {
    id: "premium-coins-11800",
    name: "11 800 Premium Coins",
    code: "PREMIUM // 11.8K",
    category: "currency",
    categoryLabel: "MĚNA • PREMIUM COINS",
    badge: "18% BONUS",
    icon: "coins",
    accent: "#ffd21c",
    accentRgb: "255,210,28",
    price: 2493,
    oldPrice: null,
    sale: 0,
    featured: 205,
    maxQty: 10,
    description: "Největší balíček 11 800 Premium Coins včetně 18% bonusu.",
    features: ["11 800 Premium Coins", "18% bonus", "Okamžité připsání", "Bez expirace"],
    tags: ["11 800 coinů", "18% bonus", "Premium"],
    currencyType: "premium",
    currencyAmount: 11800,
    bonusLabel: "18% BONUS",
    artTier: 6,
    currencyOnly: true
  },
  {
    id: "mythic-prisms-10",
    name: "10 Mythic Prisms",
    code: "MYTHIC // 10",
    category: "mythic-currency",
    categoryLabel: "MĚNA • MYTHIC PRISMS",
    badge: "MYTHIC MĚNA",
    icon: "mythicPrism",
    accent: "#25f5ff",
    accentRgb: "37,245,255",
    price: 249,
    oldPrice: null,
    sale: 0,
    featured: 210,
    maxQty: 10,
    description: "Balíček 10 Mythic Prisms pro nejvzácnější Mythic nabídku.",
    features: ["10 Mythic Prisms", "Mythic nabídka", "Okamžité připsání", "Bez expirace"],
    tags: ["10 prismů", "Mythic", "Měna"],
    currencyType: "mythic",
    currencyAmount: 10,
    bonusLabel: "",
    artTier: 1,
    currencyOnly: true
  },
  {
    id: "mythic-prisms-30",
    name: "30 Mythic Prisms",
    code: "MYTHIC // 30",
    category: "mythic-currency",
    categoryLabel: "MĚNA • MYTHIC PRISMS",
    badge: "20% BONUS",
    icon: "mythicPrism",
    accent: "#25f5ff",
    accentRgb: "37,245,255",
    price: 622,
    oldPrice: null,
    sale: 0,
    featured: 211,
    maxQty: 10,
    description: "Balíček 30 Mythic Prisms včetně 20% bonusu.",
    features: ["30 Mythic Prisms", "20% bonus", "Mythic nabídka", "Bez expirace"],
    tags: ["30 prismů", "20% bonus", "Mythic"],
    currencyType: "mythic",
    currencyAmount: 30,
    bonusLabel: "20% BONUS",
    artTier: 2,
    currencyOnly: true
  },
  {
    id: "mythic-prisms-50",
    name: "50 Mythic Prisms",
    code: "MYTHIC // 50",
    category: "mythic-currency",
    categoryLabel: "MĚNA • MYTHIC PRISMS",
    badge: "25% BONUS",
    icon: "mythicPrism",
    accent: "#25f5ff",
    accentRgb: "37,245,255",
    price: 997,
    oldPrice: null,
    sale: 0,
    featured: 212,
    maxQty: 10,
    description: "Balíček 50 Mythic Prisms včetně 25% bonusu.",
    features: ["50 Mythic Prisms", "25% bonus", "Mythic nabídka", "Bez expirace"],
    tags: ["50 prismů", "25% bonus", "Mythic"],
    currencyType: "mythic",
    currencyAmount: 50,
    bonusLabel: "25% BONUS",
    artTier: 3,
    currencyOnly: true
  },
  {
    id: "mythic-prisms-100",
    name: "100 Mythic Prisms",
    code: "MYTHIC // 100",
    category: "mythic-currency",
    categoryLabel: "MĚNA • MYTHIC PRISMS",
    badge: "33% BONUS",
    icon: "mythicPrism",
    accent: "#25f5ff",
    accentRgb: "37,245,255",
    price: 1870,
    oldPrice: null,
    sale: 0,
    featured: 213,
    maxQty: 10,
    description: "Největší balíček 100 Mythic Prisms včetně 33% bonusu.",
    features: ["100 Mythic Prisms", "33% bonus", "Mythic nabídka", "Bez expirace"],
    tags: ["100 prismů", "33% bonus", "Mythic"],
    currencyType: "mythic",
    currencyAmount: 100,
    bonusLabel: "33% BONUS",
    artTier: 4,
    currencyOnly: true
  }
];

function mergeCurrencyPurchaseProducts(catalog) {
  const base = Array.isArray(catalog) ? catalog.filter(product => !product?.currencyOnly && !currencyPurchaseProducts.some(pack => pack.id === product?.id)) : [];
  return [...base, ...currencyPurchaseProducts];
}

products = mergeCurrencyPurchaseProducts(products);

const categoryNames = {
  all: "Doporučené",
  mythic: "Mythic",
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
  billing: new Map(),
  currencyBilling: "onetime",
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
      products = mergeCurrencyPurchaseProducts(productPayload.products);
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
const currencySelectModal = $("#currencySelectModal");
const currencyPacksModal = $("#currencyPacksModal");
const currencyPacksGrid = $("#currencyPacksGrid");
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

  const savedCurrencyBilling = safeStorageGet("minekube-store-currency-billing", "onetime");
  if (savedCurrencyBilling === "subscription") state.currencyBilling = "subscription";

  const savedBilling = safeStorageGet("minekube-store-billing", []);
  if (Array.isArray(savedBilling)) {
    savedBilling.forEach(entry => {
      if (Array.isArray(entry) && entry.length === 2) state.billing.set(entry[0], entry[1]);
    });
  }
}

function persistCart() {
  safeStorageSet("minekube-store-cart", [...state.cart].map(([id, quantity]) => ({ id, quantity })));
}

function money(value) {
  // Zobrazovanou měnu řídí přepínač CZK / EUR (currency-switch.js).
  // Ceny v datech jsou vždy v CZK; EUR je jen orientační přepočet.
  if (window.MINEKUBE_FX) return window.MINEKUBE_FX.format(value);

  const normalized = Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  const hasHalere = Math.abs(normalized - Math.round(normalized)) > 0.000001;
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    minimumFractionDigits: hasHalere ? 2 : 0,
    maximumFractionDigits: 2
  }).format(normalized);
}

/* Přeškrtnutá původní cena. Po zaokrouhlení na devítky se může
   střetnout s aktuální cenou, proto ji řeší přepínač měny zvlášť. */
function moneyOld(oldValue, currentValue) {
  if (window.MINEKUBE_FX) return window.MINEKUBE_FX.formatOld(oldValue, currentValue);
  return money(oldValue);
}

function svgIcon(name, className = "") {
  if (name === "coins" || name === "mythicPrism") {
    const fileName = name === "coins" ? "coins-icon.png" : "prims-icon.png";
    const currencyClass = name === "coins" ? "is-coins" : "is-prims";
    return `<img class="currency-product-icon ${currencyClass} ${className}" src="assets/${fileName}" alt="" aria-hidden="true">`;
  }
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

function isMythicProduct(product) {
  return product?.currencyType === "mythic" || ["elite-30", "legendary-key", "particle-pack", "pet-pack", "mvp-30"].includes(product?.id);
}

function productVisualLabel(product) {
  if (product.category === "ranks") return "RANK";
  if (product.category === "keys") return "KLÍČ";
  if (product.category === "currency") return "MĚNA";
  if (product.category === "bundles") return "BALÍČEK";
  return "KOSMETIKA";
}

/* --- Předplatné herních měn ---------------------------------------------
   Měsíční předplatné se týká výhradně balíčků Mythic Prisms a Premium Coins.
   Ranky, klíče, kosmetika a bundly zůstávají jednorázové.

   POZOR: Store API zatím opakované platby neumí – objednávku s příznakem
   předplatného přijme, ale naúčtuje plnou jednorázovou cenu (ověřeno).
   Bonus proto musí zůstat na 0, jinak by hráč viděl jinou částku, než
   kolik mu strhne PayPal. Až backend předplatné podpoří, stačí zvýšit
   tuhle hodnotu (např. 0.10 = 10 % coinů navíc každý měsíc). */
const SUBSCRIPTION_BONUS = 0;

function effectivePrice(product) {
  return product.price;
}

function createProductCard(product, index) {
  const inCart = state.cart.has(product.id);
  const mythic = isMythicProduct(product);
   return `
    <article class="store-product-card ${mythic ? "is-mythic-product" : ""} is-entering" data-product-id="${product.id}" data-product-category="${product.category}" style="--product-accent:${product.accent};--product-accent-rgb:${product.accentRgb};--delay:${Math.min(index * 45, 360)}ms" tabindex="0" role="button" aria-label="Zobrazit detail produktu ${product.name}">
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
        <span class="product-detail-hint">${svgIcon("info")} Zobrazit detail</span>
      </div>
      <div class="product-content">
        <div class="product-category-label"><span>${product.categoryLabel}</span><b>MK-${String(products.indexOf(product) + 1).padStart(2, "0")}</b></div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <ul class="product-feature-list">
          ${product.features.slice(0, 3).map(feature => `<li>${svgIcon("check")}<span>${feature}</span></li>`).join("")}
        </ul>
        <div class="product-price-row">
          <div class="product-price"><strong>${money(product.price)}</strong>${product.oldPrice ? `<del>${moneyOld(product.oldPrice, product.price)}</del>` : ""}</div>
          <small class="mk-billing-static">${product.category === "ranks" ? "za rank" : "jednorázově"}</small>
        </div>
        <div class="product-actions">
          <button class="add-to-cart-button ${inCart ? "is-added" : ""}" type="button" data-add-product="${product.id}">
            ${svgIcon(inCart ? "check" : "cart")}
            <span>${inCart ? "V košíku" : "Přidat do košíku"}</span>
          </button>
        </div>
      </div>
    </article>`;
}

function filteredProducts() {
  const query = state.search.trim().toLocaleLowerCase("cs");
  const result = products.filter(product => {
    if (product.currencyOnly) return false;
    const categoryMatch = state.category === "all" || (state.category === "mythic" ? isMythicProduct(product) : product.category === state.category);
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
    const visibleProducts = products.filter(product => !product.currencyOnly);
    node.textContent = category === "all" ? visibleProducts.length : category === "mythic" ? visibleProducts.filter(isMythicProduct).length : visibleProducts.filter(product => product.category === category).length;
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
    document.body.dataset.storeView = category;
    const titles = {
      all: ["Doporučená nabídka", "Vybrané produkty a nejlepší balíčky pro Minekube Network."],
      mythic: ["Mythic kolekce", "Nejvzácnější ranky, efekty a odměny v neonově-galaktické edici."],
      ranks: ["Ranky", "Časové i trvalé úrovně se síťovými výhodami."],
      keys: ["Klíče", "Odemkni bedny a získej hodnotné serverové odměny."],
      currency: ["MineCoins", "Serverová měna pro kosmetiku, služby a komunitní obsah."],
      bundles: ["Balíčky", "Zvýhodněné kombinace několika produktů v jednom."],
      cosmetics: ["Kosmetika", "Částice, peti a vizuální efekty pro tvůj účet."]
    };
    const current = titles[category] || titles.all;
    const title = document.querySelector("#catalogTitle");
    const copy = document.querySelector(".store-section-heading > div > p");
    if (title) title.innerHTML = `${current[0]} <span>${category === "mythic" ? "// NEON" : "// MINEKUBE"}</span>`;
    if (copy) copy.textContent = current[1];
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

function currencyProductSet(type) {
  return products
    .filter(product => product.currencyType === type)
    .sort((a, b) => Number(a.currencyAmount) - Number(b.currencyAmount));
}

function currencyAmountLabel(product, type) {
  const formatted = new Intl.NumberFormat("cs-CZ").format(product.currencyAmount || 0);
  return type === "premium" ? `${formatted}` : `${formatted}`;
}

function currencyPackBonus(product) {
  return String(product.bonusLabel || "").trim();
}

function createCurrencyPackArtwork(product, type) {
  const tier = Math.max(1, Number(product.artTier) || 1);
  const pieces = Array.from({ length: tier }, (_, index) => `<i class="currency-art-piece p${index + 1}"></i>`).join("");
  if (type === "premium") {
    return `
      <span class="currency-art-scene premium-scene tier-${tier}">
        <i class="premium-coin-emblem"><b>M</b></i>
        <span class="premium-coin-pile">${pieces}</span>
        ${tier >= 3 ? '<i class="premium-vault-box box-a"></i>' : ''}
        ${tier >= 4 ? '<i class="premium-vault-box box-b"></i>' : ''}
        ${tier >= 5 ? '<i class="premium-vault-box box-c"></i>' : ''}
        <i class="currency-art-ground"></i>
      </span>`;
  }
  return `
    <span class="currency-art-scene mythic-scene tier-${tier}">
      <i class="mythic-prism-emblem"><b></b><em></em></i>
      <span class="mythic-prism-pile">${pieces}</span>
      ${tier >= 2 ? '<i class="mythic-vault-box box-a"></i>' : ''}
      ${tier >= 3 ? '<i class="mythic-vault-box box-b"></i>' : ''}
      ${tier >= 4 ? '<i class="mythic-vault-box box-c"></i>' : ''}
      <i class="currency-art-ground"></i>
    </span>`;
}

function createCurrencyPackCard(product, index, type) {
  const isPremium = type === "premium";
  const themeClass = isPremium ? "is-premium" : "is-mythic";
  const label = currencyAmountLabel(product, type);
  const bonus = currencyPackBonus(product);
  return `
    <button class="currency-pack-card ${themeClass} tier-${product.artTier}" type="button" data-currency-pack="${product.id}" style="--pack-accent:${product.accent};--pack-accent-rgb:${product.accentRgb};--pack-delay:${Math.min(index * 75, 375)}ms">
      <span class="currency-pack-art">
        <i class="currency-pack-pattern" aria-hidden="true"></i>
        <i class="currency-pack-glow" aria-hidden="true"></i>
        ${createCurrencyPackArtwork(product, type)}
      </span>
      ${bonus ? `<span class="currency-pack-bonus">${bonus}</span>` : ""}
      <span class="currency-pack-copy">
        <strong>${isPremium ? '<i class="ow-currency-coin">M</i>' : '<i class="ow-currency-gem"></i>'}<span>${label}</span></strong>
        <b>${money(product.price)}${state.currencyBilling === "subscription" ? " / měsíc" : ""}</b>
        ${state.currencyBilling === "subscription" ? '<small class="currency-pack-recurring">Obnovuje se každých 30 dní</small>' : ""}
      </span>
    </button>`;
}

/* Záložky jednorázové dobití / měsíční předplatné nad balíčky měn. */
function renderCurrencyBillingTabs() {
  const host = $("#currencyBillingTabs");
  if (!host) return;
  const subscribed = state.currencyBilling === "subscription";
  host.innerHTML = `
    <button type="button" data-currency-billing="onetime" aria-pressed="${!subscribed}">Jednorázové dobití</button>
    <button type="button" data-currency-billing="subscription" aria-pressed="${subscribed}">Měsíční předplatné</button>`;
}

function setCurrencyBilling(mode) {
  const next = mode === "subscription" ? "subscription" : "onetime";
  if (state.currencyBilling === next) return;
  state.currencyBilling = next;
  safeStorageSet("minekube-store-currency-billing", next);
  if (state.activeCurrencyType) renderCurrencyPacks(state.activeCurrencyType);
}

function renderCurrencyPacks(type) {
  const items = currencyProductSet(type);
  const premium = type === "premium";
  const subscribed = state.currencyBilling === "subscription";
  const currencyName = premium ? "Premium Coins" : "Mythic Prisms";
  const title = $("#currencyPacksTitle");
  const kicker = $("#currencyPacksKicker");
  const description = $("#currencyPacksDescription");
  const balance = $("#currencyPacksBalance");
  const footerCopy = $(".currency-packs-footer > span");
  currencyPacksModal.dataset.currencyType = type;
  currencyPacksModal.dataset.currencyBilling = state.currencyBilling;
  title.textContent = `${subscribed ? "Předplatit" : "Koupit"} ${currencyName}`;
  kicker.textContent = premium ? "PRÉMIOVÁ MĚNA" : "MYTHIC MĚNA";
  description.textContent = subscribed
    ? `Balíček ${currencyName} se ti připíše každý měsíc automaticky. Zrušíš kdykoli.`
    : `Vyber přesný balíček ${currencyName}. Kliknutím jej přidáš do košíku.`;
  renderCurrencyBillingTabs();
  balance.innerHTML = premium
    ? '<i class="ow-currency-coin">M</i><strong>503</strong><small>PREMIUM COINS</small>'
    : '<i class="ow-currency-gem"></i><strong>0</strong><small>MYTHIC PRISMS</small>';
  if (footerCopy) {
    footerCopy.textContent = subscribed
      ? "Předplatné se obnovuje každých 30 dní, zrušit ho můžeš ve svém profilu."
      : premium
        ? "Po výběru se balíček automaticky přidá do košíku a košík se otevře."
        : "80 Mythic Prisms lze získat dokončením Premium Battle Passu.";
  }
  currencyPacksGrid.innerHTML = items.map((product, index) => createCurrencyPackCard(product, index, type)).join("");
}

function openCurrencySelector() {
  closeCart({ restoreFocus: false });
  closeModal(currencyPacksModal, { restoreFocus: false });
  openModal(currencySelectModal);
}

function openCurrencyPacks(type) {
  state.activeCurrencyType = type;
  renderCurrencyPacks(type);
  closeModal(currencySelectModal, { restoreFocus: false });
  openModal(currencyPacksModal);
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
  const subtotal = cartEntries().reduce((sum, { product, quantity }) => sum + effectivePrice(product) * quantity, 0);
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
      <div class="cart-item-copy"><small>${state.billing.get(product.id) === "subscription" ? "MĚSÍČNĚ • " : ""}${product.categoryLabel}</small><strong>${product.name}</strong><span>${money(product.price * amount)}</span></div>
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

  const chip = $("#owPlayerChip");
  if (chip) {
    $("span", chip).textContent = avatarText;
    $("strong", chip).textContent = name || "HRÁČ";
  }

  // Profil v hlavičce si drží vlastní vykreslení.
  window.MINEKUBE_PROFILE?.refresh();

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
        <small>PRODUKT MINEKUBE // ${product.code}</small>
      </div>
      <div class="product-modal-copy" style="--modal-accent-rgb:${product.accentRgb}">
        <span class="modal-kicker"><i></i>${product.categoryLabel}</span>
        <h2 id="productModalTitle">${product.name}</h2>
        <p>${product.description}</p>
        <div class="modal-product-meta">${product.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
        <div class="modal-feature-box"><strong>CO PRODUKT OBSAHUJE</strong><ul>${product.features.map(feature => `<li>${svgIcon("check")}<span>${feature}</span></li>`).join("")}</ul></div>
        <div class="modal-buy-row">
          <div class="modal-price"><small>CENA PRODUKTU</small><span><strong>${money(product.price)}</strong>${product.oldPrice ? `<del>${moneyOld(product.oldPrice, product.price)}</del>` : ""}</span></div>
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
          ${cartEntries().map(({ product, quantity }) => `<div class="checkout-summary-item"><span>${svgIcon(product.icon)}</span><div><small>${quantity}× ${product.categoryLabel}</small><strong>${product.name}</strong></div><b>${money(effectivePrice(product) * quantity)}</b></div>`).join("")}
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
          <strong>${unavailable ? "Platební API není dostupné." : `PLATEBNÍ KANÁL MINEKUBE // ${mode.toUpperCase()}`}</strong>
          <span id="paymentStatus">${unavailable ? "Spusť store-api a zkontroluj store-config.js." : legalReady ? "Připravuji zabezpečené platební tlačítko…" : "Nejdřív potvrď obě povinná políčka výše."}</span>
        </div>
        <div class="checkout-summary-total"><span>Celkem k úhradě</span><strong>${money(totals.total)}</strong></div>
        ${window.MINEKUBE_FX && !window.MINEKUBE_FX.isBase ? `<div class="mk-fx-note"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 11v5M12 8h.01"></path></svg><span>Zobrazená částka v ${window.MINEKUBE_FX.current} je orientační přepočet. Platba proběhne v CZK.</span></div>` : ""}
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
      items: cartEntries().map(({ product, quantity }) => ({ productId: product.id, quantity, billingMode: state.billing.get(product.id) === "subscription" ? "subscription" : "onetime" }))
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

/* Zapíše dokončenou objednávku do lokální historie profilu.
   Backend zatím historii nenabízí, takže si ji držíme v prohlížeči. */
function recordOrderInProfile() {
  if (!window.MINEKUBE_PROFILE) return;
  const totals = calculateTotals();
  window.MINEKUBE_PROFILE.addOrder({
    id: state.activeOrder?.publicId || `MK-${Date.now()}`,
    date: new Date().toISOString(),
    total: totals.total,
    status: state.activeOrder?.status || "PAID",
    player: state.player,
    items: cartEntries().map(({ product, quantity }) => ({
      id: product.id,
      name: product.name,
      category: product.categoryLabel,
      quantity
    }))
  });
}

async function captureActiveOrder() {
  const payload = await apiRequest(`/api/orders/${encodeURIComponent(state.activeOrder.publicId)}/paypal/capture`, { method: "POST", body: "{}" });
  state.activeOrder = payload.order;
  clearCheckoutNonce();
  recordOrderInProfile();
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
    if (!sdkConfig.clientToken) {
      throw new Error("Minekube API nevrátilo browser-safe PayPal client token.");
    }
    const sdkInstance = await window.paypal.createInstance({
      clientToken: sdkConfig.clientToken,
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
    all: ["DOPORUČENÉ", "Načítám hlavní nabídku", "MK-S01", "#ffb31f", "255,179,31"],
    mythic: ["MYTHIC", "Otevírám neonovou kolekci", "MK-M01", "#25f5ff", "37,245,255"],
    ranks: ["RANKY", "Načítám porovnání ranků", "MK-S02", "#ffbd29", "255,189,41"],
    keys: ["KLÍČE", "Otevírám crate databázi", "MK-S03", "#ff5bac", "255,91,172"],
    currency: ["MINECOINS", "Načítám síťovou měnu", "MK-S04", "#ff9f1b", "255,159,27"],
    bundles: ["BALÍČKY", "Sestavuji zvýhodněné nabídky", "MK-S05", "#ff6b51", "255,107,81"],
    cosmetics: ["KOSMETIKA", "Aktivuji visual FX katalog", "MK-S06", "#c96cff", "201,108,255"]
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

function initGameClientShell() {
  document.querySelector("#owPlayerChip")?.addEventListener("click", openPlayerEditor);
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
    const currencyChoice = event.target.closest("[data-currency-choice]");
    if (currencyChoice) {
      openCurrencyPacks(currencyChoice.dataset.currencyChoice);
      return;
    }

    const currencyBack = event.target.closest("[data-currency-back]");
    if (currencyBack) {
      closeModal(currencyPacksModal, { restoreFocus: false });
      openModal(currencySelectModal);
      return;
    }

    const currencyBillingTab = event.target.closest("button[data-currency-billing]");
    if (currencyBillingTab) {
      setCurrencyBilling(currencyBillingTab.dataset.currencyBilling);
      return;
    }

    const currencyPack = event.target.closest("[data-currency-pack]");
    if (currencyPack) {
      // Zapamatujeme si, jestli šlo o jednorázový nákup nebo předplatné.
      state.billing.set(currencyPack.dataset.currencyPack, state.currencyBilling);
      safeStorageSet("minekube-store-billing", [...state.billing]);
      addToCart(currencyPack.dataset.currencyPack);
      closeModal(currencyPacksModal, { restoreFocus: false });
      setTimeout(openCart, 120);
      return;
    }

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

    // Kliknutí kamkoli na kartu otevře detail produktu.
    const card = event.target.closest(".store-product-card[data-product-id]");
    if (card && !event.target.closest("button, a, input, label, select")) {
      openProductDetail(card.dataset.productId);
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

  // Karta produktu je ovladatelná i klávesnicí.
  document.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest?.(".store-product-card[data-product-id]");
    if (!card || card !== event.target) return;
    event.preventDefault();
    openProductDetail(card.dataset.productId);
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

  $("#currencyHubButton")?.addEventListener("click", openCurrencySelector);
  $("#mobileCurrencyButton")?.addEventListener("click", () => {
    $("#mobileNav")?.classList.remove("open");
    $("#menuButton")?.classList.remove("open");
    $("#menuButton")?.setAttribute("aria-expanded", "false");
    openCurrencySelector();
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

/* --- Most pro profil hráče (profile-menu.js) --------------------------- */

/** Otevře/zavře modál store stylem, ať profil vypadá stejně jako zbytek. */
window.mkOpenModal = modal => openModal(modal);
window.mkCloseModal = modal => closeModal(modal);
window.mkToast = (title, message) => showToast(title, message);

/** Nastaví hráče z profilu do storu (košík, checkout, hlavička). */
window.mkSyncPlayer = function mkSyncPlayer(name) {
  state.player = String(name || "").trim();
  safeStorageSet("minekube-store-player", state.player);
  renderPlayerUI();
  renderCart();
  window.MINEKUBE_PROFILE?.refresh();
};

/* Překreslí všechny ceny po přepnutí zobrazované měny. */
window.mkRefreshPrices = function mkRefreshPrices() {
  try {
    renderProducts();
    renderCart();
    if (state.activeCurrencyType) renderCurrencyPacks(state.activeCurrencyType);
    if (checkoutModal?.classList.contains("is-open")) renderCheckout();
  } catch (error) {
    console.error("Nepodařilo se překreslit ceny:", error);
  }
};

async function init() {
  hydrateState();
  await loadApiData();
  initTheme();
  initLoader();
  initGameClientShell();
  initMobileNavigation();
  initScrollExperience();
  updateCategoryCounts();
  renderProducts();
  renderCart();
  bindEvents();
  $("#currentYear").textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", init);

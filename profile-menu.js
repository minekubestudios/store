"use strict";

/*
 * Minekube Store — profil hráče
 * -----------------------------
 * Chip v hlavičce + rozbalovací nabídka: nastavení účtu, transakce,
 * nákupy, správa předplatného a odhlášení.
 *
 * DŮLEŽITÉ – rozsah této fáze:
 * Store API zatím nemá uživatelské účty ani historii objednávek
 * (/api/me i /api/orders vracejí 404). Profil proto pracuje s údaji
 * uloženými v prohlížeči – Minecraft nick, e-mail a lokální záznam
 * o dokončených objednávkách. Jde tedy o hotové rozhraní připravené
 * na napojení, ne o ověřené přihlášení.
 *
 * Až backend účty dostane, stačí přepsat funkce ve výměnném bloku
 * PROFILE_DATA dole – zbytek kódu zůstane beze změny.
 */

window.MINEKUBE_PROFILE = (function () {
  const KEY_PLAYER = "minekube-store-player";
  const KEY_EMAIL = "minekube-store-profile-email";
  const KEY_ORDERS = "minekube-store-orders";
  const KEY_SUBS = "minekube-store-subscriptions";

  const listeners = new Set();

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch { return fallback; }
  }

  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* volitelné */ }
  }

  function emit() {
    listeners.forEach(fn => { try { fn(); } catch (e) { console.error(e); } });
  }

  const api = {
    get player() { return read(KEY_PLAYER, "") || ""; },
    get email() { return read(KEY_EMAIL, "") || ""; },
    get isSignedIn() { return Boolean(api.player); },

    setPlayer(name) {
      write(KEY_PLAYER, String(name || "").trim());
      emit();
    },

    setEmail(mail) {
      write(KEY_EMAIL, String(mail || "").trim());
      emit();
    },

    /** Historie transakcí – zatím lokální záznam dokončených objednávek. */
    get orders() {
      const list = read(KEY_ORDERS, []);
      return Array.isArray(list) ? list : [];
    },

    /** Zapíše objednávku do lokální historie (volá se po dokončení platby). */
    addOrder(order) {
      if (!order) return;
      const list = api.orders;
      if (list.some(item => item.id === order.id)) return;
      list.unshift(order);
      write(KEY_ORDERS, list.slice(0, 50));
      emit();
    },

    /** Zakoupené položky poskládané z historie objednávek. */
    get purchases() {
      const map = new Map();
      api.orders.forEach(order => {
        (order.items || []).forEach(item => {
          const key = item.id || item.name;
          const found = map.get(key);
          if (found) {
            found.quantity += Number(item.quantity) || 1;
            if (order.date > found.date) found.date = order.date;
          } else {
            map.set(key, {
              id: key,
              name: item.name,
              category: item.category || "",
              quantity: Number(item.quantity) || 1,
              date: order.date
            });
          }
        });
      });
      return [...map.values()].sort((a, b) => String(b.date).localeCompare(String(a.date)));
    },

    get subscriptions() {
      const list = read(KEY_SUBS, []);
      return Array.isArray(list) ? list : [];
    },

    signOut() {
      try {
        localStorage.removeItem(KEY_PLAYER);
        localStorage.removeItem(KEY_EMAIL);
      } catch { /* volitelné */ }
      emit();
    },

    /** Vynutí překreslení – když nick zapsal někdo jiný (store, checkout). */
    refresh() { emit(); },

    onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }
  };

  return api;
})();

/* -------------------------------------------------------------------------
   Rozhraní
   ------------------------------------------------------------------------- */
(function () {
  const P = window.MINEKUBE_PROFILE;

  const ICONS = {
    settings: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"></path></svg>',
    history: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"></path><path d="M3 3v5h5"></path><path d="M12 7v5l3 2"></path></svg>',
    box: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 8 12 3 3 8l9 5 9-5Z"></path><path d="M3 8v8l9 5 9-5V8"></path><path d="M12 13v8"></path></svg>',
    refresh: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-7.5-4"></path><path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 7.5 4"></path><path d="M21 3v5h-5"></path><path d="M3 21v-5h5"></path></svg>',
    logout: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><path d="m16 17 5-5-5-5"></path><path d="M21 12H9"></path></svg>',
    caret: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 9 4-4 4 4"></path><path d="m16 15-4 4-4-4"></path></svg>',
    emptyBox: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 8 12 3 3 8l9 5 9-5Z"></path><path d="M3 8v8l9 5 9-5V8"></path></svg>'
  };

  const MENU = [
    { id: "settings", label: "Nastavení účtu", icon: "settings" },
    { id: "transactions", label: "Moje transakce", icon: "history" },
    { id: "purchases", label: "Moje nákupy", icon: "box" },
    { id: "subscriptions", label: "Správa předplatného", icon: "refresh" }
  ];

  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));

  const money = value => (window.MINEKUBE_FX
    ? window.MINEKUBE_FX.format(value)
    : `${value} Kč`);

  const formatDate = iso => {
    const d = new Date(iso);
    return Number.isNaN(d.getTime())
      ? "—"
      : d.toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" });
  };

  /** Hlavička Minecraft skinu; když nick není, ukáže se iniciála. */
  function avatarMarkup(name, className = "") {
    if (!name) return `<div class="mk-avatar is-empty ${className}"><span>?</span></div>`;
    const url = `https://minotar.net/helm/${encodeURIComponent(name)}/64.png`;
    return `<div class="mk-avatar ${className}"><img src="${url}" alt="" loading="lazy"
      onerror="this.parentElement.classList.add('is-empty');this.replaceWith(Object.assign(document.createElement('span'),{textContent:'${esc(name.slice(0, 2).toUpperCase())}'}))"></div>`;
  }

  /* --- panely ------------------------------------------------------------ */

  function panelSettings() {
    return {
      title: "Nastavení účtu",
      kicker: "PROFIL HRÁČE",
      body: `
        <form class="mk-panel-form" id="mkProfileForm" novalidate>
          <div class="mk-field">
            <label for="mkProfileNick">Minecraft nick</label>
            <input id="mkProfileNick" type="text" value="${esc(P.player)}"
                   minlength="3" maxlength="16" pattern="[A-Za-z0-9_]{3,16}"
                   placeholder="Např. Unknown72_" autocomplete="off">
            <small>Na tento účet se doručují všechny objednávky. 3–16 znaků, písmena, čísla a podtržítko.</small>
          </div>
          <div class="mk-field">
            <label for="mkProfileEmail">Kontaktní e-mail</label>
            <input id="mkProfileEmail" type="email" value="${esc(P.email)}"
                   placeholder="tvuj@email.cz" autocomplete="email">
            <small>Nepovinný. Slouží jen k dohledání objednávky, pokud by něco nedorazilo.</small>
          </div>
          <div class="mk-field-error" id="mkProfileError" role="alert"></div>
          <div class="mk-panel-actions">
            <button class="mk-button is-primary" type="submit">Uložit změny</button>
            <button class="mk-button is-ghost" type="button" data-close-modal>Zrušit</button>
          </div>
        </form>`
    };
  }

  function panelTransactions() {
    const orders = P.orders;
    if (!orders.length) {
      return {
        title: "Moje transakce",
        kicker: "HISTORIE PLATEB",
        body: emptyState("Zatím žádné transakce",
          "Až dokončíš první objednávku, najdeš tady její přehled včetně částky a stavu doručení.")
      };
    }
    return {
      title: "Moje transakce",
      kicker: "HISTORIE PLATEB",
      body: `<div class="mk-panel-list">${orders.map(order => `
        <div class="mk-panel-row">
          <div class="mk-panel-row-copy">
            <strong>${esc(order.id)}</strong>
            <small>${formatDate(order.date)} • ${(order.items || []).length} položek</small>
          </div>
          <span class="mk-panel-row-value">${money(order.total)}</span>
          <span class="mk-panel-badge ${order.status === "DELIVERED" ? "is-ok" : "is-wait"}">
            ${order.status === "DELIVERED" ? "Doručeno" : "Zpracovává se"}
          </span>
        </div>`).join("")}</div>`
    };
  }

  function panelPurchases() {
    const items = P.purchases;
    if (!items.length) {
      return {
        title: "Moje nákupy",
        kicker: "ZAKOUPENÝ OBSAH",
        body: emptyState("Zatím žádné nákupy",
          "Ranky, klíče a kosmetiku, které si pořídíš, uvidíš přehledně na jednom místě.")
      };
    }
    return {
      title: "Moje nákupy",
      kicker: "ZAKOUPENÝ OBSAH",
      body: `<div class="mk-panel-list">${items.map(item => `
        <div class="mk-panel-row">
          <div class="mk-panel-row-copy">
            <strong>${esc(item.name)}</strong>
            <small>${esc(item.category || "Produkt")} • naposledy ${formatDate(item.date)}</small>
          </div>
          <span class="mk-panel-row-value">${item.quantity}×</span>
        </div>`).join("")}</div>`
    };
  }

  function panelSubscriptions() {
    const subs = P.subscriptions;
    if (!subs.length) {
      return {
        title: "Správa předplatného",
        kicker: "OPAKOVANÉ PLATBY",
        body: emptyState("Žádné aktivní předplatné",
          "Minekube Store zatím nabízí jen jednorázové nákupy. Ranky s automatickým obnovením se tady objeví, jakmile je spustíme.")
      };
    }
    return {
      title: "Správa předplatného",
      kicker: "OPAKOVANÉ PLATBY",
      body: `<div class="mk-panel-list">${subs.map(sub => `
        <div class="mk-panel-row">
          <div class="mk-panel-row-copy">
            <strong>${esc(sub.name)}</strong>
            <small>Obnovení ${formatDate(sub.renewsAt)}</small>
          </div>
          <span class="mk-panel-row-value">${money(sub.price)}</span>
          <span class="mk-panel-badge ${sub.active ? "is-ok" : "is-off"}">${sub.active ? "Aktivní" : "Zrušeno"}</span>
        </div>`).join("")}</div>`
    };
  }

  function emptyState(title, text) {
    return `<div class="mk-panel-empty">${ICONS.emptyBox}<strong>${esc(title)}</strong><p>${esc(text)}</p></div>`;
  }

  const PANELS = {
    settings: panelSettings,
    transactions: panelTransactions,
    purchases: panelPurchases,
    subscriptions: panelSubscriptions
  };

  /* --- modální okno ------------------------------------------------------ */

  function ensureModal() {
    let modal = document.querySelector("#mkProfileModal");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.className = "store-modal-shell";
    modal.id = "mkProfileModal";
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "mkProfileModalTitle");
    modal.innerHTML = `
      <div class="store-modal">
        <button class="store-modal-close" type="button" data-close-modal aria-label="Zavřít">
          <svg viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"></path></svg>
        </button>
        <span class="modal-kicker"><i></i> <b data-profile-kicker></b></span>
        <h2 id="mkProfileModalTitle" data-profile-title></h2>
        <div data-profile-body></div>
      </div>`;
    document.body.appendChild(modal);
    return modal;
  }

  function openPanel(id) {
    const panel = (PANELS[id] || PANELS.settings)();
    const modal = ensureModal();
    modal.querySelector("[data-profile-kicker]").textContent = panel.kicker;
    modal.querySelector("[data-profile-title]").textContent = panel.title;
    modal.querySelector("[data-profile-body]").innerHTML = panel.body;

    if (typeof window.mkOpenModal === "function") window.mkOpenModal(modal);
    else {
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
    }

    const form = modal.querySelector("#mkProfileForm");
    if (form) {
      setTimeout(() => modal.querySelector("#mkProfileNick")?.focus(), 90);
      form.addEventListener("submit", event => {
        event.preventDefault();
        const nick = modal.querySelector("#mkProfileNick").value.trim();
        const mail = modal.querySelector("#mkProfileEmail").value.trim();
        const error = modal.querySelector("#mkProfileError");

        if (nick && !/^[A-Za-z0-9_]{3,16}$/.test(nick)) {
          error.textContent = "Nick musí mít 3–16 znaků – písmena, čísla nebo podtržítko.";
          return;
        }
        if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail)) {
          error.textContent = "Zadaný e-mail nevypadá platně.";
          return;
        }

        error.textContent = "";
        P.setPlayer(nick);
        P.setEmail(mail);

        // Necháme store převzít nick i do košíku a checkoutu.
        if (typeof window.mkSyncPlayer === "function") window.mkSyncPlayer(nick);
        if (typeof window.mkToast === "function") {
          window.mkToast("Profil uložen", nick ? `Objednávky půjdou na účet ${nick}.` : "Minecraft účet byl odebrán.");
        }
        if (typeof window.mkCloseModal === "function") window.mkCloseModal(modal);
        else modal.classList.remove("is-open");
      });
    }
  }

  /* --- chip a nabídka ---------------------------------------------------- */

  function build(suffix) {
    const wrap = document.createElement("div");
    wrap.className = "mk-profile";
    const chipId = `mkProfileChip${suffix}`;
    const menuId = `mkProfileMenu${suffix}`;

    wrap.innerHTML = `
      <button class="mk-profile-chip" id="${chipId}" type="button"
              aria-haspopup="menu" aria-expanded="false" aria-controls="${menuId}">
        <span data-profile-avatar></span>
        <span class="mk-profile-copy">
          <small>MŮJ PROFIL</small>
          <strong data-profile-name></strong>
        </span>
        <span class="mk-profile-caret">${ICONS.caret}</span>
      </button>
      <div class="mk-profile-menu" id="${menuId}" role="menu" aria-labelledby="${chipId}">
        <div class="mk-profile-head">
          <span data-profile-avatar-lg></span>
          <span class="mk-profile-head-copy">
            <strong data-profile-name></strong>
            <span data-profile-sub></span>
          </span>
        </div>
        <div class="mk-profile-divider"></div>
        ${MENU.map(item => `
          <button class="mk-profile-item" type="button" role="menuitem" data-profile-open="${item.id}">
            ${ICONS[item.icon]}<span>${item.label}</span>${item.id === "transactions" ? '<b data-profile-count hidden>0</b>' : ""}
          </button>`).join("")}
        <div class="mk-profile-divider"></div>
        <button class="mk-profile-item is-danger" type="button" role="menuitem" data-profile-signout>
          ${ICONS.logout}<span data-profile-signout-label>Odhlásit se</span>
        </button>
      </div>`;

    const chip = wrap.querySelector(".mk-profile-chip");

    const close = () => {
      wrap.classList.remove("is-open");
      chip.setAttribute("aria-expanded", "false");
    };
    const open = () => {
      document.querySelectorAll(".mk-profile.is-open, .mk-fx.is-open").forEach(el => {
        if (el === wrap) return;
        el.classList.remove("is-open");
        el.querySelector("button")?.setAttribute("aria-expanded", "false");
      });
      wrap.classList.add("is-open");
      chip.setAttribute("aria-expanded", "true");
    };

    chip.addEventListener("click", event => {
      event.stopPropagation();
      wrap.classList.contains("is-open") ? close() : open();
    });

    wrap.querySelectorAll("[data-profile-open]").forEach(button => {
      button.addEventListener("click", event => {
        event.stopPropagation();
        close();
        openPanel(button.dataset.profileOpen);
      });
    });

    wrap.querySelector("[data-profile-signout]").addEventListener("click", event => {
      event.stopPropagation();
      close();
      if (!P.isSignedIn) { openPanel("settings"); return; }
      P.signOut();
      if (typeof window.mkSyncPlayer === "function") window.mkSyncPlayer("");
      if (typeof window.mkToast === "function") {
        window.mkToast("Odhlášeno", "Minecraft účet byl z tohoto zařízení odebrán.");
      }
    });

    document.addEventListener("click", event => {
      if (!wrap.contains(event.target)) close();
    });

    wrap.addEventListener("keydown", event => {
      if (event.key === "Escape" && wrap.classList.contains("is-open")) {
        event.stopPropagation();
        close();
        chip.focus();
      }
    });

    return wrap;
  }

  function syncAll() {
    const name = P.player;
    const label = name || "Nepřihlášen";

    document.querySelectorAll("[data-profile-avatar]").forEach(node => {
      node.innerHTML = avatarMarkup(name);
    });
    document.querySelectorAll("[data-profile-avatar-lg]").forEach(node => {
      node.innerHTML = avatarMarkup(name);
    });
    document.querySelectorAll("[data-profile-name]").forEach(node => {
      node.textContent = label;
    });
    document.querySelectorAll("[data-profile-sub]").forEach(node => {
      node.textContent = P.email || (name ? "Minecraft účet" : "Nastav svůj účet");
    });
    document.querySelectorAll("[data-profile-signout-label]").forEach(node => {
      node.textContent = name ? "Odhlásit se" : "Přihlásit účet";
    });

    const count = P.orders.length;
    document.querySelectorAll("[data-profile-count]").forEach(node => {
      node.textContent = String(count);
      node.hidden = count === 0;
    });
  }

  function mount() {
    // Desktop – nahradí původní jednoduchý chip hráče.
    const legacy = document.querySelector("#owPlayerChip");
    if (legacy && !document.querySelector(".store-header-actions .mk-profile")) {
      legacy.replaceWith(build("Desktop"));
    }

    // Profil se přesouvá na místo košíku (ten je jen skrytý, ne odstraněný –
    // pořád ho používá zbytek storu pro počty položek a otevírání panelu).
    const cartButton = document.querySelector("#cartButton");
    const desktopProfile = document.querySelector(".store-header-actions .mk-profile");
    if (cartButton && desktopProfile && cartButton.parentElement) {
      cartButton.parentElement.insertBefore(desktopProfile, cartButton.nextSibling);
    }

    // Mobil – do rozbalovací navigace, nad přepínač měny.
    const mobileNav = document.querySelector("#mobileNav");
    if (mobileNav && !mobileNav.querySelector(".mk-profile")) {
      mobileNav.insertBefore(build("Mobile"), mobileNav.querySelector(".mk-fx") || mobileNav.firstChild);
    }

    syncAll();
  }

  P.onChange(syncAll);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();

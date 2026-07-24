"use strict";

const legalConfig = window.MINEKUBE_LEGAL_CONFIG || {};
const fields = {
  brandName: legalConfig.brandName || "Minekube Studios",
  storeName: legalConfig.storeName || "Minekube Network Store",
  operatorLegalName: legalConfig.operatorLegalName || "DOPLŇ PROVOZOVATELE",
  businessId: legalConfig.businessId || "DOPLŇ IČO",
  registeredAddress: legalConfig.registeredAddress || "DOPLŇ ADRESU",
  supportEmail: legalConfig.supportEmail || "DOPLŇ E-MAIL",
  supportUrl: legalConfig.supportUrl || "https://minekubestudios.github.io/store/",
  serverAddress: legalConfig.serverAddress || "cz-sk.play.minekube.net",
  termsVersion: legalConfig.termsVersion || "2026-07-24",
  privacyVersion: legalConfig.privacyVersion || "2026-07-24",
  effectiveDate: legalConfig.effectiveDate || "24. 7. 2026"
};

for (const [name, value] of Object.entries(fields)) {
  document.querySelectorAll(`[data-legal-field="${name}"]`).forEach(node => {
    node.textContent = value;
    if (name === "supportEmail" && node.tagName === "A") node.href = `mailto:${value}`;
    if (name === "supportUrl" && node.tagName === "A") node.href = value;
  });
}

const incomplete = [
  fields.operatorLegalName,
  fields.businessId,
  fields.registeredAddress,
  fields.supportEmail
].some(value => String(value).toUpperCase().includes("DOPLŇ"));

const warning = document.querySelector("[data-legal-setup-warning]");
if (warning) warning.hidden = !incomplete;

document.querySelectorAll("[data-current-year]").forEach(node => {
  node.textContent = String(new Date().getFullYear());
});

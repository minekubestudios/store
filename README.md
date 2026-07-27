# Minekube Network Store

Samostatný statický frontend oficiálního Minekube Network Store, vizuálně navazující na hlavní web Minekube Studios.

## Obsah

- responzivní katalog produktů,
- kategorie, hledání, řazení a filtr slev,
- detail produktu,
- nákupní košík s množstvím a slevovými kódy,
- nastavení cílového Minecraft hráče,
- tříkrokové checkout rozhraní,
- light/dark motiv,
- lokální uložení košíku a hráče,
- plnohodnotné mobilní rozhraní.

## GitHub Pages

Repozitář má mít tuto strukturu přímo v kořeni:

```text
index.html
styles.css
app.js
assets/favicon.svg
```

V GitHubu otevřete `Settings → Pages`, zvolte `Deploy from a branch`, větev `main` a složku `/ (root)`.

Výchozí adresa bude:

```text
https://minekubestudios.github.io/store/
```

## Poznámka k integraci

Tato verze obsahuje kompletní store frontend. Ostrá platba, databáze objednávek a automatické doručení na Minecraft server se připojí v navazující backendové a pluginové fázi.

## Připravená aktualizace Store API – měnové balíčky

Přesný serverový katalog Premium Coins a Mythic Prisms je přiložen ve složce `BACKEND-UPDATE`. Produktová ID, ceny a množství odpovídají měnovým obrazovkám ve frontendu.

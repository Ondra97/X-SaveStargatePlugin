# 🚀 SaveStargate Tweet Helper

Chrome/Brave rozšíření pro snadné přidávání #SaveStargate a dalších presetů do tweetů.

## 📋 Co to dělá

- ✅ Vytvářej a spravuj vlastní textové presety (#hashtags, frází, apod.)
- ✅ Jedno kliknutí a vloží ti preset do tweet compose boxu
- ✅ Všechny presety se ukládají automaticky
- ✅ Funguje na X.com a Twitter.com

## 📦 Instalace

### Krok 1: Příprava souborů

Složka by měla vypadat takto:
```
SaveStargate/
├── manifest.json
├── popup.html
├── popup.js
├── popup.css
├── content.js
├── images/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

### Krok 2: Vytvoř ikony

Vytvořit si můžeš jednoduše:

**Možnost A: Online** (nejrychleji)
1. Jdi na https://www.favicon-generator.org/
2. Nech si vygenerovat ikony v RGB: `#667eea` (naša barva)
3. Stáhni PNG verze
4. Umísti je do `images/` složky s názvy: `icon16.png`, `icon48.png`, `icon128.png`

**Možnost B: Using ImageMagick** (pokud máš nainstalovaný)
```bash
convert -size 128x128 xc:'#667eea' -pointsize 80 -gravity center -fill white -annotate +0+0 '🚀' icon128.png
convert -size 48x48 xc:'#667eea' -pointsize 30 -gravity center -fill white -annotate +0+0 '🚀' icon48.png
convert -size 16x16 xc:'#667eea' -pointsize 10 -gravity center -fill white -annotate +0+0 '🚀' icon16.png
```

**Možnost C: Prostě zkopíruj stejný obrázek**
Vytvořil jsem icon.png, stačí jej zkopírovat na všechny tři jména:
```bash
cp icon.png icon16.png && cp icon.png icon48.png && cp icon.png icon128.png
```

### Krok 3: Nainstaluj do Chrome

1. Otevři Chrome/Brave
2. Jdi na `chrome://extensions/` (nebo `brave://extensions/`)
3. Zapni **Developer mode** (pravý horní roh)
4. Klikni **Load unpacked** (Načíst rozšíření)
5. Vyber složku `SaveStargate` s tímto souborem
6. ✅ **HOTOVO!** Ikona se objeví v toolbaru

## 🎯 Jak to používat

### 1️⃣ Přidej si presety
- Klikni na ikonu rozšíření v toolbaru (🚀)
- Zadej text (např. `#SaveStargate`) do pole
- Klikni "Přidat preset"

### 2️⃣ Použij preset v tweetu
- Otevři X.com a začni psát tweet
- V compose boxu se ti objeví tlačítko **"🚀 Přidej preset"**
- Klikni na něj a vyber preset, který chceš vložit
- Automaticky se ti vloží do tweetu

### 3️⃣ Spravuj presety
- Vrať se do menu rozšíření
- U každého presetu máš tlačítka:
  - 📋 **Zkopíruj** - kopíruje do schránky
  - 🗑️ **Smazat** - odstraní preset

## 💡 Příklady presetů

```
#SaveStargate
#SaveStargate #GateSG1
Pojď salutovat Stargate! 🌟 #SaveStargate
#SaveStargate #SciFi #Television
Kdyby nebyl Stargate... 🛸 #SaveStargate
```

## 🔧 Troubleshooting

### Tlačítko se neobjevuje
- Refresh stránku X.com (F5)
- Zkontroluj, že rozšíření je zapnuté (`chrome://extensions/`)
- Zkontroluj Developer Console (F12) pro chyby

### Presety nejdou vložit
- Zkus refreshnout stránku
- Zkus psát v nový tweet (ne v reply)
- Pokud pořád nejde, zkus restartovat Chrome

### Ikony se nezobrazují
- Zkontroluj, že máš `images/` složku s PNG soubory
- Zkus reload rozšíření (refresh tlačítko na `chrome://extensions/`)

## 📝 Poznámky

- Presety se ukládají **lokálně** v localStorage - nejsou nigde sdíleny
- Rozšíření funguje **pouze na X.com/Twitter** (jak je v manifestu)
- Všechna data zůstávají **jen na tvém počítači**

## 🎨 Customizace

Chceš změnit barvy? Otevři si tyto soubory a hledej `#667eea` (naša fialová barva):
- `popup.css` - styling popup menu
- `content.js` - stylování tlačítka a menu na X.com

---

**Hotovo! 🎉 Teď můžeš podporovat Stargate s jedním kliknutím!**

Pro support nebo issues: řekni si o pomoć 😊

# 🚀 SaveStargate Tweet Helper

Chrome/Brave extension for easily adding #SaveStargate and other presets to tweets.

## 📋 What It Does

- ✅ Create and manage custom text presets (#hashtags, phrases, etc.)
- ✅ One click inserts a preset into the tweet compose box
- ✅ All presets are saved automatically
- ✅ Works on X.com and Twitter.com

## 📦 Installation

### Step 1: File Preparation

The folder structure should look like this:
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

### Step 2: Create Icons

You can easily create them:

**Option A: Online** (fastest)
1. Go to https://www.favicon-generator.org/
2. Generate icons in RGB: `#667eea` (our color)
3. Download the PNG versions
4. Place them in the `images/` folder with the names: `icon16.png`, `icon48.png`, `icon128.png`

**Option B: Using ImageMagick** (if installed)
```bash
convert -size 128x128 xc:'#667eea' -pointsize 80 -gravity center -fill white -annotate +0+0 '🚀' icon128.png
convert -size 48x48 xc:'#667eea' -pointsize 30 -gravity center -fill white -annotate +0+0 '🚀' icon48.png
convert -size 16x16 xc:'#667eea' -pointsize 10 -gravity center -fill white -annotate +0+0 '🚀' icon16.png
```

**Option C: Just copy the same image**
I created icon.png, just copy it to all three names:
```bash
cp icon.png icon16.png && cp icon.png icon48.png && cp icon.png icon128.png
```

### Step 3: Install in Chrome

1. Open Chrome/Brave
2. Go to `chrome://extensions/` (or `brave://extensions/`)
3. Turn on **Developer mode** (top right corner)
4. Click **Load unpacked**
5. Select the `SaveStargate` folder containing these files
6. ✅ **DONE!** The icon will appear in your toolbar

## 🎯 How to Use

### 1️⃣ Add Presets
- Click on the extension icon in the toolbar (🚀)
- Enter text (e.g., `#SaveStargate`) into the field
- Click "Add preset"

### 2️⃣ Use a Preset in a Tweet
- Open X.com and start writing a tweet
- A **"🚀 Add preset"** button will appear in the compose box
- Click on it and select the preset you want to insert
- It will automatically be inserted into your tweet

### 3️⃣ Manage Presets
- Go back to the extension menu
- Next to each preset, you have buttons:
  - 📋 **Copy** - copies to clipboard
  - 🗑️ **Delete** - removes the preset

## 💡 Example Presets

```
#SaveStargate
#SaveStargate #GateSG1
Come salute Stargate! 🌟 #SaveStargate
#SaveStargate #SciFi #Television
If there were no Stargate... 🛸 #SaveStargate
```

## 🔧 Troubleshooting

### Button does not appear
- Refresh the X.com page (F5)
- Check that the extension is enabled (`chrome://extensions/`)
- Check the Developer Console (F12) for errors

### Presets cannot be inserted
- Try refreshing the page
- Try writing in a new tweet (not a reply)
- If it still doesn't work, try restarting Chrome

### Icons are not displaying
- Check that you have the `images/` folder with PNG files
- Try reloading the extension (refresh button on `chrome://extensions/`)

## 📝 Notes

- Presets are saved **locally** in localStorage - they are not shared anywhere
- The extension works **only on X.com/Twitter** (as specified in the manifest)
- All data remains **only on your computer**

## 🎨 Customization

Want to change the colors? Open these files and search for `#667eea` (our purple color):
- `popup.css` - popup menu styling
- `content.js` - button and menu styling on X.com

---

**Done! 🎉 Now you can support Stargate with a single click!**

For support or issues: ask for help 😊

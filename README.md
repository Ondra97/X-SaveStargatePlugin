# 🚀 SaveStargate Tweet Helper

Chrome/Brave/Microsoft Ede,Opera extension for easily adding #SaveStargate and other presets to tweets.
- Tested only on Brave

## 📋 What It Does

- ✅ Add new Button next to post button which will open menu
- ✅ Create and manage custom text presets (#hashtags, phrases, etc.)
- ✅ One click inserts a preset into the tweet compose box
- ✅ All presets are saved automatically
- ✅ Works on X.com

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



### Step 2: Install in Chrome

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
<img width="467" height="390" alt="image" src="https://github.com/user-attachments/assets/f38c868c-e213-4013-81d0-d9747fee5cc6" />
<img width="628" height="393" alt="image" src="https://github.com/user-attachments/assets/b38e614e-7aee-4b7c-aa5c-f254a8b55523" />


### 2️⃣ Use a Preset in a Tweet
- Open X.com and start writing a tweet
- A **"🚀 Add preset"** button will appear in the compose box
- Click on it and select the preset you want to insert
- It will automatically be inserted into end of your tweet

### 3️⃣ Manage Presets
- Go back to the extension menu
- Next to each preset, you have buttons:
  - presets are dragable so you can change the order
  - 📋 **Copy** - copies to clipboard
  - 🗑️ **Delete** - removes the preset

## 💡 Example Presets

```
savestargate.com
#SaveStargate
#LetGeroBuildTheGate
@AmazonMGMStudio @PrimeVideo
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
- The extension works **only on X.com** (as specified in the manifest)
- All data remains **only on your computer**

## 🎨 Customization

Want to change the colors? Open these files and search for `#667eea` (our purple color):
- `popup.css` - popup menu styling
- `content.js` - button and menu styling on X.com

---

**Done! 🎉 Now you can support Stargate with a single click!**

For support or issues: ask for help 😊

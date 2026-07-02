const observer = new MutationObserver(() => checkAndInjectButtons());

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { childList: true, subtree: true });
  });
} else {
  observer.observe(document.body, { childList: true, subtree: true });
}

function checkAndInjectButtons() {
  document.querySelectorAll('[contenteditable="true"][role="textbox"]').forEach((textBox) => {
    if (textBox.getAttribute('data-ss-injected')) return;
    textBox.setAttribute('data-ss-injected', 'true');

    let container = textBox.parentElement;
    for (let i = 0; i < 8; i++) {
      if (!container) break;
      if (container.querySelectorAll('button, [role="button"]').length >= 2) break;
      container = container.parentElement;
    }
    if (!container) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.innerHTML = '🚀';
    btn.title = 'SaveStargate Presets';
    btn.style.cssText = `
      background:transparent; border:none; padding:8px; cursor:pointer;
      font-size:20px; display:inline-flex; align-items:center; justify-content:center;
      min-width:36px; min-height:36px; border-radius:50%; transition:background 0.2s;
    `;
    btn.onmouseenter = () => btn.style.background = 'rgba(255,255,255,0.1)';
    btn.onmouseleave = () => btn.style.background = 'transparent';

    const firstBtn = container.querySelector('button, [role="button"]');
    if (firstBtn?.parentElement) {
      firstBtn.parentElement.appendChild(btn);
    } else {
      container.appendChild(btn);
    }

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const old = document.getElementById('ss-popup');
      if (old) { old.remove(); document.getElementById('ss-backdrop')?.remove(); return; }
      showMenu(textBox, btn);
    });
  });
}

function showMenu(textBox, button) {
  // Load presets from chrome.storage.local
  chrome.storage.local.get('presets', (data) => {
    const presets = data.presets || [];
    buildMenu(textBox, button, presets);
  });
}

function buildMenu(textBox, button, presets) {
  // Backdrop
  const backdrop = document.createElement('div');
  backdrop.id = 'ss-backdrop';
  backdrop.style.cssText = 'position:fixed; inset:0; z-index:9998;';
  backdrop.addEventListener('click', closeMenu);

  // Popup
  const popup = document.createElement('div');
  popup.id = 'ss-popup';
  popup.style.cssText = `
    position:fixed;
    background:#000;
    border:1px solid #2f3336;
    border-radius:16px;
    z-index:9999;
    width:320px;
    font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    overflow:hidden;
    box-shadow: 0 8px 32px rgba(0,0,0,0.8);
  `;

  // Position under the button
  const rect = button.getBoundingClientRect();
  const left = Math.max(8, Math.min(rect.left - 280, window.innerWidth - 328));
  popup.style.left = left + 'px';
  popup.style.top  = (rect.bottom + 8) + 'px';

  // Search bar
  const searchWrap = document.createElement('div');
  searchWrap.style.cssText = 'padding:12px 16px;';
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search presets';
  searchInput.style.cssText = `
    width:100%; box-sizing:border-box;
    background:#202327; color:#e7e9ea;
    border:none; border-radius:20px;
    padding:10px 16px; font-size:15px; outline:none;
  `;
  searchInput.onfocus = () => searchInput.style.background = '#16181c';
  searchInput.onblur  = () => searchInput.style.background = '#202327';
  searchWrap.appendChild(searchInput);

  // Blue line
  const blueLine = document.createElement('div');
  blueLine.style.cssText = 'height:2px; background:#1d9bf0; width:40px; margin:0 16px 0;';

  // List
  const list = document.createElement('div');
  list.id = 'ss-list';
  list.style.cssText = 'max-height:320px; overflow-y:auto; border-top:1px solid #2f3336;';

  const scrollStyle = document.createElement('style');
  scrollStyle.textContent = `
    #ss-list::-webkit-scrollbar { width:6px; }
    #ss-list::-webkit-scrollbar-track { background:transparent; }
    #ss-list::-webkit-scrollbar-thumb { background:#333; border-radius:3px; }
  `;

  function renderList(filter = '') {
    list.innerHTML = '';
    const filtered = presets.filter(p => p.toLowerCase().includes(filter.toLowerCase()));

    if (filtered.length === 0) {
      const empty = document.createElement('div');
      empty.textContent = filter ? 'No results found' : 'No presets — add some in the 🚀 menu';
      empty.style.cssText = 'padding:20px 16px; color:#71767b; font-size:14px; text-align:center;';
      list.appendChild(empty);
      return;
    }

    filtered.forEach((preset) => {
      const row = document.createElement('div');
      row.style.cssText = `
        display:flex; align-items:center; justify-content:space-between;
        padding:14px 16px; border-bottom:1px solid #1a1a1a; cursor:pointer;
        transition:background 0.15s;
      `;

      const label = document.createElement('span');
      label.textContent = preset;
      label.style.cssText = 'color:#e7e9ea; font-size:15px; flex:1; margin-right:12px; word-break:break-word;';

      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.dataset.preset = preset;
      cb.style.cssText = 'width:20px; height:20px; cursor:pointer; accent-color:#1d9bf0; flex-shrink:0;';

      const setStyle = () => {
        row.style.background = cb.checked ? '#0d1a26' : 'transparent';
      };

      cb.addEventListener('click', (e) => { e.stopPropagation(); setStyle(); });
      row.addEventListener('click', () => { cb.checked = !cb.checked; setStyle(); });

      row.appendChild(label);
      row.appendChild(cb);
      list.appendChild(row);
    });
  }

  renderList();
  searchInput.addEventListener('input', () => renderList(searchInput.value));

  // Footer
  const footer = document.createElement('div');
  footer.style.cssText = `
    display:flex; justify-content:space-between; align-items:center;
    padding:14px 20px; border-top:1px solid #2f3336;
  `;

  const cancelBtn = document.createElement('button');
  cancelBtn.innerHTML = '❌';
  cancelBtn.title = 'Cancel';
  cancelBtn.style.cssText = `
    background:#ffd60022; border:none; border-radius:50%;
    width:44px; height:44px; font-size:22px; cursor:pointer;
    display:flex; align-items:center; justify-content:center; transition:background 0.2s;
  `;
  cancelBtn.onmouseenter = () => cancelBtn.style.background = '#ffd60044';
  cancelBtn.onmouseleave = () => cancelBtn.style.background = '#ffd60022';
  cancelBtn.addEventListener('click', closeMenu);

  const addBtn = document.createElement('button');
  addBtn.innerHTML = '✅';
  addBtn.title = 'Add to Tweet';
  addBtn.style.cssText = `
    background:#1d9bf022; border:none; border-radius:50%;
    width:44px; height:44px; font-size:22px; cursor:pointer;
    display:flex; align-items:center; justify-content:center; transition:background 0.2s;
  `;
  addBtn.onmouseenter = () => addBtn.style.background = '#1d9bf044';
  addBtn.onmouseleave = () => addBtn.style.background = '#1d9bf022';
  addBtn.addEventListener('click', () => {
    const checked = list.querySelectorAll('input[type="checkbox"]:checked');
    if (checked.length === 0) return;
    const texts = Array.from(checked).map(cb => cb.dataset.preset);
    insertToTweet(textBox, texts);
    closeMenu();
  });

  footer.appendChild(cancelBtn);
  footer.appendChild(addBtn);

  popup.appendChild(scrollStyle);
  popup.appendChild(searchWrap);
  popup.appendChild(blueLine);
  popup.appendChild(list);
  popup.appendChild(footer);

  document.body.appendChild(backdrop);
  document.body.appendChild(popup);

  setTimeout(() => searchInput.focus(), 50);
}

function closeMenu() {
  document.getElementById('ss-popup')?.remove();
  document.getElementById('ss-backdrop')?.remove();
}

function insertToTweet(textBox, presets) {
  const text = '\n' + presets.join('\n');

  const liveBox = document.querySelector('[contenteditable="true"][role="textbox"]') || textBox;
  liveBox.focus();

  // X.com has inside contenteditable submerged <span> elements for hashtags/links
  // range.collapse(false) is not enough - we need to traverse to the last TEXT node
  const sel = window.getSelection();
  const range = document.createRange();

  let lastNode = liveBox;
  while (lastNode.lastChild) {
    lastNode = lastNode.lastChild;
  }

  if (lastNode.nodeType === Node.TEXT_NODE) {
    // Precisely at the end of the last text node
    range.setStart(lastNode, lastNode.length);
    range.setEnd(lastNode, lastNode.length);
  } else {
    // Fallback - end of the container
    range.selectNodeContents(lastNode);
    range.collapse(false);
  }

  sel.removeAllRanges();
  sel.addRange(range);

  // Small delay so React catches the selection change before paste
  setTimeout(() => {
    const dt = new DataTransfer();
    dt.setData('text/plain', text);
    liveBox.dispatchEvent(new ClipboardEvent('paste', {
      clipboardData: dt,
      bubbles: true,
      cancelable: true
    }));
  }, 50);
}

setInterval(() => checkAndInjectButtons(), 1000);
checkAndInjectButtons();
console.log('SaveStargate v3.1 loaded 🚀');

const presetInput = document.getElementById('presetInput');
const addBtn      = document.getElementById('addBtn');
const presetsList = document.getElementById('presetsList');

// ── Storage helpers ────────────────────────────────────────────────────────
function loadPresets(cb) {
  chrome.storage.local.get('presets', d => cb(d.presets || []));
}
function savePresets(presets, cb) {
  chrome.storage.local.set({ presets }, cb);
}

// ── Render ─────────────────────────────────────────────────────────────────
function renderPresets() {
  loadPresets((presets) => {
    if (presets.length === 0) {
      presetsList.innerHTML = '<p class="empty-state">No presets yet. Add some!</p>';
      return;
    }

    presetsList.innerHTML = presets.map((preset, i) => `
      <div class="preset-item" draggable="true" data-index="${i}">
        <span class="drag-handle" title="Drag to change order">⠿</span>
        <span class="preset-text">${escapeHtml(preset)}</span>
        <div class="preset-actions">
          <button class="btn-copy"   data-index="${i}" title="Copy">📋</button>
          <button class="btn-delete" data-index="${i}" title="Delete">🗑️</button>
        </div>
      </div>
    `).join('');

    attachItemListeners(presets);
  });
}

// ── Item event listeners (copy / delete / drag) ────────────────────────────
function attachItemListeners(presets) {
  // Copy
  presetsList.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      navigator.clipboard.writeText(presets[btn.dataset.index]);
      showToast('Copied! 📋');
    });
  });

  // Delete
  presetsList.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      loadPresets(current => {
        current.splice(Number(btn.dataset.index), 1);
        savePresets(current, () => { renderPresets(); showToast('Preset deleted ✓'); });
      });
    });
  });

  // ── Drag & Drop ──────────────────────────────────────────────────────────
  let dragSrc = null;

  presetsList.querySelectorAll('.preset-item').forEach(item => {

    item.addEventListener('dragstart', e => {
      dragSrc = item;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', item.dataset.index);
      setTimeout(() => item.classList.add('dragging'), 0);
    });

    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
      presetsList.querySelectorAll('.preset-item').forEach(i => i.classList.remove('drag-over'));
    });

    item.addEventListener('dragover', e => {
      e.preventDefault();
      if (item === dragSrc) return;
      presetsList.querySelectorAll('.preset-item').forEach(i => i.classList.remove('drag-over'));
      item.classList.add('drag-over');
    });

    item.addEventListener('dragleave', () => {
      item.classList.remove('drag-over');
    });

    item.addEventListener('drop', e => {
      e.preventDefault();
      item.classList.remove('drag-over');
      const fromIdx = Number(e.dataTransfer.getData('text/plain'));
      const toIdx   = Number(item.dataset.index);
      if (fromIdx === toIdx) return;

      loadPresets(current => {
        const [moved] = current.splice(fromIdx, 1);
        current.splice(toIdx, 0, moved);
        savePresets(current, () => { renderPresets(); showToast('Order saved ✓'); });
      });
    });
  });
}

// ── Add preset ─────────────────────────────────────────────────────────────
function addPreset() {
  const value = presetInput.value.trim();
  if (!value) { showToast('Enter some text! 👆'); presetInput.focus(); return; }

  loadPresets(presets => {
    if (presets.includes(value)) { showToast('Preset already exists! ⚠️'); return; }
    presets.push(value);
    savePresets(presets, () => { presetInput.value = ''; renderPresets(); showToast('Přidáno! 🎉'); });
  });
}

// ── Toast ──────────────────────────────────────────────────────────────────
function showToast(msg) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 2000);
}

function escapeHtml(text) {
  const d = document.createElement('div');
  d.textContent = text;
  return d.innerHTML;
}

// ── Init ───────────────────────────────────────────────────────────────────
addBtn.addEventListener('click', addPreset);
presetInput.addEventListener('keypress', e => { if (e.key === 'Enter') addPreset(); });
renderPresets();

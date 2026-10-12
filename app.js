/* ═══════════════════════════════════════════
   CRM Mitra — App Logic
═══════════════════════════════════════════ */

// ──────────────────────────────────────────
// DATA (mock — akan diganti API call)
// ──────────────────────────────────────────

const customers = [
  { id:1, name:'PT Maju Bersama',    phone:'0812-3456-7890', email:'info@majubersama.co.id', sales:'Rina',  category:'active',   lastVisit:'3 hari lalu' },
  { id:2, name:'CV Karya Mandiri',   phone:'0813-9876-5432', email:'karya@mandiri.net',       sales:'Budi',  category:'prospect', lastVisit:'1 minggu lalu' },
  { id:3, name:'Toko Berkah Jaya',   phone:'0811-1122-3344', email:'-',                        sales:'Agus',  category:'active',   lastVisit:'Kemarin' },
  { id:4, name:'UD Sinar Terang',    phone:'0821-5566-7788', email:'sinar@terang.id',          sales:'Rina',  category:'active',   lastVisit:'Hari ini' },
  { id:5, name:'PT Nusa Indah',      phone:'0852-4433-2211', email:'nusa@indah.co.id',         sales:'Budi',  category:'prospect', lastVisit:'2 minggu lalu' },
  { id:6, name:'Toko Sumber Rezeki', phone:'0857-8899-0011', email:'-',                        sales:'Agus',  category:'inactive', lastVisit:'1 bulan lalu' },
  { id:7, name:'CV Sejahtera Abadi', phone:'0818-2233-4455', email:'sejahtera@abadi.net',      sales:'Rina',  category:'active',   lastVisit:'4 hari lalu' },
  { id:8, name:'PT Global Prima',    phone:'0878-6677-8899', email:'global@prima.id',          sales:'Budi',  category:'prospect', lastVisit:'5 hari lalu' },
];

const activities = [
  { id:1, type:'visit',    customer:'PT Maju Bersama',  sales:'Rina',  time:'09:00', status:'done',    note:'Presentasi produk baru, ada minat untuk order 50 unit.' },
  { id:2, type:'deal',     customer:'UD Sinar Terang',  sales:'Rina',  time:'11:30', status:'done',    note:'Deal 100 unit Alpha 5L. PO diterima.' },
  { id:3, type:'follow_up',customer:'CV Karya Mandiri', sales:'Budi',  time:'14:00', status:'pending', note:'Tindak lanjut penawaran harga dari minggu lalu.' },
  { id:4, type:'call',     customer:'Toko Berkah Jaya', sales:'Agus',  time:'16:00', status:'pending', note:'Konfirmasi ketersediaan stok filter udara.' },
  { id:5, type:'visit',    customer:'CV Sejahtera',     sales:'Rina',  time:'13:00', status:'done',    note:'Review kebutuhan Q4.' },
];

const stockItems = [
  { id:1, name:'Produk Alpha 5L',  sku:'SKU-001', qty:3,  min:20, unit:'Unit',  level:'danger' },
  { id:2, name:'Oli Mesin 1L',     sku:'SKU-008', qty:2,  min:15, unit:'Botol', level:'danger' },
  { id:3, name:'Filter Udara',     sku:'SKU-012', qty:8,  min:20, unit:'Pcs',   level:'warn'   },
  { id:4, name:'Bahan Kimia B',    sku:'SKU-019', qty:9,  min:20, unit:'Liter', level:'warn'   },
  { id:5, name:'Seal Kit A',       sku:'SKU-023', qty:11, min:25, unit:'Set',   level:'warn'   },
  { id:6, name:'Pelumas Rantai',   sku:'SKU-031', qty:42, min:10, unit:'Botol', level:'safe'   },
  { id:7, name:'Oli Transmisi 4L', sku:'SKU-033', qty:28, min:10, unit:'Botol', level:'safe'   },
  { id:8, name:'Karet Gasket',     sku:'SKU-040', qty:75, min:30, unit:'Pcs',   level:'safe'   },
  { id:9, name:'Bearing 6202',     sku:'SKU-045', qty:55, min:20, unit:'Pcs',   level:'safe'   },
  { id:10,name:'Brake Pad Set',    sku:'SKU-047', qty:33, min:15, unit:'Set',   level:'safe'   },
];

const typeEmoji = { visit:'🏢', call:'📞', follow_up:'🔄', deal:'🤝' };
const typeLabel = { visit:'Kunjungan', call:'Telepon', follow_up:'Follow-up', deal:'Deal' };

// ──────────────────────────────────────────
// AUTH
// ──────────────────────────────────────────

function doLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('btn-login');
  btn.disabled = true;
  btn.querySelector('.btn-label').textContent = 'Masuk…';

  setTimeout(() => {
    document.getElementById('page-login').classList.remove('active');
    document.getElementById('app-shell').classList.remove('hidden');
    renderAll();
    showToast('Selamat datang, Agus Setiawan!', 'success');
    btn.disabled = false;
    btn.querySelector('.btn-label').textContent = 'Masuk';
  }, 900);
}

function doLogout() {
  closeUserMenu();
  document.getElementById('app-shell').classList.add('hidden');
  document.getElementById('page-login').classList.add('active');
  showToast('Sesi berakhir', 'info');
}

// ──────────────────────────────────────────
// USER EXPAND MENU & SETTINGS
// ──────────────────────────────────────────

function toggleUserMenu(e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById('user-expand-menu');
  const btn = document.getElementById('user-menu-toggle');
  if (!menu) return;
  const isOpen = menu.classList.contains('open');
  if (isOpen) {
    closeUserMenu();
  } else {
    menu.classList.add('open');
    if (btn) {
      btn.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
    }
  }
}

function closeUserMenu() {
  const menu = document.getElementById('user-expand-menu');
  const btn = document.getElementById('user-menu-toggle');
  if (menu) menu.classList.remove('open');
  if (btn) {
    btn.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
  }
}

function openSettings() {
  closeUserMenu();
  openModal('modal-settings');
}

// ──────────────────────────────────────────
// THEME MANAGEMENT (Dark / Light)
// ──────────────────────────────────────────

function initTheme() {
  const savedTheme = localStorage.getItem('crm_theme') || 'light';
  applyTheme(savedTheme, false);
}

function setTheme(theme) {
  applyTheme(theme, true);
  showToast(`Tema diubah ke mode ${theme === 'dark' ? 'Gelap (Dark)' : 'Terang (Light)'}`, 'info');
}

function applyTheme(theme, save = true) {
  if (save) localStorage.setItem('crm_theme', theme);
  document.documentElement.setAttribute('data-theme', theme);

  // Update theme toggle buttons
  const darkBtn = document.getElementById('theme-btn-dark');
  const lightBtn = document.getElementById('theme-btn-light');
  if (darkBtn && lightBtn) {
    if (theme === 'light') {
      darkBtn.classList.remove('active');
      lightBtn.classList.add('active');
    } else {
      darkBtn.classList.add('active');
      lightBtn.classList.remove('active');
    }
  }

  // Update visual preview cards
  const darkCard = document.getElementById('theme-card-dark');
  const lightCard = document.getElementById('theme-card-light');
  if (darkCard && lightCard) {
    if (theme === 'light') {
      darkCard.classList.remove('active');
      lightCard.classList.add('active');
    } else {
      darkCard.classList.add('active');
      lightCard.classList.remove('active');
    }
  }

  // Update meta theme-color for browser address bar
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', theme === 'light' ? '#F8FAFC' : '#0F1117');
  }
}

// Initialize theme on script evaluation
initTheme();

// ──────────────────────────────────────────
// NAVIGATION
// ──────────────────────────────────────────

const pages = ['dashboard','customers','sales','stock','laporan'];
const pageTitles = {
  dashboard:'Dashboard', customers:'Pelanggan',
  sales:'Aktivitas Sales', stock:'Stok', laporan:'Laporan'
};

function navigate(page) {
  pages.forEach(p => {
    document.getElementById(`page-${p}`).classList.remove('active');
    const navEl  = document.getElementById(`nav-${p}`);
    const bnEl   = document.getElementById(`bn-${p}`);
    if (navEl) navEl.classList.remove('active');
    if (bnEl)  bnEl.classList.remove('active');
  });

  document.getElementById(`page-${page}`).classList.add('active');
  const navEl = document.getElementById(`nav-${page}`);
  const bnEl  = document.getElementById(`bn-${page}`);
  if (navEl) navEl.classList.add('active');
  if (bnEl)  bnEl.classList.add('active');

  document.getElementById('topbar-title').textContent = pageTitles[page];

  // Close sidebar on mobile
  if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebar-overlay').classList.remove('open');
  }
}

function toggleSidebar() {
  const s  = document.getElementById('sidebar');
  const ov = document.getElementById('sidebar-overlay');
  s.classList.toggle('open');
  ov.classList.toggle('open');
}

// ──────────────────────────────────────────
// RENDER FUNCTIONS
// ──────────────────────────────────────────

function renderAll() {
  renderCustomers(customers);
  renderActivities(activities);
  renderStock(stockItems);
}

function renderCustomers(list) {
  const el = document.getElementById('customer-list');
  if (!list.length) {
    el.innerHTML = `<div class="empty-state"><p>Tidak ada pelanggan ditemukan</p></div>`;
    return;
  }
  el.innerHTML = list.map(c => `
    <div class="customer-card" onclick="showToast('Buka detail: ${escHtml(c.name)}','info')">
      <div>
        <div class="cc-name">${escHtml(c.name)}</div>
        <div class="cc-meta">
          <span>📞 ${c.phone}</span>
          <span>👤 ${c.sales}</span>
          <span>🕒 ${c.lastVisit}</span>
        </div>
      </div>
      <span class="cc-badge ${c.category}">${capitalize(c.category)}</span>
    </div>
  `).join('');
}

function renderActivities(list) {
  const el = document.getElementById('activity-cards');
  if (!list.length) {
    el.innerHTML = `<div class="empty-state"><p>Tidak ada aktivitas hari ini</p></div>`;
    return;
  }
  el.innerHTML = list.map(a => `
    <div class="activity-card">
      <div class="ac-type-icon ${a.type}">${typeEmoji[a.type]}</div>
      <div class="ac-body">
        <div class="ac-title">${typeLabel[a.type]} — ${escHtml(a.customer)}</div>
        <div class="ac-sub">👤 ${a.sales}</div>
        ${a.note ? `<div class="ac-note">${escHtml(a.note)}</div>` : ''}
      </div>
      <div class="ac-right">
        <div class="ac-time">${a.time}</div>
        <span class="ac-status ${a.status}">${a.status === 'done' ? 'Selesai ✓' : 'Pending'}</span>
      </div>
    </div>
  `).join('');
}

function renderStock(list) {
  const el = document.getElementById('stock-list');
  if (!list.length) {
    el.innerHTML = `<div class="empty-state"><p>Tidak ada produk ditemukan</p></div>`;
    return;
  }
  el.innerHTML = list.map(s => {
    const pct = Math.min(100, Math.round((s.qty / (s.min * 2)) * 100));
    return `
      <div class="stock-card ${s.level}">
        <div class="sc-header">
          <div class="sc-info">
            <div class="sc-name">${escHtml(s.name)}</div>
            <div class="sc-sku">${s.sku} · ${s.unit}</div>
          </div>
          <div class="sc-qty-label ${s.level}">${s.qty} <small style="font-size:11px;font-weight:500;color:var(--text-muted)">/ min ${s.min}</small></div>
        </div>
        <div class="sc-bar-wrap">
          <div class="sc-bar ${s.level}" style="width:${pct}%"></div>
        </div>
        <div class="sc-actions">
          <button class="sc-action-btn in"  onclick="showToast('Catat stok masuk: ${escHtml(s.name)}','success')">+ Masuk</button>
          <button class="sc-action-btn out" onclick="showToast('Catat stok keluar: ${escHtml(s.name)}','info')">− Keluar</button>
          <button class="sc-action-btn"     onclick="showToast('Lihat mutasi: ${escHtml(s.name)}','info')">Mutasi</button>
        </div>
      </div>
    `;
  }).join('');
}

// ──────────────────────────────────────────
// FILTERS
// ──────────────────────────────────────────

function filterCustomers(query) {
  const q = (query || document.getElementById('customer-search').value).toLowerCase().trim();
  const filtered = q ? customers.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.phone.includes(q) ||
    c.email.toLowerCase().includes(q) ||
    c.sales.toLowerCase().includes(q)
  ) : customers;
  renderCustomers(filtered);
}

let currentStockFilter = 'all';

function filterStock(level) {
  currentStockFilter = level;
  const filtered = level === 'all' ? stockItems : stockItems.filter(s => s.level === level);
  renderStock(filtered);
}

function filterStockList(query) {
  const q = query.toLowerCase().trim();
  const base = currentStockFilter === 'all' ? stockItems : stockItems.filter(s => s.level === currentStockFilter);
  const filtered = q ? base.filter(s => s.name.toLowerCase().includes(q) || s.sku.toLowerCase().includes(q)) : base;
  renderStock(filtered);
}

// ──────────────────────────────────────────
// TABS
// ──────────────────────────────────────────

function switchTab(btn, tabId) {
  const row = btn.closest('.tab-row');
  row.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  const section = btn.closest('section');
  section.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  section.querySelector(`#${tabId}`).classList.add('active');
}

// ──────────────────────────────────────────
// MODALS
// ──────────────────────────────────────────

function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalBackdrop(e, id) {
  if (e.target === e.currentTarget) closeModal(id);
}

function submitAddCustomer(e) {
  e.preventDefault();
  closeModal('modal-add-customer');
  showToast('Pelanggan berhasil ditambahkan!', 'success');
}

function submitAddActivity(e) {
  e.preventDefault();
  closeModal('modal-add-activity');
  showToast('Aktivitas berhasil dicatat!', 'success');
}

function submitMutation(e) {
  e.preventDefault();
  closeModal('modal-add-mutation');
  showToast('Mutasi stok tersimpan!', 'success');
}

// ──────────────────────────────────────────
// SEGMENTED CONTROL
// ──────────────────────────────────────────

function setSeg(btn) {
  btn.closest('.seg-control').querySelectorAll('.seg').forEach(s => s.classList.remove('active'));
  btn.classList.add('active');
}

// ──────────────────────────────────────────
// TOAST
// ──────────────────────────────────────────

function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icon = { success:'✅', info:'ℹ️', error:'❌' }[type] || 'ℹ️';
  toast.innerHTML = `<span>${icon}</span><span>${escHtml(msg)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideLeft .3s reverse var(--ease), fadeOut 0s .3s forwards';
    setTimeout(() => toast.remove(), 350);
  }, 3000);
}

// ──────────────────────────────────────────
// UTILS
// ──────────────────────────────────────────

function escHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Click outside to close user expand menu
document.addEventListener('click', e => {
  const menu = document.getElementById('user-expand-menu');
  const btn = document.getElementById('user-menu-toggle');
  if (menu && menu.classList.contains('open')) {
    if (!menu.contains(e.target) && (!btn || !btn.contains(e.target))) {
      closeUserMenu();
    }
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeUserMenu();
    document.querySelectorAll('.modal-backdrop.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

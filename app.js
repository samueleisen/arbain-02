/* ═══════════════════════════════════════════
   CRM Mitra — Multi-Page Application Engine
   Shared Store · Auth · Theme · Modals · Exports
═══════════════════════════════════════════ */

// ──────────────────────────────────────────
// 1. DEFAULT DATA & STORAGE LAYER
// ──────────────────────────────────────────

const DEFAULT_CUSTOMERS = [
  { id:1, name:'PT Maju Bersama',    phone:'0812-3456-7890', email:'info@majubersama.co.id', sales:'Rina',  category:'active',   lastVisit:'3 hari lalu' },
  { id:2, name:'CV Karya Mandiri',   phone:'0813-9876-5432', email:'karya@mandiri.net',       sales:'Budi',  category:'prospect', lastVisit:'1 minggu lalu' },
  { id:3, name:'Toko Berkah Jaya',   phone:'0811-1122-3344', email:'berkah@jaya.com',         sales:'Agus',  category:'active',   lastVisit:'Kemarin' },
  { id:4, name:'UD Sinar Terang',    phone:'0821-5566-7788', email:'sinar@terang.id',          sales:'Rina',  category:'active',   lastVisit:'Hari ini' },
  { id:5, name:'PT Nusa Indah',      phone:'0852-4433-2211', email:'nusa@indah.co.id',         sales:'Budi',  category:'prospect', lastVisit:'2 minggu lalu' },
  { id:6, name:'Toko Sumber Rezeki', phone:'0857-8899-0011', email:'sumber@rezeki.id',        sales:'Agus',  category:'inactive', lastVisit:'1 bulan lalu' },
  { id:7, name:'CV Sejahtera Abadi', phone:'0818-2233-4455', email:'sejahtera@abadi.net',      sales:'Rina',  category:'active',   lastVisit:'4 hari lalu' },
  { id:8, name:'PT Global Prima',    phone:'0878-6677-8899', email:'global@prima.id',          sales:'Budi',  category:'prospect', lastVisit:'5 hari lalu' },
];

const DEFAULT_ACTIVITIES = [
  { id:1, type:'visit',    customer:'PT Maju Bersama',  sales:'Rina',  time:'09:00', status:'done',    note:'Presentasi produk baru, ada minat untuk order 50 unit.' },
  { id:2, type:'deal',     customer:'UD Sinar Terang',  sales:'Rina',  time:'11:30', status:'done',    note:'Deal 100 unit Alpha 5L. PO diterima.' },
  { id:3, type:'follow_up',customer:'CV Karya Mandiri', sales:'Budi',  time:'14:00', status:'pending', note:'Tindak lanjut penawaran harga dari minggu lalu.' },
  { id:4, type:'call',     customer:'Toko Berkah Jaya', sales:'Agus',  time:'16:00', status:'pending', note:'Konfirmasi ketersediaan stok filter udara.' },
  { id:5, type:'visit',    customer:'CV Sejahtera',     sales:'Rina',  time:'13:00', status:'done',    note:'Review kebutuhan Q4.' },
];

const DEFAULT_STOCK = [
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

function getCustomers() {
  try {
    const raw = localStorage.getItem('crm_customers');
    if (!raw) {
      saveCustomers(DEFAULT_CUSTOMERS);
      return DEFAULT_CUSTOMERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_CUSTOMERS;
  }
}

function saveCustomers(data) {
  localStorage.setItem('crm_customers', JSON.stringify(data));
  updateBadges();
}

function getActivities() {
  try {
    const raw = localStorage.getItem('crm_activities');
    if (!raw) {
      saveActivities(DEFAULT_ACTIVITIES);
      return DEFAULT_ACTIVITIES;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_ACTIVITIES;
  }
}

function saveActivities(data) {
  localStorage.setItem('crm_activities', JSON.stringify(data));
  updateBadges();
}

function getStock() {
  try {
    const raw = localStorage.getItem('crm_stock');
    if (!raw) {
      saveStock(DEFAULT_STOCK);
      return DEFAULT_STOCK;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_STOCK;
  }
}

function saveStock(data) {
  localStorage.setItem('crm_stock', JSON.stringify(data));
  updateBadges();
}

// ──────────────────────────────────────────
// 2. THEME MANAGEMENT
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

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', theme === 'light' ? '#F8FAFC' : '#0F1117');
  }
}

// ──────────────────────────────────────────
// 3. AUTH & SESSION
// ──────────────────────────────────────────

function checkAuth(isLoginPage = false) {
  const user = localStorage.getItem('crm_user');
  if (isLoginPage) {
    if (user) {
      window.location.replace('dashboard.html');
    }
  } else {
    if (!user) {
      window.location.replace('login.html');
    }
  }
}

function doLogin(e) {
  if (e) e.preventDefault();
  const btn = document.getElementById('btn-login');
  if (btn) {
    btn.disabled = true;
    const label = btn.querySelector('.btn-label');
    if (label) label.textContent = 'Masuk…';
  }

  setTimeout(() => {
    localStorage.setItem('crm_user', JSON.stringify({
      name: 'Agus Setiawan',
      role: 'Admin',
      email: document.getElementById('email')?.value || 'admin@mitra.co.id'
    }));
    window.location.href = 'dashboard.html';
  }, 600);
}

function doLogout() {
  closeUserMenu();
  localStorage.removeItem('crm_user');
  showToast('Sesi berakhir', 'info');
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 300);
}

// ──────────────────────────────────────────
// 4. NAVIGATION, BADGES & SHELL
// ──────────────────────────────────────────

function updateBadges() {
  const custBadge = document.getElementById('badge-customers');
  const salesBadge = document.getElementById('badge-sales');
  const stockBadge = document.getElementById('badge-stock');

  const customers = getCustomers();
  const activities = getActivities();
  const stock = getStock();

  if (custBadge) {
    custBadge.textContent = customers.length;
  }
  if (salesBadge) {
    const pendingCount = activities.filter(a => a.status === 'pending').length;
    salesBadge.textContent = pendingCount;
    salesBadge.style.display = pendingCount > 0 ? '' : 'none';
  }
  if (stockBadge) {
    const dangerCount = stock.filter(s => s.level === 'danger').length;
    stockBadge.textContent = dangerCount;
    stockBadge.style.display = dangerCount > 0 ? '' : 'none';
  }
}

function toggleSidebar() {
  const s = document.getElementById('sidebar');
  const ov = document.getElementById('sidebar-overlay');
  if (s) s.classList.toggle('open');
  if (ov) ov.classList.toggle('open');
}

function closeSidebar() {
  const s = document.getElementById('sidebar');
  const ov = document.getElementById('sidebar-overlay');
  if (s) s.classList.remove('open');
  if (ov) ov.classList.remove('open');
}

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
// 5. MODALS & UI HELPERS
// ──────────────────────────────────────────

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function closeModalBackdrop(e, id) {
  if (e.target === e.currentTarget) closeModal(id);
}

function setSeg(btn) {
  btn.closest('.seg-control').querySelectorAll('.seg').forEach(s => s.classList.remove('active'));
  btn.classList.add('active');
}

function switchTab(btn, tabId) {
  const row = btn.closest('.tab-row');
  row.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  const container = document.querySelector('.content') || document.body;
  container.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  const target = document.getElementById(tabId);
  if (target) target.classList.add('active');
}

function showToast(msg, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
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

function escHtml(str) {
  return String(str || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

// ──────────────────────────────────────────
// 6. CSV EXPORT UTILITIES
// ──────────────────────────────────────────

function exportToCSV(filename, headers, rows) {
  const escapeCsv = (val) => {
    const str = String(val === null || val === undefined ? '' : val);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const csvContent = [
    headers.map(escapeCsv).join(','),
    ...rows.map(row => row.map(escapeCsv).join(','))
  ].join('\r\n');

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast(`File ${filename} berhasil diunduh`, 'success');
}

function exportCustomersCSV() {
  const data = getCustomers();
  const headers = ['ID', 'Nama Pelanggan', 'No Telepon', 'Email', 'Sales PIC', 'Kategori', 'Kunjungan Terakhir'];
  const rows = data.map(c => [c.id, c.name, c.phone, c.email, c.sales, c.category, c.lastVisit]);
  exportToCSV(`laporan-pelanggan-${new Date().toISOString().slice(0,10)}.csv`, headers, rows);
}

function exportSalesCSV() {
  const data = getActivities();
  const headers = ['ID', 'Tipe Aktivitas', 'Nama Pelanggan', 'Sales PIC', 'Waktu', 'Status', 'Catatan'];
  const rows = data.map(a => [a.id, typeLabel[a.type] || a.type, a.customer, a.sales, a.time, a.status, a.note]);
  exportToCSV(`laporan-aktivitas-sales-${new Date().toISOString().slice(0,10)}.csv`, headers, rows);
}

function exportStockCSV() {
  const data = getStock();
  const headers = ['ID', 'Nama Produk', 'SKU', 'Stok Saat Ini', 'Batas Minimum', 'Satuan', 'Status Level'];
  const rows = data.map(s => [s.id, s.name, s.sku, s.qty, s.min, s.unit, s.level]);
  exportToCSV(`laporan-stok-produk-${new Date().toISOString().slice(0,10)}.csv`, headers, rows);
}

function exportSummaryCSV() {
  const customers = getCustomers();
  const activities = getActivities();
  const stock = getStock();

  const headers = ['Metrik', 'Nilai', 'Keterangan'];
  const rows = [
    ['Total Pelanggan', customers.length, 'Pelanggan aktif dan prospek terdaftar'],
    ['Pelanggan Aktif', customers.filter(c => c.category === 'active').length, 'Status aktif melakukan transaksi'],
    ['Total Aktivitas Sales', activities.length, 'Catatan kunjungan, follow up, dan deal'],
    ['Aktivitas Pending', activities.filter(a => a.status === 'pending').length, 'Membutuhkan tindak lanjut'],
    ['Total Item Produk', stock.length, 'Jenis SKU yang terdaftar'],
    ['Stok Kritis', stock.filter(s => s.level === 'danger').length, 'Di bawah batas kritis, perlu restock'],
    ['Stok Rendah', stock.filter(s => s.level === 'warn').length, 'Mendekati batas minimum'],
    ['Estimasi Pipeline', 'Rp 84.000.000', 'Peluang berjalan bulan ini']
  ];
  exportToCSV(`ringkasan-eksekutif-${new Date().toISOString().slice(0,10)}.csv`, headers, rows);
}

// ──────────────────────────────────────────
// 7. PAGE INITIALIZERS & CONTROLLERS
// ──────────────────────────────────────────

// -- DASHBOARD --
function initDashboard() {
  const customers = getCustomers();
  const activities = getActivities();
  const stock = getStock();

  // Dynamic stat values
  const elCustVal = document.getElementById('stat-cust-val');
  if (elCustVal) elCustVal.textContent = customers.length;

  const elSalesVal = document.getElementById('stat-sales-val');
  if (elSalesVal) elSalesVal.textContent = activities.length;

  const elAlertVal = document.getElementById('stat-alert-val');
  if (elAlertVal) {
    const alertCount = stock.filter(s => s.level !== 'safe').length;
    elAlertVal.textContent = alertCount;
  }

  // Render recent activities
  const actListEl = document.getElementById('dash-activity-list');
  if (actListEl) {
    actListEl.innerHTML = activities.slice(0, 4).map(a => `
      <li class="activity-item ${a.status}">
        <div class="act-dot ${a.status}"></div>
        <div class="act-info">
          <span class="act-title">${typeLabel[a.type] || a.type} — ${escHtml(a.customer)}</span>
          <span class="act-meta">${escHtml(a.sales)} · ${a.time}</span>
        </div>
        <span class="act-badge ${a.status === 'done' ? (a.type === 'deal' ? 'success' : 'done') : 'pending'}">
          ${a.status === 'done' ? (a.type === 'deal' ? 'Deal ✓' : 'Selesai') : 'Pending'}
        </span>
      </li>
    `).join('');
  }

  // Render stock alerts
  const stockListEl = document.getElementById('dash-stock-list');
  if (stockListEl) {
    const alerts = stock.filter(s => s.level !== 'safe');
    if (!alerts.length) {
      stockListEl.innerHTML = '<li class="stock-alert-item"><div class="sa-info"><span class="sa-name">Semua stok dalam kondisi aman ✅</span></div></li>';
    } else {
      stockListEl.innerHTML = alerts.map(s => {
        const pct = Math.min(100, Math.round((s.qty / s.min) * 100));
        const clr = s.level === 'danger' ? 'var(--danger)' : 'var(--warning)';
        return `
          <li class="stock-alert-item ${s.level}">
            <div class="sa-info">
              <span class="sa-name">${escHtml(s.name)}</span>
              <span class="sa-sku">${s.sku}</span>
            </div>
            <div class="sa-bar-wrap">
              <div class="sa-bar" style="--pct:${pct}%; --clr:${clr}"></div>
            </div>
            <span class="sa-qty ${s.level}">${s.qty} / ${s.min}</span>
          </li>
        `;
      }).join('');
    }
  }
}

// -- CUSTOMERS --
function initCustomers() {
  renderCustomersList(getCustomers());
}

function renderCustomersList(list) {
  const el = document.getElementById('customer-list');
  if (!el) return;
  if (!list.length) {
    el.innerHTML = `<div class="empty-state"><p>Tidak ada pelanggan ditemukan</p></div>`;
    return;
  }
  el.innerHTML = list.map(c => `
    <div class="customer-card" onclick="showToast('Detail Pelanggan: ${escHtml(c.name)} (${c.phone})','info')">
      <div>
        <div class="cc-name">${escHtml(c.name)}</div>
        <div class="cc-meta">
          <span>📞 ${c.phone}</span>
          <span>👤 ${c.sales}</span>
          <span>✉️ ${c.email || '-'}</span>
          <span>🕒 ${c.lastVisit || 'Baru'}</span>
        </div>
      </div>
      <span class="cc-badge ${c.category}">${capitalize(c.category)}</span>
    </div>
  `).join('');
}

function filterCustomers() {
  const searchEl = document.getElementById('customer-search');
  const catEl = document.getElementById('filter-category');
  const salesEl = document.getElementById('filter-sales');

  const q = (searchEl ? searchEl.value : '').toLowerCase().trim();
  const cat = catEl ? catEl.value : 'all';
  const sales = salesEl ? salesEl.value : 'all';

  let list = getCustomers();
  if (q) {
    list = list.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      c.sales.toLowerCase().includes(q)
    );
  }
  if (cat && cat !== 'all') {
    list = list.filter(c => c.category === cat.toLowerCase());
  }
  if (sales && sales !== 'all') {
    list = list.filter(c => c.sales === sales);
  }
  renderCustomersList(list);
}

function submitAddCustomer(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('[name="name"]')?.value || form.elements[0]?.value;
  const phone = form.querySelector('[name="phone"]')?.value || form.elements[1]?.value;
  const email = form.querySelector('[name="email"]')?.value || form.elements[2]?.value;
  const category = form.querySelector('[name="category"]')?.value || 'active';
  const sales = form.querySelector('[name="sales"]')?.value || 'Rina';

  const customers = getCustomers();
  const newCustomer = {
    id: Date.now(),
    name,
    phone,
    email: email || '-',
    sales,
    category: category.toLowerCase(),
    lastVisit: 'Hari ini'
  };

  customers.unshift(newCustomer);
  saveCustomers(customers);
  closeModal('modal-add-customer');
  form.reset();
  showToast(`Pelanggan "${escHtml(name)}" berhasil ditambahkan!`, 'success');
  filterCustomers();
}

// -- SALES --
function initSales() {
  renderActivitiesList(getActivities());
}

function renderActivitiesList(list) {
  const el = document.getElementById('activity-cards');
  if (!el) return;
  if (!list.length) {
    el.innerHTML = `<div class="empty-state"><p>Tidak ada aktivitas ditemukan</p></div>`;
    return;
  }
  el.innerHTML = list.map(a => `
    <div class="activity-card">
      <div class="ac-type-icon ${a.type}">${typeEmoji[a.type] || '📋'}</div>
      <div class="ac-body">
        <div class="ac-title">${typeLabel[a.type] || capitalize(a.type)} — ${escHtml(a.customer)}</div>
        <div class="ac-sub">👤 ${a.sales}</div>
        ${a.note ? `<div class="ac-note">${escHtml(a.note)}</div>` : ''}
      </div>
      <div class="ac-right">
        <div class="ac-time">${a.time || '10:00'}</div>
        <span class="ac-status ${a.status}">${a.status === 'done' ? (a.type === 'deal' ? 'Deal ✓' : 'Selesai ✓') : 'Pending'}</span>
      </div>
    </div>
  `).join('');
}

function submitAddActivity(e) {
  e.preventDefault();
  const form = e.target;
  const customer = form.querySelector('[name="customer"]')?.value || form.elements[0]?.value;
  const type = form.querySelector('input[name="act-type"]:checked')?.value || 'visit';
  const sales = form.querySelector('[name="sales"]')?.value || 'Rina';
  const note = form.querySelector('[name="note"]')?.value || '';

  const activities = getActivities();
  const newActivity = {
    id: Date.now(),
    type,
    customer,
    sales,
    time: new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }),
    status: 'pending',
    note
  };

  activities.unshift(newActivity);
  saveActivities(activities);
  closeModal('modal-add-activity');
  form.reset();
  showToast('Aktivitas baru berhasil dicatat!', 'success');
  renderActivitiesList(getActivities());
}

// -- STOCK --
let currentStockFilter = 'all';

function initStock() {
  updateStockSummaryChips();
  filterStockList();
}

function updateStockSummaryChips() {
  const stock = getStock();
  const danger = stock.filter(s => s.level === 'danger').length;
  const warn = stock.filter(s => s.level === 'warn').length;
  const safe = stock.filter(s => s.level === 'safe').length;

  const chipDanger = document.getElementById('chip-danger-count');
  const chipWarn = document.getElementById('chip-warn-count');
  const chipSafe = document.getElementById('chip-safe-count');
  const chipAll = document.getElementById('chip-all-count');

  if (chipDanger) chipDanger.textContent = danger;
  if (chipWarn) chipWarn.textContent = warn;
  if (chipSafe) chipSafe.textContent = safe;
  if (chipAll) chipAll.textContent = stock.length;
}

function filterStock(level) {
  currentStockFilter = level;
  document.querySelectorAll('.stock-chip').forEach(c => {
    c.classList.remove('active');
    if (c.dataset.level === level) c.classList.add('active');
  });
  filterStockList();
}

function filterStockList(query) {
  const q = (query !== undefined ? query : (document.getElementById('stock-search')?.value || '')).toLowerCase().trim();
  let list = getStock();

  if (currentStockFilter !== 'all') {
    list = list.filter(s => s.level === currentStockFilter);
  }
  if (q) {
    list = list.filter(s => s.name.toLowerCase().includes(q) || s.sku.toLowerCase().includes(q));
  }
  renderStockCards(list);
}

function renderStockCards(list) {
  const el = document.getElementById('stock-list');
  if (!el) return;
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
          <button class="sc-action-btn in" onclick="adjustStockItem(${s.id}, 5, 'in')">+ 5 Masuk</button>
          <button class="sc-action-btn out" onclick="adjustStockItem(${s.id}, 1, 'out')">− 1 Keluar</button>
          <button class="sc-action-btn" onclick="openMutationFor(${s.id})">Mutasi</button>
        </div>
      </div>
    `;
  }).join('');
}

function adjustStockItem(id, delta, dir) {
  const stock = getStock();
  const item = stock.find(s => s.id === id);
  if (!item) return;

  if (dir === 'out') {
    if (item.qty <= 0) {
      showToast(`Stok ${escHtml(item.name)} sudah 0!`, 'error');
      return;
    }
    item.qty = Math.max(0, item.qty - delta);
  } else {
    item.qty += delta;
  }

  // Recalculate level
  if (item.qty <= Math.round(item.min * 0.25)) {
    item.level = 'danger';
  } else if (item.qty <= item.min) {
    item.level = 'warn';
  } else {
    item.level = 'safe';
  }

  saveStock(stock);
  updateStockSummaryChips();
  filterStockList();
  showToast(`Stok ${escHtml(item.name)} sekarang ${item.qty} ${item.unit}`, 'success');
}

function openMutationFor(id) {
  const stock = getStock();
  const item = stock.find(s => s.id === id);
  const select = document.getElementById('mutation-product-select');
  if (select && item) {
    select.value = item.sku;
  }
  openModal('modal-add-mutation');
}

function submitMutation(e) {
  e.preventDefault();
  const form = e.target;
  const select = document.getElementById('mutation-product-select') || form.querySelector('select');
  const qty = parseInt(form.querySelector('input[type="number"]')?.value || '1', 10);
  const typeActive = form.querySelector('.seg.active')?.textContent.trim() || 'Masuk';

  const stock = getStock();
  const item = stock.find(s => s.sku === select.value || s.name.includes(select.value));

  if (item) {
    if (typeActive === 'Masuk') {
      item.qty += qty;
    } else if (typeActive === 'Keluar') {
      item.qty = Math.max(0, item.qty - qty);
    } else {
      item.qty = qty; // Adjustment
    }

    if (item.qty <= Math.round(item.min * 0.25)) item.level = 'danger';
    else if (item.qty <= item.min) item.level = 'warn';
    else item.level = 'safe';

    saveStock(stock);
    updateStockSummaryChips();
    filterStockList();
  }

  closeModal('modal-add-mutation');
  form.reset();
  showToast('Mutasi stok berhasil dicatat!', 'success');
}

// -- LAPORAN --
function initLaporan() {
  const customers = getCustomers();
  const activities = getActivities();
  const stock = getStock();

  // Populate Customer preview table
  const custTable = document.getElementById('report-cust-table');
  if (custTable) {
    custTable.innerHTML = customers.slice(0, 5).map(c => `
      <tr>
        <td><strong>${escHtml(c.name)}</strong></td>
        <td>${c.phone}</td>
        <td>${c.sales}</td>
        <td><span class="cc-badge ${c.category}">${capitalize(c.category)}</span></td>
      </tr>
    `).join('');
  }

  // Populate Activities preview table
  const salesTable = document.getElementById('report-sales-table');
  if (salesTable) {
    salesTable.innerHTML = activities.slice(0, 5).map(a => `
      <tr>
        <td>${typeEmoji[a.type] || ''} ${typeLabel[a.type] || a.type}</td>
        <td><strong>${escHtml(a.customer)}</strong></td>
        <td>${a.sales}</td>
        <td><span class="ac-status ${a.status}">${a.status === 'done' ? 'Selesai' : 'Pending'}</span></td>
      </tr>
    `).join('');
  }

  // Populate Stock preview table
  const stockTable = document.getElementById('report-stock-table');
  if (stockTable) {
    stockTable.innerHTML = stock.slice(0, 5).map(s => `
      <tr>
        <td><strong>${escHtml(s.name)}</strong></td>
        <td><code>${s.sku}</code></td>
        <td>${s.qty} ${s.unit}</td>
        <td><span class="stock-chip ${s.level}">${capitalize(s.level)}</span></td>
      </tr>
    `).join('');
  }
}

// ──────────────────────────────────────────
// 8. GLOBAL EVENT LISTENERS & BOOTSTRAP
// ──────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateBadges();

  const bodyPage = document.body.dataset.page;
  if (bodyPage === 'login') {
    checkAuth(true);
  } else if (bodyPage) {
    checkAuth(false);
    if (bodyPage === 'dashboard') initDashboard();
    else if (bodyPage === 'customers') initCustomers();
    else if (bodyPage === 'sales') initSales();
    else if (bodyPage === 'stock') initStock();
    else if (bodyPage === 'laporan') initLaporan();
  }
});

// Close popup menu on click outside
document.addEventListener('click', e => {
  const menu = document.getElementById('user-expand-menu');
  const btn = document.getElementById('user-menu-toggle');
  if (menu && menu.classList.contains('open')) {
    if (!menu.contains(e.target) && (!btn || !btn.contains(e.target))) {
      closeUserMenu();
    }
  }
});

// Escape key to close modals
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeUserMenu();
    closeSidebar();
    document.querySelectorAll('.modal-backdrop.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

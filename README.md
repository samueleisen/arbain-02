# CRM Mitra — Project Root

## Isi Workspace

| File | Status | Keterangan |
|---|---|---|
| [`konsep.md`](./konsep.md) | ✅ Selesai | Brief awal — deskripsi kebutuhan mitra |
| [`backend.concept.conf`](./backend.concept.conf) | ✅ Locked | Seluruh keputusan & rancangan backend (KONSEP) |
| [`index.html`](./index.html) | ✅ Selesai | Root entry point — auto-redirect auth ke dashboard/login |
| [`login.html`](./login.html) | ✅ Selesai | Halaman Masuk (Login) mandiri |
| [`dashboard.html`](./dashboard.html) | ✅ Selesai | Halaman Dashboard operasional & ringkasan KPI |
| [`customers.html`](./customers.html) | ✅ Selesai | Halaman Direktori Pelanggan & modal tambah pelanggan |
| [`sales.html`](./sales.html) | ✅ Selesai | Halaman Aktivitas Sales (kunjungan, deal, follow-up) |
| [`stock.html`](./stock.html) | ✅ Selesai | Halaman Inventaris Stok, alert level, & mutasi |
| [`laporan.html`](./laporan.html) | ✅ Selesai | Pusat Laporan & Ekspor Data (CSV & Cetak PDF) |
| [`style.css`](./style.css) | ✅ Selesai | Design system CSS (dark & light utility, responsive, print) |
| [`app.js`](./app.js) | ✅ Selesai | Engine MPA (shared localStorage, theme, auth, CSV exports) |

## Status Implementasi

```
Backend    ░░░░░░░░░░  0%   — Konsep terkunci, implementasi belum dimulai
Frontend   ██████░░░░  60%  — Multi-Page Application (MPA) selesai, URLs terpisah & siap ekspor
DevOps     ░░░░░░░░░░  0%   — GCP belum di-provision
```

## Stack Terkonfirmasi

- **Backend**: Node.js 20 LTS + TypeScript + Fastify + Prisma + PostgreSQL
- **Auth**: Session + Cookie (httpOnly, secure, sameSite=strict)
- **Hosting**: GCP — Compute Engine (e2-small, Jakarta) + Cloud SQL + Memorystore Redis
- **Frontend**: PWA · dark & light utility design system · mobile-first
- **UI Fitur**: Expand profile menu, modal Pengaturan dengan Theme Toggle (Dark/Light), toast notifications
- **Tenant**: Single-tenant (satu mitra)

> Lihat [`backend.concept.conf`](./backend.concept.conf) untuk detail lengkap.

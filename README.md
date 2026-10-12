# CRM Mitra — Project Root

## Isi Workspace

| File | Status | Keterangan |
|---|---|---|
| [`konsep.md`](./konsep.md) | ✅ Selesai | Brief awal — deskripsi kebutuhan mitra |
| [`backend.concept.conf`](./backend.concept.conf) | ✅ Locked | Seluruh keputusan & rancangan backend (KONSEP) |
| [`index.html`](./index.html) | 🔄 Draft | Raw UI prototype — bisa dibuka langsung di browser |
| [`style.css`](./style.css) | 🔄 Draft | Design system CSS (light default & dark theme) |
| [`app.js`](./app.js) | 🔄 Draft | Logic SPA prototype (mock data) |

## Status Implementasi

```
Backend    ░░░░░░░░░░  0%   — Konsep terkunci, implementasi belum dimulai
Frontend   ███░░░░░░░  30%  — Raw UI prototype selesai, belum Vite/React
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

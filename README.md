# Airdrop Quest Tracker

Mini project untuk belajar Svelte dan SvelteKit lewat kasus nyata: dashboard sederhana untuk mencatat progress farming airdrop lintas chain.

## Tech Stack
- SvelteKit + Vite
- GSAP (animasi landing page)
- WalletConnect v2 (opsional, koneksi dompet/injected)
- LocalStorage (persisten tema, profil, catatan)

## Fitur
- Landing page interaktif dengan highlight produk.
- Dashboard airdrop: filter chain/difficulty, pencarian, dan ringkasan progres.
- Modal tambah airdrop custom (nama, slug, chain, difficulty, tags, quests).
- Halaman detail airdrop dengan daftar quest.
- Halaman profil dengan stats, notes/goals, dan onboarding singkat.
- Tema terang/gelap yang tersimpan di browser.
- Koneksi dompet (injected atau WalletConnect) dan persistent session lokal.

## Menjalankan Proyek
1) Pastikan Node.js 18+.
2) Install dependencies:
```bash
npm install
```
3) (Opsional, hanya jika ingin fitur koneksi wallet) Buat `.env`:
```bash
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
```
4) Jalanan dev server:
```bash
npm run dev -- --open
```
5) Build produksi:
```bash
npm run build && npm run preview
```

## Catatan
- Semua data (tema, profil, catatan) disimpan lokal di browser.
- WalletConnect butuh `VITE_WALLETCONNECT_PROJECT_ID`; tanpa itu, koneksi dompet tidak tersedia.

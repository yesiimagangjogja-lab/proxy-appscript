# Proxy Apps Script ke Vercel

## Isi folder
- `vercel.json` → cara utama (rewrite), langsung jalan tanpa setting tambahan.
- `api/proxy.js` → cara cadangan, dipakai kalau cara utama bermasalah (misalnya web app-nya butuh POST atau kena redirect aneh dari Google).

## Cara deploy (via web, tanpa command line)
1. Buka https://vercel.com → login (bisa pakai akun GitHub/Google).
2. Klik **Add New → Project**.
3. Kalau belum punya repo GitHub, paling gampang:
   - Upload folder ini ke GitHub dulu (bikin repo baru, drag semua file ke sana), lalu
   - Di Vercel, klik **Import** dari repo tersebut.
4. Biarkan semua setting default, klik **Deploy**.
5. Tunggu sampai selesai → Vercel kasih URL seperti `https://nama-project.vercel.app`.

## Testing
- Buka `https://nama-project.vercel.app` di browser.
- Kalau muncul isi web app Apps Script kamu → berhasil, dan address bar tetap nunjukin domain Vercel.
- Kalau muncul error/blank/minta login Google → kemungkinan Apps Script-nya butuh cara `api/proxy.js`. Hapus isi `vercel.json` (kosongkan jadi `{}`) lalu akses via `https://nama-project.vercel.app/api/proxy`.

## Custom domain sendiri (opsional)
Kalau punya domain sendiri (misal dari Niagahoster/domain lain), di Vercel:
Project → Settings → Domains → tambahkan domain kamu → ikuti instruksi setting DNS.

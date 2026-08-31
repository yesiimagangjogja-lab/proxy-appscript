// Backup proxy — pakai ini kalau cara vercel.json rewrite tidak jalan.
// Cara pakai: hapus/ubah vercel.json (agar tidak bentrok), lalu akses lewat /api/proxy

const TARGET_URL = "https://script.google.com/macros/s/AKfycbz8f9rvVLfi8XQfB_AuTV_5c5YYnyyGxMx19Tp1wL_DHOhSHx6NLCC6daVnlesWXddo/exec";

export default async function handler(req, res) {
  try {
    // Gabungkan query string kalau ada (misal ?param=1)
    const queryString = req.url.includes("?") ? req.url.substring(req.url.indexOf("?")) : "";
    const url = TARGET_URL + queryString;

    const fetchOptions = {
      method: req.method,
      redirect: "follow", // ikuti redirect internal Apps Script
      headers: {
        "Content-Type": req.headers["content-type"] || "application/json",
      },
    };

    if (req.method !== "GET" && req.method !== "HEAD") {
      fetchOptions.body =
        typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    }

    const response = await fetch(url, fetchOptions);
    const contentType = response.headers.get("content-type") || "text/html";
    const data = await response.text();

    res.setHeader("Content-Type", contentType);
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy gagal", detail: error.message });
  }
}

// themealdb-fetch.mjs — fotos reales de comida por plato (TheMealDB)
import https from "node:https";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const DIR = "C:\\Users\\Magallanes\\Desktop\\restaurante\\public\\images\\uploads";
function get(url) {
  return new Promise((res) => {
    const req = https.get(url, { headers: { "User-Agent": "JulietaDemo/1.0" } }, (r) => {
      if (r.statusCode !== 200) { r.resume(); return res(null); }
      let b = "";
      r.on("data", (c) => (b += c));
      r.on("end", () => res(b));
    });
    req.on("error", () => res(null));
    req.setTimeout(20000, () => { req.destroy(); res(null); });
  });
}
function dl(url, file) {
  return new Promise((res) => {
    const req = https.get(url, { headers: { "User-Agent": "JulietaDemo/1.0" } }, (r) => {
      if (r.statusCode !== 200) { r.resume(); return res(false); }
      const f = fs.createWriteStream(file);
      r.pipe(f);
      f.on("finish", () => f.close(() => res(true)));
      f.on("error", () => res(false));
    });
    req.on("error", () => res(false));
    req.setTimeout(30000, () => { req.destroy(); res(false); });
  });
}
// plato buscar -> archivo destino + filtro de nombre (excluye resultados raros)
const TARGETS = [
  { file: "dish_1.jpg",    search: "caprese salad" },
  { file: "dish_2.jpg",    search: "tuna" },
  { file: "dish_3.jpg",    search: "steak" },
  { file: "dish_4.jpg",    search: "dumpling" },
  { file: "dish_5.jpg",    search: "salmon" },
  { file: "brunch_1.jpg",  search: "pancake" },
  { file: "brunch_2.jpg",  search: "waffle" },
  { file: "brunch_3.jpg",  search: "french toast" },
  { file: "brunch_4.jpg",  search: "breakfast" },
  { file: "dessert_1.jpg", search: "cheesecake" },
  { file: "dessert_2.jpg", search: "tiramisu" },
  { file: "dessert_3.jpg", search: "goat cheese" },
  { file: "seafood_1.jpg", search: "seafood" },
];
(async () => {
  const SEEN = {}; // hash -> archivo, para evitar duplicados
  for (const t of TARGETS) {
    const api = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + encodeURIComponent(t.search);
    const body = await get(api);
    if (!body) { console.log("API FAIL " + t.search); continue; }
    let json = null;
    try { json = JSON.parse(body); } catch {}
    if (!json || !json.meals) { console.log("no meals: " + t.search); continue; }
    let chosen = null;
    for (const m of json.meals) {
      if (!m.strMealThumb) continue;
      const badWords = ["casserole", "soup", "pie", "bread", "bap", "hoisin", "curry"];
      const name = (m.strMeal || "").toLowerCase();
      if (badWords.some((w) => name.includes(w))) continue;
      chosen = m;
      break;
    }
    if (!chosen) chosen = json.meals[0];
    const thumb = chosen.strMealThumb.replaceAll("\\/", "/");
    const ok = await dl(thumb, path.join(DIR, t.file));
    if (ok) {
      const buf = fs.readFileSync(path.join(DIR, t.file));
      const h = crypto.createHash("md5").update(buf).digest("hex");
      if (SEEN[h]) { console.log("DUP-> " + t.file + " == " + SEEN[h] + " (" + chosen.strMeal + ")"); }
      else { SEEN[h] = t.file; console.log("ok " + t.file + " <= " + chosen.strMeal + " [" + Math.round(buf.length/1024) + "KB]"); }
    } else console.log("DL FAIL " + t.file);
    await new Promise((r) => setTimeout(r, 900));
  }
  console.log("done");
})();

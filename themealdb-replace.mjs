"use strict";
/*
 * themealdb-replace.mjs
 *
 * Reemplaza las imágenes duplicadas/irrelevantes del menú (las que apuntan a
 * la misma foto para platos incompatibles) descargando fotos reales de platos
 * por nombre exacto desde TheMealDB (API pública, CC0/Creative Commons).
 *
 * Garantiza unicidad: compara hashes de contenido y, si una descarga cae
 * duplicada, busca la siguiente coincidencia disponible.
 *
 * Uso: node themealdb-replace.mjs
 * Resultado: public/images/uploads/* reemplazado + registro en themealdb-replace.log
 */
import https from "node:https";
import { createHash } from "node:crypto";
import {
  readFileSync,
  writeFileSync,
  readdirSync,
  createWriteStream,
} from "node:fs";
import { resolve } from "node:path";

const ROOT = "C:\\Users\\Magallanes\\Desktop\\restaurante";
const DIR = resolve(ROOT, "public", "images", "uploads");
const LOG = resolve(ROOT, "themealdb-replace.log");
const UA = "JulietaReplace/1.0 (demo educativo; contacto local)";
const TIMEOUT = 25000;

function getJSON(url) {
  return new Promise((res) => {
    const req = https.get(url, { headers: { "User-Agent": UA } }, (r) => {
      let data = "";
      r.on("data", (c) => (data += c));
      r.on("end", () => {
        try {
          res(JSON.parse(data));
        } catch {
          res(null);
        }
      });
    });
    req.setTimeout(TIMEOUT, () => {
      req.destroy();
      res(null);
    });
    req.on("error", () => res(null));
  });
}

function download(url, dest) {
  return new Promise((ok) => {
    const req = https.get(url, { headers: { "User-Agent": UA } }, (r) => {
      if (r.statusCode !== 200) {
        r.resume();
        return ok(false);
      }
      const f = createWriteStream(dest);
      r.pipe(f);
      f.on("finish", () => f.close(() => ok(true)));
      f.on("error", () => ok(false));
    });
    req.setTimeout(TIMEOUT, () => {
      req.destroy();
      ok(false);
    });
    req.on("error", () => ok(false));
  });
}

function hashFile(file) {
  return createHash("sha1").update(readFileSync(file)).digest("hex").slice(0, 16);
}

function existingHashes() {
  const out = {};
  for (const f of readdirSync(DIR).filter((x) => x.endsWith(".jpg"))) {
    out[f] = hashFile(resolve(DIR, f));
  }
  return out;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// Platos reales del menú de Julieta que necesitan foto dedicada (no duplicada).
const PLATES = [
  { file: "dish_food_1.jpg", q: "ceviche" },
  { file: "dish_food_2.jpg", q: "ceviche" },
  { file: "dish_food_3.jpg", q: "ceviche" },
  { file: "dish_food_4.jpg", q: "salmon" },
  { file: "dish_food_5.jpg", q: "salmon" },
  { file: "dish_food_6.jpg", q: "tiramisu" },
  { file: "dish_food_7.jpg", q: "tiramisu" },
  { file: "dish_food_8.jpg", q: "pancakes" },
  { file: "dish_food_9.jpg", q: "pancakes" },
  { file: "dish_food_10.jpg", q: "waffles" },
  { file: "dish_food_11.jpg", q: "waffles" },
];

async function fetchOne(plate, hashes) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(plate.q)}`;
  const resp = await getJSON(url);
  const meals = resp?.meals ?? [];
  if (!meals.length) return false;

  const ranked = meals
    .filter((m) => {
      const n = (m.strMeal || "").toLowerCase();
      const ing = (m.strIngredient1 || "").toLowerCase();
      const matchName = n.includes(plate.q);
      const matchIng = ing.includes(plate.q);
      const hasThumb = Boolean(m.strMealThumb);
      return hasThumb && (matchName || matchIng);
    })
    .sort((a, b) => {
      const ai = (a.strMeal || "").toLowerCase().includes(plate.q) ? 1 : 0;
      const bi = (b.strMeal || "").toLowerCase().includes(plate.q) ? 1 : 0;
      return bi - ai;
    });

  for (const m of ranked) {
    const dlUrl = (m.strMealThumb || "").replace("/preview.jpg", "/medium.jpg");
    if (!dlUrl) continue;
    const ok = await download(dlUrl, resolve(DIR, plate.file));
    if (!ok) continue;
    const h = hashFile(resolve(DIR, plate.file));
    // Si el hash coincide con algún archivo existente, es duplicado de contenido -> saltar.
    if (Object.values(hashes).some((v) => v === h)) continue;
    hashes[plate.file] = h;
    return m.strMeal;
  }
  return false;
}

(async () => {
  const log = [];
  const hashes = existingHashes();
  log.push(`hashes previos=${Object.keys(hashes).length}`);
  log.push(`hashes únicos previos=${new Set(Object.values(hashes)).size}`);

  for (const plate of PLATES) {
    const prev = hashes[plate.file];
    const name = await fetchOne(plate, hashes);
    await sleep(350);
    const now = hashes[plate.file];
    log.push(
      `${plate.file} (q=${plate.q}) -> ${name ? "OK: '" + name + "'" : "SIN MATCH"} | hash=${now ?? "(fallo)"} (antes=${prev ?? "(nueva)"})`,
    );
  }

  const finalHashes = existingHashes();
  const uniqueFinal = new Set(Object.values(finalHashes)).size;
  log.push(`FINAL total=${Object.keys(finalHashes).length} unicos=${uniqueFinal}`);

  writeFileSync(LOG, log.join("\n") + "\n");
  console.log(log.join("\n"));
})();

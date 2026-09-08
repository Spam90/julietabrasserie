import { readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";

const ROOT = "C:\\Users\\Magallanes\\Desktop\\restaurante";
const DIR = resolve(ROOT, "public", "images", "uploads");

const o = {};
for (const f of readdirSync(DIR).filter((x) => x.endsWith(".jpg"))) {
  const h = createHash("sha1")
    .update(readFileSync(resolve(DIR, f)))
    .digest("hex")
    .slice(0, 12);
  o[f] = h;
}

console.log("TOTAL", Object.keys(o).length, "UNICOS", new Set(Object.values(o)).size);
console.log("--- DETALLE ---");
for (const [f, h] of Object.entries(o)) {
  const prev = Object.keys(o).find((k) => o[k] === h && k < f);
  console.log(`${f} -> ${h}${prev ? "  DUP de " + prev : ""}`);
}

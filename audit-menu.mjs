import { parse } from "node:url";
import { readFileSync } from "node:fs";
const c = readFileSync("data/menu.ts", "utf8");
const lines = c.split("\n");
let bad = 0;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("image:")) {
    const m = lines[i].match(/image:\s*"([^"]*)"/);
    if (!m || !m[1] || m[1] === "null") {
      console.log("LINE " + (i + 1) + " (sin image valid): " + lines[i].trim());
      bad++;
    }
  }
}
// tambien detecta dishes sin prop image alguna
const dishBlocks = c.match(/\{\s*id:\s*"[a-z0-9-]+",[^}]+\}/g);
if (dishBlocks) {
  for (const b of dishBlocks) {
    if (!b.includes("image:")) {
      console.log("BLOCK sin image: " + b.slice(0, 60).replace(/\s/g, " "));
      bad++;
    }
  }
}
console.log("total platos sin image valido: " + bad);

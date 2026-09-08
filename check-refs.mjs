import { readFileSync, accessSync, constants } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(process.cwd());
const DIR = resolve(ROOT, "public/images/uploads");

function refsIn(content) {
  return [...content.matchAll(/uploads\/([^"]+\.jpg)/g)].map((m) => m[1]);
}
function exists(f) {
  try {
    accessSync(resolve(DIR, f), constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

const files = [
  "data/menu.ts",
  "app/page.tsx",
  "app/menu/page.tsx",
  "app/reservas/page.tsx",
  "app/ubicacion/page.tsx",
  "app/galeria/page.tsx",
  "components/features/BrunchHero.tsx",
  "components/features/About.tsx",
  "components/features/Hero.tsx",
  "components/features/Experience.tsx",
  "components/features/MenuExplorer.tsx",
];

let total = 0;
let broken = 0;
const missing = [];

for (const rel of files) {
  let content;
  try {
    content = readFileSync(resolve(ROOT, rel), "utf8");
  } catch {
    console.log(`(ignora) ${rel} no existe`);
    continue;
  }
  for (const r of refsIn(content)) {
    total++;
    if (!exists(r)) {
      broken++;
      missing.push(`${rel} -> ${r}`);
    }
  }
}

console.log(`refs totales: ${total} | rotas: ${broken}`);
if (missing.length) {
  console.log("ROTAS:");
  for (const m of missing) console.log("  " + m);
} else {
  console.log("NINGUNA referencia rota.");
}

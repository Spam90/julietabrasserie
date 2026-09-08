import { readFileSync } from "node:fs";
const c = readFileSync("app/globals.css", "utf8");
const m = c.match(/--font-[a-z]+:[^;]+/g);
console.log("fonts en CSS:", m || "NINGUNA");

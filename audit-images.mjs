import { request } from "node:https";
import { URL } from "node:url";

function fetchHTML(target) {
  return new Promise((res) => {
    const u = new URL(target);
    request(
      { hostname: u.hostname, path: u.pathname + u.search, headers: { "User-Agent": "JulietaAudit/1.0" } },
      (r) => {
        let b = "";
        r.on("data", (c) => (b += c));
        r.on("end", () => res(b.slice(0, 18000)));
      }
    ).on("error", () => res("")).end();
  });
}

(async () => {
  for (const path of ["/", "/menu"]) {
    const html = await fetchHTML("http://localhost:3000" + path);
    const srcs = [...html.matchAll(/src="([^"]+)"/g)].map((m) => m[1]);
    const imgs = srcs.filter((s) => s.includes("image") || s.includes(".jpg") || s.includes(".webp"));
    const preloads = [...html.matchAll(/<link[^>]+rel="preload"[^>]+>/g)].map((m) => m[0]);
    console.log("\n=== " + path + " ===");
    console.log("image refs: " + imgs.length);
    for (const i of imgs.slice(0, 10)) console.log("  " + i);
    console.log("preloads: " + preloads.length);
    for (const p of preloads) console.log("  " + p);
  }
})();

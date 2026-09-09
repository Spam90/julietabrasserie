import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const routes = ["", "/menu", "/reservas", "/galeria", "/ubicacion"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${SITE_URL}${r}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: r === "" ? 1 : 0.8,
  }));
}
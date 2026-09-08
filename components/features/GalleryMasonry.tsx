import { Photo } from "@/components/ui/Photo";
import type { GalleryItem } from "@/lib/types";

interface Props {
  items: GalleryItem[];
  columns?: { sm: number; md: number; lg: number };
}

/*
 * Masonry editorial: imágenes de diferente altura y proporción.
 * Desktop usa CSS columns (ligero, sin JS). Mobile se apila.
 */
export function GalleryMasonry({ items }: Props) {
  if (!items?.length) return null;

  return (
    <div className="columns-1 gap-3 sm:columns-2 md:columns-3 lg:columns-4">
      {items.map((it) => (
        <figure key={it.id} className="mb-3 break-inside-avoid">
          <Photo
            src={it.src}
            alt={it.alt}
            width={it.width}
            height={it.height}
            rounded="md"
            cover
          />
          {it.caption && (
            <figcaption className="mt-1.5 text-center text-xs text-smoke-mid">
              {it.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

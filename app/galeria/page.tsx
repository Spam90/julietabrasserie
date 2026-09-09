import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { GalleryMasonry } from "@/components/features/GalleryMasonry";
import { restaurant } from "@/data/restaurant";
import type { GalleryItem } from "@/lib/types";

const gallery: GalleryItem[] = [
  { id: "g1", src: "/images/uploads/hero_cover.jpg", alt: "Comedor principal", width: 1280, height: 853, aspect: "landscape", caption: "Comedor principal" },
  { id: "g2", src: "/images/uploads/hero_food.jpg", alt: "Gastronomía", width: 1280, height: 853, aspect: "landscape", caption: "Platos de la carta" },
  { id: "g3", src: "/images/uploads/int_2.jpg", alt: "Barra", width: 800, height: 1200, aspect: "portrait", caption: "Barra del local" },
  { id: "g4", src: "/images/uploads/int_3.jpg", alt: "Mesas", width: 1200, height: 800, aspect: "landscape", caption: "Mesas del comedor" },
  { id: "g5", src: "/images/uploads/int_4.jpg", alt: "Terraza", width: 1200, height: 800, aspect: "landscape", caption: "Terraza al atardecer" },
    { id: "g6", src: "/images/uploads/dish_3.jpg", alt: "Pulpo", width: 1200, height: 800, aspect: "landscape", caption: "Pulpo al grill" },
  { id: "g7", src: "/images/uploads/dish_4.jpg", alt: "Burrata", width: 1200, height: 800, aspect: "landscape", caption: "Burrata con tomato heirlom" },
  { id: "g8", src: "/images/uploads/dish_food_8.jpg", alt: "Cheesecake", width: 700, height: 700, aspect: "square", caption: "Postre del día" },
  { id: "g9", src: "/images/uploads/coffee_1.jpg", alt: "Espresso", width: 1200, height: 800, aspect: "landscape", caption: "Espresso recién molido" },
  { id: "g10", src: "/images/uploads/cocktail_2.jpg", alt: "Old Fashioned", width: 800, height: 1200, aspect: "portrait", caption: "Old Fashioned" },
    { id: "g11", src: "/images/uploads/dessert_2.jpg", alt: "Tiramisú", width: 1200, height: 800, aspect: "landscape", caption: "Tiramisú clásico" },
  { id: "g12", src: "/images/uploads/int_1.jpg", alt: "Detalle", width: 1200, height: 800, aspect: "landscape", caption: "Detalle del ambiente" },
];

export default function GaleriaPage() {
  return (
    <>
      <Section className="pt-24">
        <Container className="text-center">
          <Badge variant="outline">Galería</Badge>
          <h1 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            La experiencia en imágenes
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-smoke-mid">
            Un recorrido visual por el comedor, la terraza y los platos que
            definen {restaurant.name}.
          </p>
        </Container>
      </Section>
      <Section tight>
        <Container>
          <GalleryMasonry items={gallery} />
        </Container>
      </Section>
    </>
  );
}

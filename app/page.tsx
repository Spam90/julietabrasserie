import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Photo } from "@/components/ui/Photo";
import { restaurant } from "@/data/restaurant";
import { featuredDishes } from "@/data/menu";

export default function Home() {
  return (
    <>
      {/* HERO: composición editorial con superposición de imágenes */}
      <Section narrow className="relative isolate h-[calc(100vh-4rem)] min-h-[42rem] pt-16">
        <HeroImage
          src="/images/uploads/hero_cover.jpg"
          alt="Comedor principal de Julieta Brasserie con luz natural"
          className="absolute inset-0 -z-20 h-full w-full"
          priority
        />
        <HeroImage
          src="/images/uploads/hero_food.jpg"
          alt="Gastronomía de la carta de Julieta"
          className="absolute inset-0 -z-10 h-full w-full object-[center_35%]"
          priority
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/55 via-ink/30 to-transparent" />
        <Container className="relative z-10 mx-auto grid h-full max-w-[72rem] items-center">
          <div className="grid grid-cols-1 gap-8 text-paper">
            <Badge variant="outline" className="self-start border-line/30 text-gold">Piantini · Santo Domingo</Badge>
            <h1 className="font-display text-4xl/1.05 tracking-tight sm:text-5xl/1.05 md:text-6xl/1.05">
              <span className="block">JULIETA</span>
              <span className="text-gold">BRASSERIE</span>
            </h1>
            <p className="max-w-lg text-sm/relaxed text-cream">
              Brasserie de día y noche. Desde el desayuno hasta el cóctel nocturno,
              cada momento diseñado para disfrutar.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button href="/menu" variant="primary" size="lg">Ver menú</Button>
              <Button href="/reservas" variant="secondary" size="lg">Reservar mesa</Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* IDENTIDAD EDITORIAL */}
      <Section tight>
        <Container className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <Badge variant="soft">Una mesa para cada momento.</Badge>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Donde la cocina se siente como en casa.
            </h2>
            <p className="text-smoke-mid">
              En {restaurant.name} combinamos una carta cuidada con un ambiente cálido de
              madera y luz tenue. Desayunos de autor, brunch compartido, una carta de
              cena que celebra el mar y la parrilla, y un bar de cócteles que invita a quedarse.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/menu">Explorar carta</Button>
              <Button href="/reservas" variant="ghost">
                Reservar <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <figure className="relative">
            <Photo
              src="/images/uploads/int_1.jpg"
              alt="Interior del restaurante con decoración cálida"
              width={1200}
              height={1500}
              rounded="lg"
              cover
              className="aspect-[4/5] w-full"
            />
          </figure>
        </Container>
      </Section>

      {/* DESTACADOS */}
      <Section bg="cream" className="pt-0">
        <Container className="text-center">
          <h2 className="mb-4 font-display text-3xl text-ink">Carta destacada</h2>
          <p className="mx-auto mb-10 max-w-2xl text-smoke-mid">
            Tres platos que definen nuestra cocina.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {featuredDishes.map((dish) => (
              <figure key={dish.id} className="group">
                <Photo
                  src={dish.image ?? "/images/uploads/dish_1.jpg"}
                  alt={dish.name}
                  width={1200}
                  height={800}
                  rounded="md"
                  cover
                  className="w-full"
                />
                <figcaption className="mt-3 flex items-baseline justify-between gap-2">
                  <span className="font-display text-lg text-ink">{dish.name}</span>
                  <span className="text-sm font-medium text-ink">
                    {dish.price != null ? `RD$${dish.price}` : "Consultar"}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* BRUNCH EDITORIAL */}
      <Section tight bg="cream">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
            <figure className="md:col-span-5">
              <Photo
                src="/images/uploads/brunch_1.jpg"
                alt="Pancakes apilados con frutos rojos y sirope de arce"
                width={1200}
                height={1400}
                rounded="lg"
                cover
                className="aspect-[4/5] w-full"
              />
            </figure>
            <div className="space-y-5 md:col-span-7 md:pl-6">
              <Badge variant="soft">Buenos días, Julieta.</Badge>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Las mañanas también se comen bien.
              </h2>
              <p className="max-w-md text-smoke-mid">
                Desayunos dominicanos, pancakes, waffles y french toast
                recién hechos. El brunch de Julieta es una razón suficiente
                para madrugar.
              </p>
              <ul className="grid max-w-md grid-cols-2 gap-x-6 gap-y-2 text-sm text-smoke-mid">
                <li>· Dominican</li>
                <li>· American</li>
                <li>· Pancakes</li>
                <li>· Waffles</li>
                <li>· French Toast</li>
                <li>· Opciones ligeras</li>
              </ul>
              <Button href="/menu" variant="secondary">
                Ver desayunos y brunch
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* EXPERIENCIA / AMBIENTE */}
      <Section id="experiencia">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-3">
              <Badge variant="outline">Experiencia</Badge>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Más que un restaurante.
              </h2>
              <p className="max-w-md text-smoke-mid">
                Interior cálido, terraza al aire libre y un bar que se
                anima cuando cae el sol.
              </p>
            </div>
            <Button href="/galeria" variant="ghost">
              Ver galería <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
            <Photo
              src="/images/uploads/int_1.jpg"
              alt="Interior del restaurante"
              width={1200}
              height={800}
              rounded="md"
              cover
              className="col-span-2 aspect-[4/3] w-full md:row-span-2 md:aspect-auto md:h-full"
            />
            <Photo
              src="/images/uploads/int_4.jpg"
              alt="Terraza con iluminación tenue"
              width={1200}
              height={800}
              rounded="md"
              cover
              className="aspect-[4/3] w-full"
            />
            <Photo
              src="/images/uploads/dish_food_8.jpg"
              alt="Platos de la carta"
              width={800}
              height={1200}
              rounded="md"
              cover
              className="aspect-[4/3] w-full"
            />
            <Photo
              src="/images/uploads/coffee_1.jpg"
              alt="Espresso recién molido"
              width={1200}
              height={800}
              rounded="md"
              cover
              className="aspect-[4/3] w-full"
            />
            <Photo
              src="/images/uploads/dish_food_4.jpg"
              alt="Plato de la carta de cena"
              width={1200}
              height={800}
              rounded="md"
              cover
              className="aspect-[4/3] w-full"
            />
          </div>
        </Container>
      </Section>
    </>
  );
}

function HeroImage({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        priority={priority || undefined}
        loading={priority ? "eager" : "lazy"}
        className="object-cover"
      />
    </div>
  );
}

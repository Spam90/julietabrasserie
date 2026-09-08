import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { MenuExplorer } from "@/components/features/MenuExplorer";
import { categories, menu } from "@/data/menu";

export const metadata = {
  title: "Menú — Carta de Julieta Brasserie",
  description:
    "Explora la carta de Julieta Brasserie: desayunos, brunch, entradas, pescados, carnes, postres, café y cócteles en Piantini, Santo Domingo.",
};

/*
 * Menú web interactivo: carta premium, no un PDF.
 * La interactividad vive en MenuExplorer (client); esta página es server.
 */
export default function MenuPage() {
  return (
    <>
      <Section className="pt-28">
        <Container className="space-y-5 text-center">
          <Badge variant="outline">Carta</Badge>
          <h1 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
            Nuestra carta
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-smoke-mid">
            Platos pensados con ingredientes cuidados y cocina de autor.
            Los precios son referenciales; consulte con el equipo para
            opciones del día o alérgenos.
          </p>
        </Container>
      </Section>

      <Section tight bg="cream" className="border-y border-line/40">
        <Container>
          <MenuExplorer categories={categories} menu={menu} />
        </Container>
      </Section>
    </>
  );
}

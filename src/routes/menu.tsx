import { createFileRoute } from "@tanstack/react-router";
import { MenuSection } from "@/components/MenuSection";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Cardápio — Bar do Lago | Petiscos, Drinks e Chopp no Parque Barigui" },
      { name: "description", content: "Confira o cardápio completo do Bar do Lago: petiscos, saladas, pratos principais, drinks, chopp artesanal e cervejas. Restaurante à beira do lago no Parque Barigui, Curitiba." },
      { property: "og:title", content: "Cardápio — Bar do Lago" },
      { property: "og:description", content: "Petiscos, drinks, chopp artesanal e pratos à beira do lago no Parque Barigui, Curitiba." },
    ],
    links: [
      { rel: "canonical", href: "https://bardolago.com.br/menu" },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  return <MenuSection />;
}

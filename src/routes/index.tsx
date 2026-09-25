import { createFileRoute } from "@tanstack/react-router";
import { HomeSections } from "@/components/HomeSections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bar do Lago — Restaurante à Beira do Lago no Parque Barigui, Curitiba" },
      { name: "description", content: "Bar do Lago: restaurante e bar à beira do lago dentro do Parque Barigui, em Curitiba. Petiscos, chopp artesanal, drinks e pôr do sol na água. Reserve sua mesa." },
      { property: "og:title", content: "Bar do Lago — Restaurante à Beira do Lago no Parque Barigui" },
      { property: "og:description", content: "Petiscos, chopp artesanal e drinks à beira do lago, dentro do Parque Barigui em Curitiba." },
    ],
    links: [
      { rel: "canonical", href: "https://bardolago.com.br/" },
    ],
  }),
  component: Index,
});

function Index() {
  return <HomeSections />;
}

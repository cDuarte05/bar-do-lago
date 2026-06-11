import { createFileRoute } from "@tanstack/react-router";
import { MenuSection } from "@/components/MenuSection";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Bar do Lago" },
      { name: "description", content: "Drinks of the Lake, Land Appetizers and Main Courses inspired by the seasons of the lake." },
      { property: "og:title", content: "Menu — Bar do Lago" },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  return <MenuSection />;
}

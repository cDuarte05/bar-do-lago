import { createFileRoute } from "@tanstack/react-router";
import { HomeSections } from "@/components/HomeSections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bar do Lago" },
      { name: "description", content: "A rustic lakeside deck with handcrafted drinks, regional bites and unforgettable sunsets." },
    ],
  }),
  component: Index,
});

function Index() {
  return <HomeSections />;
}

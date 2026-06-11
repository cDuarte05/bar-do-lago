import { createFileRoute } from "@tanstack/react-router";
import { ContactSection } from "@/components/ContactSection";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Reservations — Bar do Lago" },
      { name: "description", content: "Find Bar do Lago on the deck of Serene Lake. Reserve your table and join us for sunset." },
      { property: "og:title", content: "Contact — Bar do Lago" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div style={{ paddingTop: "6rem" }}>
      <ContactSection />
    </div>
  );
}

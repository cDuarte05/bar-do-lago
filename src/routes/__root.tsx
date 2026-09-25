import "../i18n";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";

import "../styles/global.scss";
import { Layout } from "../components/Layout";

function NotFoundComponent() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
      <div>
        <h1>404</h1>
        <p>Page not found.</p>
        <a href="/" className="btn btn--primary">Go home</a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
      <div>
        <h1>Something went wrong</h1>
        <p>{error.message}</p>
        <button className="btn btn--primary" onClick={() => { router.invalidate(); reset(); }}>Try again</button>
      </div>
    </div>
  );
}

// Site-wide, real business data used both for Open Graph/meta defaults
// and for the JSON-LD structured data below. Keep this in sync with
// Google Business Profile (name, address, phone must match exactly).
const SITE_URL = "https://bardolago.com.br";
const BUSINESS = {
  name: "Bar do Lago",
  phone: "+5541997489559",
  phoneDisplay: "(41) 99748-9559",
  streetAddress: "Alameda Ecológica Burle Marx, 10",
  addressLocality: "Curitiba",
  addressRegion: "PR",
  postalCode: "82010-700",
  addressCountry: "BR",
  // Approximate coordinates for this stretch of Alameda Ecológica Burle
  // Marx inside Parque Barigui (near the Av. Cândido Hartmann junction).
  // Fine-tune with the exact pin from Google Maps if you have it —
  // right-click your exact spot on Google Maps to copy precise lat/long.
  latitude: -25.427792583011836,
  longitude: -49.31020543734721,
};

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: BUSINESS.name,
  image: [`${SITE_URL}/og-image.jpg`],
  url: SITE_URL,
  telephone: BUSINESS.phone,
  priceRange: "R$30-R$100",
  servesCuisine: ["Brasileira", "Petiscos", "Bar"],
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.streetAddress,
    addressLocality: BUSINESS.addressLocality,
    addressRegion: BUSINESS.addressRegion,
    postalCode: BUSINESS.postalCode,
    addressCountry: BUSINESS.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.latitude,
    longitude: BUSINESS.longitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "11:00",
      closes: "20:30",
    },
  ],
  menu: `${SITE_URL}/menu`,
  servesFood: true,
  // Add real social profile URLs here once confirmed — helps Google
  // connect the site to your other verified business profiles.
  sameAs: [
    "https://instagram.com/bardolago",
    "https://facebook.com/bardolago",
  ],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Bar do Lago — Restaurante à Beira do Lago no Parque Barigui, Curitiba" },
      { name: "description", content: "Bar do Lago: restaurante e bar à beira do lago dentro do Parque Barigui, em Curitiba. Petiscos, chopp artesanal, drinks e pôr do sol na água. Reserve sua mesa." },
      { name: "keywords", content: "restaurante Parque Barigui, bar do lago, restaurante à beira do lago Curitiba, restaurante Curitiba, bar Parque Barigui, chopp Parque Barigui" },
      { property: "og:site_name", content: "Bar do Lago" },
      { property: "og:title", content: "Bar do Lago — Restaurante à Beira do Lago no Parque Barigui" },
      { property: "og:description", content: "Petiscos, chopp artesanal e drinks à beira do lago, dentro do Parque Barigui em Curitiba." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Bar do Lago — Restaurante à Beira do Lago no Parque Barigui" },
      { name: "twitter:description", content: "Petiscos, chopp artesanal e drinks à beira do lago, dentro do Parque Barigui em Curitiba." },
      { name: "twitter:image", content: `${SITE_URL}/og-image.jpg` },
    ],
    // Canonical is intentionally NOT set here — TanStack Router appends
    // (rather than overrides) duplicate <link> tags across route levels,
    // so a root-level canonical would create two <link rel="canonical">
    // tags per page. Each route sets its own canonical instead.
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(restaurantJsonLd),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    // I18nextProvider with the already-initialized instance guarantees that
    // t() works synchronously on the very first SSR render, with no async
    // hydration gap. This is the recommended pattern for SSR with i18next.
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <Layout />
      </QueryClientProvider>
    </I18nextProvider>
  );
}
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

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Bar do Lago — Experience the Lake's Spirit" },
      { name: "description", content: "Rustic lakeside deck with handcrafted drinks, regional bites and golden sunsets. Reserve your table at Bar do Lago." },
      { property: "og:title", content: "Bar do Lago" },
      { property: "og:description", content: "Rustic lakeside deck — drinks, petiscos and sunsets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
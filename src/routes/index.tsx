import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Enigma Studio — Commissions" },
      { name: "description", content: "Enigma Studio commission information and pricing." },
      { property: "og:title", content: "Enigma Studio — Commissions" },
      { property: "og:description", content: "Enigma Studio commission information and pricing." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/enigma.html"
      title="Enigma Studio Commissions"
      className="fixed inset-0 h-screen w-screen border-0"
    />
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";

const LIGHT_CSS =
  "html.enigma-light{filter:invert(1) hue-rotate(180deg);background:#111015}" +
  "html.enigma-light img,html.enigma-light video{filter:invert(1) hue-rotate(180deg)}";

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
  const frame = useRef<HTMLIFrameElement>(null);
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(localStorage.getItem("enigma-theme") === "light");
  }, []);

  const apply = () => {
    const doc = frame.current?.contentDocument;
    if (!doc) return;
    if (!doc.getElementById("enigma-theme-style")) {
      const st = doc.createElement("style");
      st.id = "enigma-theme-style";
      st.textContent = LIGHT_CSS;
      doc.head.appendChild(st);
    }
    doc.documentElement.classList.toggle("enigma-light", light);
  };

  useEffect(() => {
    apply();
    localStorage.setItem("enigma-theme", light ? "light" : "dark");
  });

  return (
    <>
      <iframe
        ref={frame}
        onLoad={apply}
        src="/enigma.html"
        title="Enigma Studio Commissions"
        className="fixed inset-0 h-screen w-screen border-0"
      />
      <button
        type="button"
        onClick={() => setLight((v) => !v)}
        aria-label={light ? "Switch to night mode" : "Switch to light mode"}
        title={light ? "Night mode" : "Light mode"}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg transition-transform hover:scale-110"
      >
        {light ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </button>
    </>
  );
}

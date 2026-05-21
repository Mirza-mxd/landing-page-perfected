import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import css from "../pages-zatca/zatca.css?raw";
import bodyHtml from "../pages-zatca/zatca-body.html?raw";
import scriptSrc from "../pages-zatca/zatca-script.js?raw";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZATCA Phase 2 Compliance Checklist | Falcon Smart Solutions" },
      {
        name: "description",
        content:
          "The 12-point ZATCA Phase 2 readiness checklist for Saudi finance managers and business owners. Wave 24 goes live 30 June 2026.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&family=Caveat:wght@600;700&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    const s = document.createElement("script");
    s.textContent = scriptSrc;
    document.body.appendChild(s);
    return () => {
      document.body.removeChild(s);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}

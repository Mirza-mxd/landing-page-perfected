import { createFileRoute } from "@tanstack/react-router";
import css from "../pages-zatca/zatca.css?raw";
import bodyHtml from "../pages-zatca/thank-you-body.html?raw";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank you — ZATCA Phase 2 Checklist | Falcon Smart Solutions" },
      {
        name: "description",
        content:
          "Your ZATCA Phase 2 checklist is downloading. Book a free 30-minute call with a Falcon consultant to map your fastest compliance path.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&family=Caveat:wght@600;700&family=Tajawal:wght@400;500;700;800&display=swap",
      },
    ],
  }),
  component: ThankYou,
});

function ThankYou() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}

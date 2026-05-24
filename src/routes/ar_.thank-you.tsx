import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import css from "../pages-zatca/zatca.css?raw";
import bodyHtml from "../pages-zatca/thank-you-body-ar.html?raw";
import scriptSrc from "../pages-zatca/thank-you-script.js?raw";

export const Route = createFileRoute("/ar_/thank-you")({
  head: () => ({
    meta: [
      { title: "شكراً لك — قائمة الامتثال لزاتكا المرحلة الثانية | Falcon Smart Solutions" },
      {
        name: "description",
        content:
          "قائمة التحقق من زاتكا المرحلة الثانية في طريقها إليك. احجز مكالمة مجانية لمدة 30 دقيقة مع مستشار من فالكون لرسم أسرع مسار للامتثال.",
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
  component: ThankYouAr,
});

function ThankYouAr() {
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

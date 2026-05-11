"use client";
import { useState } from "react";

const PHONE = "573142410514";
const WA_URL = `https://wa.me/${PHONE}?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20sobre%20sus%20servicios.`;

export default function WhatsAppWidget() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribirnos por WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "#25D366",
        color: "#fff",
        borderRadius: "999px",
        padding: hovered ? "14px 22px 14px 16px" : "14px",
        boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
        transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        textDecoration: "none",
        overflow: "hidden",
        maxWidth: hovered ? "240px" : "52px",
      }}
    >
      {/* WhatsApp icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="white"
        style={{ width: "24px", height: "24px", flexShrink: 0 }}
      >
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.492.664 4.83 1.824 6.852L2 30l7.352-1.799A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.55 11.55 0 01-5.88-1.608l-.42-.252-4.364 1.068 1.1-4.244-.276-.436A11.56 11.56 0 014.4 16C4.4 9.594 9.594 4.4 16 4.4S27.6 9.594 27.6 16 22.406 27.6 16 27.6zm6.34-8.668c-.348-.174-2.06-1.016-2.38-1.132-.32-.116-.552-.174-.784.174-.232.348-.9 1.132-1.104 1.364-.204.232-.406.26-.754.086-.348-.174-1.468-.54-2.796-1.724-1.032-.92-1.728-2.056-1.932-2.404-.204-.348-.022-.536.152-.708.156-.156.348-.406.522-.61.174-.202.232-.348.348-.58.116-.232.058-.436-.028-.61-.088-.174-.784-1.892-1.074-2.59-.282-.68-.57-.588-.784-.598-.204-.01-.436-.012-.668-.012-.232 0-.61.086-.928.434-.32.348-1.218 1.19-1.218 2.902 0 1.712 1.246 3.368 1.42 3.6.174.232 2.452 3.742 5.942 5.248.832.358 1.48.572 1.986.732.834.266 1.594.228 2.194.138.67-.1 2.06-.842 2.35-1.654.29-.814.29-1.512.204-1.658-.086-.146-.32-.232-.668-.406z"/>
      </svg>

      {/* Label — only visible on hover */}
      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "0.8rem",
          whiteSpace: "nowrap",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.2s ease",
          letterSpacing: "0.02em",
        }}
      >
        ¡Hablemos ahora!
      </span>
    </a>
  );
}

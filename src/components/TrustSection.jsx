import { ArrowUpRight, CreditCard, PackageCheck, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const trustItems = [
  {
    icon: PackageCheck,
    eyebrow: "ENTREGAS",
    title: "Discreción en cada paso",
    description: "Conoce cómo estamos preparando la experiencia de entrega y qué detalles se confirmarán antes de comprar.",
    link: "Ver envíos discretos",
    path: "/envios-discretos",
  },
  {
    icon: ShieldCheck,
    eyebrow: "PRIVACIDAD",
    title: "Tus datos, bajo tu control",
    description: "Consulta cómo se contempla el cuidado de tus datos y qué derechos tienes como cliente.",
    link: "Conocer privacidad",
    path: "/privacidad-y-seguridad",
  },
  {
    icon: CreditCard,
    eyebrow: "PAGOS",
    title: "Información clara para pagar",
    description: "Revisa los medios de pago previstos y el estado actual del proceso antes de continuar.",
    link: "Ver medios de pago",
    path: "/metodos-de-pago",
  },
];

export default function TrustSection() {
  return (
    <section className="trust-section" aria-labelledby="trust-title">
      <div className="trust-heading" data-reveal>
        <span>TRANQUILIDAD ANTES DE ELEGIR</span>
        <h2 id="trust-title">Compra con confianza</h2>
        <p>Información transparente para que explores y decidas a tu ritmo.</p>
      </div>

      <div className="trust-grid">
        {trustItems.map(({ icon: Icon, eyebrow, title, description, link, path }) => (
          <Link className="trust-card" data-reveal="zoom" to={path} key={path}>
            <span className="trust-card-icon"><Icon size={23} strokeWidth={1.8} /></span>
            <span className="trust-card-eyebrow">{eyebrow}</span>
            <h3>{title}</h3>
            <p>{description}</p>
            <strong>{link}<ArrowUpRight size={16} /></strong>
          </Link>
        ))}
      </div>
    </section>
  );
}

import { Building2, CreditCard, Smartphone, WalletCards } from "lucide-react";

const methods = [
  {
    icon: Smartphone,
    name: "Yape y Plin",
    description: "Opciones de pago móvil contempladas para facilitar tus compras.",
    tag: "Pago móvil",
  },
  {
    icon: CreditCard,
    name: "Tarjetas",
    description: "Pago con tarjeta de débito o crédito mediante una pasarela segura, cuando esté habilitada.",
    tag: "Débito y crédito",
  },
  {
    icon: Building2,
    name: "Transferencia",
    description: "Una alternativa prevista para quienes prefieren pagar desde su entidad bancaria.",
    tag: "Banca",
  },
];

export default function PaymentMethods() {
  return (
    <div className="payments-page">
      <section className="payments-hero">
        <span className="payments-eyebrow">COMPRA CON TRANQUILIDAD</span>
        <h1>Elige cómo<br /><em>quieres pagar.</em></h1>
        <p>
          Estamos preparando distintas formas de pago para que elijas la que
          mejor se adapte a ti.
        </p>
      </section>

      <section className="payments-methods" aria-label="Métodos de pago previstos">
        {methods.map(({ icon: Icon, name, description, tag }) => (
          <article className="payments-method-card" data-reveal key={name}>
            <span className="payments-method-icon"><Icon size={24} /></span>
            <span className="payments-method-tag">{tag}</span>
            <h2>{name}</h2>
            <p>{description}</p>
          </article>
        ))}
      </section>

      <aside className="payments-status" data-reveal>
        <span className="payments-status-icon"><WalletCards size={22} /></span>
        <div>
          <strong>El proceso de pago aún está en preparación</strong>
          <p>
            Por ahora, la tienda no procesa pagos en línea. Las opciones se
            activarán cuando el checkout y sus proveedores estén configurados;
            antes de pagar verás los medios disponibles y el total de tu compra.
          </p>
        </div>
      </aside>
    </div>
  );
}

import { Check, Clock3, MapPin, ShoppingBag } from "lucide-react";

const steps = [
  { icon: ShoppingBag, title: "Elige tus productos", text: "Agrega al carrito lo que quieras comprar." },
  { icon: MapPin, title: "Selecciona el recojo", text: "Cuando esté disponible, podrás elegir un punto de recojo durante la compra." },
  { icon: Check, title: "Espera la confirmación", text: "Te avisaremos cuándo y dónde estará listo tu pedido." },
];

export default function StorePickup() {
  return (
    <div className="pickup-page">
      <section className="pickup-hero">
        <span className="pickup-eyebrow">UNA OPCIÓN PRÁCTICA Y RESERVADA</span>
        <h1>Recojo en tienda<br /><em>a tu ritmo.</em></h1>
        <p>
          Estamos preparando la opción de recoger tus compras personalmente,
          con coordinación previa y cuidado de tu privacidad.
        </p>
      </section>

      <section className="pickup-steps" aria-label="Cómo funcionará el recojo en tienda">
        {steps.map(({ icon: Icon, title, text }, index) => (
          <article className="pickup-step" data-reveal key={title}>
            <span className="pickup-step-number">0{index + 1}</span>
            <span className="pickup-step-icon"><Icon size={22} /></span>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <aside className="pickup-status" data-reveal>
        <Clock3 size={22} aria-hidden="true" />
        <div>
          <strong>El recojo aún no está habilitado</strong>
          <p>
            Todavía no hay puntos de recojo, horarios ni proceso de coordinación
            definidos. Publicaremos esa información aquí cuando el servicio esté listo.
          </p>
        </div>
      </aside>
    </div>
  );
}

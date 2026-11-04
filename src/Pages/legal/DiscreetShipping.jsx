import { MapPin, PackageCheck, PackageOpen } from "lucide-react";

const details = [
  {
    icon: PackageOpen,
    title: "Empaque reservado",
    description: "La tienda busca cuidar tu privacidad desde la preparación del pedido.",
  },
  {
    icon: MapPin,
    title: "Entrega coordinada",
    description: "La dirección y los datos de contacto se solicitarán al confirmar una compra.",
  },
  {
    icon: PackageCheck,
    title: "Información clara",
    description: "El costo y el plazo estimado deberán mostrarse antes de finalizar el pedido.",
  },
];

export default function DiscreetShipping() {
  return (
    <div className="shipping-page">
      <section className="shipping-hero">
        <span className="shipping-eyebrow">TU PRIVACIDAD NOS IMPORTA</span>
        <h1>Recibe tu pedido<br /><em>con discreción.</em></h1>
        <p>
          Queremos que compres con confianza. La experiencia de entrega está
          pensada para cuidar tu privacidad en cada paso.
        </p>
      </section>

      <section className="shipping-details" aria-label="Experiencia de envío">
        {details.map(({ icon: Icon, title, description }) => (
          <article className="shipping-detail-card" key={title}>
            <span className="shipping-detail-icon"><Icon size={23} /></span>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </section>

      <aside className="shipping-status">
        <strong>Detalles del servicio</strong>
        <p>
          El costo, la cobertura, el tiempo de entrega y el tipo de empaque aún
          deben confirmarse para la tienda. Cuando el proceso de compra esté
          habilitado, mostraremos estos datos antes de que confirmes tu pedido.
        </p>
      </aside>
    </div>
  );
}

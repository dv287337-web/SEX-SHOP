
import {
  Truck,
  ShieldCheck,
  CreditCard,
  MapPin,
  Headphones
} from "lucide-react";

function Benefits() {
  const benefits = [
    {
      icon: <Truck />,
      title: "Envíos discretos",
      description: "A todo el Perú"
    },
    {
      icon: <ShieldCheck />,
      title: "Compra segura",
      description: "Privacidad garantizada"
    },
    {
      icon: <CreditCard />,
      title: "Pagos flexibles",
      description: "Yape, Plin y tarjetas"
    },
    {
      icon: <MapPin />,
      title: "Recojo en tienda",
      description: "Disponible en Lima"
    },
    {
      icon: <Headphones />,
      title: "Atención personalizada",
      description: "Te ayudamos con tu compra"
    }
  ];

  return (
    <section className="benefits">
      {benefits.map((benefit, index) => (
        <div className="benefit-item" key={index}>
          <div className="benefit-icon">
            {benefit.icon}
          </div>

          <div className="benefit-text">
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Benefits;

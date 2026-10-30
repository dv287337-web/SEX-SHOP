
import { MessageCircle } from "lucide-react";

function WhatsAppButton() {
  // Reemplazar por el número real de WhatsApp de la tienda.
  const whatsappNumber = "";

  const message = encodeURIComponent(
    "Hola, quisiera recibir información sobre sus productos."
  );

  return (
    <a
      className="whatsapp-button"
      href={
        whatsappNumber
          ? `https://wa.me/${whatsappNumber}?text=${message}`
          : "#"
      }
      target={whatsappNumber ? "_blank" : undefined}
      rel="noreferrer"
      aria-label="Consultar por WhatsApp"
      title="Consultar por WhatsApp"
      onClick={(event) => {
        if (!whatsappNumber) {
          event.preventDefault();
          alert("Próximamente habilitaremos nuestro WhatsApp.");
        }
      }}
    >
      <MessageCircle />
    </a>
  );
}

export default WhatsAppButton;

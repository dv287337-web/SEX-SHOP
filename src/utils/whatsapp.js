// Configurar este número con código de país, solo dígitos (Perú: 51 + número).
export const whatsappNumber = "";

const initialMessage = encodeURIComponent(
  "Hola, quisiera recibir información sobre sus productos."
);

export const whatsappUrl = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${initialMessage}`
  : null;

export function openWhatsApp() {
  if (!whatsappUrl) {
    window.alert("Próximamente habilitaremos nuestro WhatsApp.");
    return;
  }

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

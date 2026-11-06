// Configurar este número con código de país, solo dígitos (Perú: 51 + número).
export const whatsappNumber = "";

const initialMessage = encodeURIComponent(
  "Hola, quisiera recibir información sobre sus productos de forma discreta."
);

export const whatsappUrl = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${initialMessage}`
  : null;

export function openWhatsApp() {
  if (!whatsappUrl) {
    window.dispatchEvent(
      new CustomEvent("sexshop-toast", {
        detail: {
          title: "Atención por WhatsApp",
          message: "Próximamente habilitaremos nuestro canal oficial de WhatsApp para asesoría discreta.",
          type: "info",
        },
      })
    );
    return;
  }

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

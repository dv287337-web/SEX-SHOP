
import { openWhatsApp, whatsappUrl } from "../utils/whatsapp";

function WhatsAppButton() {
  return (
    <a
      className="whatsapp-button"
      href={whatsappUrl || "#"}
      target={whatsappUrl ? "_blank" : undefined}
      rel="noreferrer"
      aria-label="Consultar por WhatsApp"
      title="Consultar por WhatsApp"
      onClick={(event) => {
        if (!whatsappUrl) {
          event.preventDefault();
          openWhatsApp();
        }
      }}
    >
      <svg className="whatsapp-mark" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 3.2a12.4 12.4 0 0 0-10.7 18.7L3.7 28l6.3-1.6A12.4 12.4 0 1 0 16 3.2Z" />
        <path d="M12.1 10.2c-.3-.7-.6-.7-.9-.7h-.8c-.3 0-.8.1-1.2.6-.4.5-1.6 1.6-1.6 3.9s1.6 4.5 1.8 4.8c.2.3 3.1 5 7.7 6.8 3.8 1.5 4.6 1.2 5.4 1.1.8-.1 2.6-1.1 2.9-2.1.4-1 .4-1.9.3-2.1-.1-.2-.4-.3-.9-.6-.5-.2-2.6-1.3-3-1.5-.4-.1-.7-.2-1 .3-.3.5-1.1 1.5-1.4 1.8-.3.3-.5.4-1 .1-.5-.2-1.9-.7-3.6-2.2-1.3-1.1-2.2-2.5-2.5-3-.3-.5 0-.7.2-1 .2-.2.5-.5.7-.8.2-.3.3-.5.5-.8.2-.3.1-.6 0-.8-.1-.2-.9-2.3-1.2-3Z" transform="translate(1 -1) scale(.86)" />
      </svg>
    </a>
  );
}

export default WhatsAppButton;

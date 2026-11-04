import { BookOpenCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { openWhatsApp } from "../utils/whatsapp";

const collections = [
  { label: "PARA ELLA", to: "/para-ella" },
  { label: "PARA ÉL", to: "/para-el" },
  { label: "PARA PAREJAS", to: "/para-parejas" },
  { label: "LENCERÍA", to: "/lenceria" },
  { label: "JUGUETES", to: "/juguetes" },
  { label: "COSMÉTICA ERÓTICA", to: "/cosmetica-erotica" },
  { label: "BDSM", to: "/bdsm" },
  { label: "OFERTAS", to: "/ofertas" },
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <nav className="footer-column" aria-label="Colecciones">
          <h2>Colecciones</h2>
          {collections.map((collection) => (
            <Link key={collection.to} to={collection.to}>
              {collection.label}
            </Link>
          ))}
        </nav>

        <section className="footer-column">
          <h2>Información corporativa</h2>
          <Link to="/sobre-nosotros">SOBRE NUESTRA TIENDA</Link>
          <Link to="/envios-discretos">ENVÍOS DISCRETOS</Link>
          <Link to="/metodos-de-pago">MÉTODOS DE PAGO</Link>
          <Link to="/privacidad-y-seguridad">PRIVACIDAD Y SEGURIDAD</Link>
          <a
            href="#atencion-personalizada"
            onClick={(event) => {
              event.preventDefault();
              openWhatsApp();
            }}
          >
            ATENCIÓN PERSONALIZADA
          </a>
        </section>

        <section className="footer-column footer-help">
          <h2>Ayuda</h2>
          <div className="footer-help-layout">
            <nav className="footer-help-links" aria-label="Enlaces de ayuda">
              <a
                href="#contacto-whatsapp"
                onClick={(event) => {
                  event.preventDefault();
                  openWhatsApp();
                }}
              >
                CONTACTO
              </a>
              <span>SERVICIO AL CLIENTE</span>
              <Link to="/mi-cuenta">MI CUENTA</Link>
              <Link to="/recojo-en-tienda">RECOJO EN TIENDA</Link>
              <span>TÉRMINOS Y CONDICIONES</span>
            </nav>

            <div className="footer-claims-card" aria-label="Libro de Reclamaciones">
              <BookOpenCheck size={38} strokeWidth={1.5} aria-hidden="true" />
              <strong>Libro de<br />Reclamaciones</strong>
            </div>
          </div>

          <div className="footer-help-legal">
            <Link to="/privacidad-y-seguridad">AVISO DE PRIVACIDAD</Link>
            <Link to="/metodos-de-pago">MÉTODOS DE PAGO</Link>
            <span>CAMBIOS Y DEVOLUCIONES</span>
          </div>
        </section>

        <section className="footer-member">
          <h2>Únete a nuestra comunidad</h2>
          <p>
            Descubre novedades, nuevas colecciones y beneficios especiales
            pensados para disfrutar a tu manera.
          </p>
          <span className="footer-member-note">NOVEDADES · EXPERIENCIAS · BIENESTAR</span>
        </section>
      </div>

      <div className="footer-legal">
        <span>© {new Date().getFullYear()} SexShop. Todos los derechos reservados.</span>
        <span>Solo para mayores de 18 años</span>
      </div>
    </footer>
  );
}

export default Footer;

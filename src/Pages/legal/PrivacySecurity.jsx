import { ArrowUpRight, Eye, LockKeyhole, ShieldCheck } from "lucide-react";

const rights = [
  { title: "Acceso", text: "Consultar qué datos personales se tienen sobre ti y cómo se utilizan." },
  { title: "Rectificación", text: "Solicitar que se corrijan o actualicen datos inexactos o incompletos." },
  { title: "Cancelación", text: "Pedir la eliminación de tus datos cuando corresponda." },
  { title: "Oposición", text: "Oponerte a determinados usos de tus datos personales." },
];

export default function PrivacySecurity() {
  return (
    <div className="privacy-page">
      <section className="privacy-hero">
        <span className="privacy-eyebrow">TRANSPARENCIA Y CONFIANZA</span>
        <h1>Tu privacidad<br /><em>es importante.</em></h1>
        <p>
          Queremos que explores y compres con tranquilidad. Aquí encontrarás
          información clara sobre privacidad, seguridad y tus derechos.
        </p>
      </section>

      <section className="privacy-principles" aria-label="Nuestros principios">
        <article data-reveal>
          <span><Eye size={22} /></span>
          <h2>Claridad</h2>
          <p>Comparte solo la información necesaria para tu consulta o compra.</p>
        </article>
        <article data-reveal>
          <span><LockKeyhole size={22} /></span>
          <h2>Cuidado</h2>
          <p>No compartas contraseñas ni códigos de verificación por mensajes.</p>
        </article>
        <article data-reveal>
          <span><ShieldCheck size={22} /></span>
          <h2>Control</h2>
          <p>Puedes ejercer tus derechos sobre tus datos personales.</p>
        </article>
      </section>

      <section className="privacy-rights">
        <div className="privacy-rights-intro" data-reveal>
          <span className="privacy-eyebrow">TUS DERECHOS</span>
          <h2>También tienes el control de tus datos.</h2>
          <p>
            En Perú, la Ley N.° 29733 reconoce los derechos de acceso,
            rectificación, cancelación y oposición (ARCO). Para solicitar su
            ejercicio, ponte en contacto con la tienda por sus canales de atención.
          </p>
          <a href="https://www.gob.pe/9270-que-son-los-derechos-arco" target="_blank" rel="noreferrer">
            Conoce los derechos ARCO <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="privacy-rights-list">
          {rights.map((right) => (
            <article data-reveal key={right.title}>
              <h3>{right.title}</h3>
              <p>{right.text}</p>
            </article>
          ))}
        </div>
      </section>

      <aside className="privacy-note" data-reveal>
        <strong>Una nota importante</strong>
        <p>
          Esta sección brinda información general. Antes de recibir pedidos en
          línea, la tienda debe completar su aviso de privacidad con sus datos
          de contacto y explicar con precisión qué información recopila, para
          qué la usa, cuánto tiempo la conserva y con quién la comparte.
        </p>
      </aside>
    </div>
  );
}

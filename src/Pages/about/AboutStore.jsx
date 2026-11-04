import { ArrowRight, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Sparkles,
    title: "Explora a tu manera",
    description: "Encuentra distintas colecciones para descubrir qué se siente bien para ti.",
  },
  {
    icon: ShieldCheck,
    title: "Discreción y cuidado",
    description: "Queremos que tu experiencia de compra se sienta privada, clara y cómoda.",
  },
  {
    icon: Heart,
    title: "Sin juicios ni presiones",
    description: "Un espacio para elegir a tu ritmo, con información sencilla y cercana.",
  },
];

export default function AboutStore() {
  return (
    <div className="about-store-page">
      <section className="about-store-hero">
        <div className="about-store-hero-copy">
          <span className="about-store-eyebrow">ACERCA DE SEXSHOP</span>
          <h1>Bienestar íntimo,<br /><em>a tu manera.</em></h1>
          <p>
            Un espacio pensado para descubrir, disfrutar y conectar contigo,
            con calma, confianza y total discreción.
          </p>
          <Link className="about-store-cta" to="/juguetes">
            Explorar colecciones <ArrowRight size={17} />
          </Link>
        </div>

        <div className="about-store-art" aria-hidden="true">
          <span className="about-store-orbit about-store-orbit-one" />
          <span className="about-store-orbit about-store-orbit-two" />
          <span className="about-store-heart"><Heart size={62} strokeWidth={1.1} /></span>
          <span className="about-store-art-caption">Tu espacio. Tu ritmo.</span>
        </div>
      </section>

      <section className="about-store-story">
        <div className="about-store-story-heading">
          <span className="about-store-eyebrow">NUESTRA ESENCIA</span>
          <h2>Un lugar para sentirte bien siendo tú.</h2>
        </div>
        <div className="about-store-story-copy">
          <p>
            Creemos que el bienestar íntimo forma parte de conocerte, cuidarte
            y compartir. Por eso reunimos colecciones para distintas formas de
            explorar, desde lencería y cosmética hasta opciones para disfrutar
            en pareja.
          </p>
          <p>
            Queremos acompañarte con una experiencia cercana, envíos discretos
            y la libertad de elegir lo que va contigo, sin prisas ni juicios.
          </p>
        </div>
      </section>

      <section className="about-store-values">
        <div className="about-store-section-heading">
          <span className="about-store-eyebrow">LO QUE NOS MUEVE</span>
          <h2>Una experiencia hecha para ti</h2>
        </div>
        <div className="about-store-value-grid">
          {values.map(({ icon: Icon, title, description }) => (
            <article className="about-store-value-card" key={title}>
              <span className="about-store-value-icon"><Icon size={22} /></span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

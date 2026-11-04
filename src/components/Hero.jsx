import {
  Sparkles,
  Heart,
  Flame,
  HeartHandshake
} from "lucide-react";
import campaignImage from "../assets/campaign-hero.jpg";

function Hero() {
  return (
    <section
      className="hero"
      style={{ "--hero-image": `url(${campaignImage})` }}
    >
      <div className="hero-content">
        <span className="hero-subtitle">
          DESCUBRE UNA NUEVA FORMA DE SENTIR
        </span>

        <h1>
          TU PLACER,
          <br />
          <strong>SIN LÍMITES</strong>
        </h1>

        <p>
          Explora, descubre y disfruta de una experiencia
          diseñada para despertar tus sentidos.
        </p>

        <a href="#categorias" className="hero-button">
          VER COLECCIÓN <span>→</span>
        </a>
      </div>

      <div className="hero-values">
        <span><Sparkles /> DISCRECIÓN</span>
        <span><Heart /> BIENESTAR</span>
        <span><Flame /> LIBERTAD</span>
        <span><HeartHandshake /> PLACER</span>
      </div>
    </section>
  );
}
export default Hero;

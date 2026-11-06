import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import campaignImage from "../assets/campaign-hero.jpg";
import editorialImages from "../assets/category-editorial-grid.jpg";

const campaigns = [
  {
    id: "campaign",
    eyebrow: "DESCUBRE UNA NUEVA FORMA DE SENTIR",
    title: "TU PLACER,",
    accent: "SIN LÍMITES",
    description: "Explora, descubre y disfruta de una experiencia diseñada para despertar tus sentidos.",
    action: "VER COLECCIÓN",
    to: "/juguetes",
    image: campaignImage,
    position: "center",
    wideImage: true,
  },
  {
    id: "lingerie",
    eyebrow: "SIÉNTETE TÚ",
    title: "LENCERÍA",
    accent: "A TU MANERA",
    description: "Texturas delicadas y detalles para sentirte cómoda, segura y auténtica.",
    action: "DESCUBRIR LENCERÍA",
    to: "/lenceria",
    image: editorialImages,
    position: "0% 0%",
  },
  {
    id: "couples",
    eyebrow: "PARA COMPARTIR",
    title: "MÁS CERCA,",
    accent: "A SU RITMO",
    description: "Ideas para conectar, conversar y disfrutar nuevos momentos en pareja.",
    action: "EXPLORAR PARA PAREJAS",
    to: "/para-parejas",
    image: editorialImages,
    position: "66.667% 0%",
  },
  {
    id: "wellness",
    eyebrow: "BIENESTAR ÍNTIMO",
    title: "CUIDARTE",
    accent: "SE SIENTE BIEN",
    description: "Pequeños rituales para reconectar contigo y disfrutar a tu manera.",
    action: "VER BIENESTAR ÍNTIMO",
    to: "/cosmetica-erotica",
    image: editorialImages,
    position: "33.333% 100%",
  },
  {
    id: "discovery",
    eyebrow: "EXPLORA SIN PRISAS",
    title: "DESCUBRE",
    accent: "LO QUE TE GUSTA",
    description: "Encuentra opciones pensadas para explorar, disfrutar y elegir a tu ritmo.",
    action: "EXPLORAR COLECCIÓN",
    to: "/juguetes",
    image: editorialImages,
    position: "0% 100%",
  },
  {
    id: "gift",
    eyebrow: "UN DETALLE ESPECIAL",
    title: "SORPRÉNDETE",
    accent: "Y DISFRUTA",
    description: "Encuentra algo especial para ti o para compartir en una ocasión única.",
    action: "DESCUBRIR OFERTAS",
    to: "/ofertas",
    image: editorialImages,
    position: "100% 100%",
  },
];

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const activeCampaign = campaigns[activeIndex];
  const shouldAutoplay = !isHovered && !isFocused && !prefersReducedMotion;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (!shouldAutoplay) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % campaigns.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [shouldAutoplay, activeIndex]);

  const showCampaign = (index) => {
    setActiveIndex((index + campaigns.length) % campaigns.length);
  };

  return (
    <section
      className="hero"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Campañas destacadas"
      aria-live="off"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false);
      }}
    >
      <div
        key={activeCampaign.id}
        className={`hero-visual ${activeCampaign.wideImage ? "hero-visual--wide" : ""}`}
        style={{
          "--slide-image": `url(${activeCampaign.image})`,
          "--slide-position": activeCampaign.position,
        }}
        aria-hidden="true"
      />

      <div className="hero-content" key={`${activeCampaign.id}-copy`}>
        <span className="hero-subtitle">{activeCampaign.eyebrow}</span>
        <h1>
          {activeCampaign.title}
          <br />
          <strong>{activeCampaign.accent}</strong>
        </h1>
        <p>{activeCampaign.description}</p>
        <Link to={activeCampaign.to} className="hero-button">
          {activeCampaign.action} <span><ArrowRight size={17} /></span>
        </Link>
      </div>

      <div className="hero-carousel-controls" role="group" aria-label="Controles de campañas">
        <div className="hero-carousel-dots" aria-label={`Campaña ${activeIndex + 1} de ${campaigns.length}`}>
          {campaigns.map((campaign, index) => (
            <button
              type="button"
              key={campaign.id}
              className={index === activeIndex ? "is-active" : ""}
              aria-label={`Mostrar campaña ${index + 1}: ${campaign.eyebrow}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => showCampaign(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;

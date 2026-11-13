import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import campaignImage from "../assets/campaign-hero.jpg";
import editorialImages from "../assets/category-editorial-grid.jpg";

const campaigns = [
  {
    id: "campaign",
    eyebrow: "DESCUBRE UNA NUEVA FORMA DE SENTIR",
    title: "TU PLACER,",
    accent: "SIN LÍMITES",
    description: "Explora, descubre y disfruta de una experiencia diseñada para despertar tus sentidos con total naturalidad.",
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
    description: "Texturas delicadas y detalles para sentirte cómoda, segura y auténtica en cada momento.",
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
    description: "Ideas para conectar, conversar y disfrutar nuevos momentos en pareja desde la complicidad.",
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
    description: "Pequeños rituales sensoriales para reconectar contigo y consentirte sin prisas ni prejuicios.",
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
    description: "Encuentra opciones pensadas para explorar, disfrutar y elegir a tu ritmo con discreción garantizada.",
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
    description: "Encuentra un detalle inolvidable para ti o para compartir en una ocasión íntima única.",
    action: "DESCUBRIR OFERTAS",
    to: "/ofertas",
    image: editorialImages,
    position: "100% 100%",
  },
];

const luxuryEase = [0.16, 1, 0.3, 1];

function Hero() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const activeCampaign = campaigns[activeIndex];
  const shouldAutoplay = !isHovered && !isFocused && !prefersReducedMotion;

  // Parallax Scroll Effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const parallaxBgY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const parallaxContentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.42]);

  useEffect(() => {
    if (!shouldAutoplay) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % campaigns.length);
    }, 6800);
    return () => window.clearInterval(timer);
  }, [shouldAutoplay, activeIndex]);

  const handleMouseMove = (event) => {
    if (prefersReducedMotion) return;
    const { clientX, clientY } = event;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setMouseOffset({
      x: ((clientX - centerX) / centerX) * 20,
      y: ((clientY - centerY) / centerY) * 20,
    });
  };

  const showCampaign = (index) => {
    setActiveIndex((index + campaigns.length) % campaigns.length);
  };

  return (
    <section
      ref={containerRef}
      className="hero hero--luxe"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Campañas destacadas"
      aria-live="off"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMouseOffset({ x: 0, y: 0 });
      }}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false);
      }}
    >
      {/* Aura de resplandor ambiental interactivo */}
      <div
        className="hero-ambient-glow"
        aria-hidden="true"
        style={{
          transform: `translate(${mouseOffset.x * 1.5}px, ${mouseOffset.y * 1.5}px)`,
        }}
      />

      {/* Capa de imagen de fondo con Parallax */}
      <motion.div
        className="hero-visual-wrapper"
        style={{ y: parallaxBgY, opacity: heroOpacity }}
        aria-hidden="true"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCampaign.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 1.2, ease: luxuryEase }}
            className={`hero-visual ${activeCampaign.wideImage ? "hero-visual--wide" : ""}`}
            style={{
              "--slide-image": `url(${activeCampaign.image})`,
              "--slide-position": activeCampaign.position,
              transform: `translate(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px)`,
            }}
          />
        </AnimatePresence>
        <div className="hero-visual-vignette" />
      </motion.div>

      {/* Contenido Editorial con Parallax y Reveal Cinemático */}
      <motion.div
        className="hero-content"
        style={{ y: parallaxContentY, opacity: heroOpacity }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCampaign.id}-copy`}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.85, ease: luxuryEase }}
            className="hero-copy-group"
          >
            <div className="hero-eyebrow-wrapper">
              <span className="hero-subtitle">
                <Sparkles size={13} className="hero-subtitle-icon" />
                {activeCampaign.eyebrow}
              </span>
            </div>

            <h1 className="hero-title">
              <span className="hero-title-main">{activeCampaign.title}</span>
              <span className="hero-title-accent">{activeCampaign.accent}</span>
            </h1>

            <p className="hero-description">{activeCampaign.description}</p>

            <div className="hero-actions">
              <Link to={activeCampaign.to} className="hero-button hero-button--primary">
                <span>{activeCampaign.action}</span>
                <span className="hero-button-icon">
                  <ArrowRight size={16} />
                </span>
              </Link>

              <div className="hero-trust-badge">
                <span><Lock size={13} /> Empaque 100% neutro y discreto</span>
                <span><ShieldCheck size={13} /> Envíos seguros a todo el Perú</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Controles del Carrusel con Indicadores de Lujo */}
      <div className="hero-carousel-controls" role="group" aria-label="Controles de campañas">
        <div className="hero-carousel-dots" aria-label={`Campaña ${activeIndex + 1} de ${campaigns.length}`}>
          {campaigns.map((campaign, index) => (
            <button
              type="button"
              key={campaign.id}
              className={`hero-dot ${index === activeIndex ? "is-active" : ""}`}
              aria-label={`Mostrar campaña ${index + 1}: ${campaign.eyebrow}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => showCampaign(index)}
            >
              <span className="hero-dot-fill" />
            </button>
          ))}
        </div>
      </div>

      <a className="hero-scroll-cue" href="#beneficios">
        <span>EXPLORA MÁS</span>
        <ChevronDown size={16} />
      </a>
    </section>
  );
}

export default Hero;

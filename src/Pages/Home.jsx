import { useRef } from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Benefits from "../components/Benefits";
import FeaturedProducts from "../components/FeaturedProducts";
import HomeCollections from "../components/HomeCollections";
import TrustSection from "../components/TrustSection";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import categorySprite from "../assets/category-editorial-grid.jpg";

function Home() {
  const storyRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress: pageScrollProgress } = useScroll();
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"],
  });

  const parallaxImageY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["-10%", "10%"]);
  const parallaxScale = useTransform(scrollYProgress, [0, 0.5, 1], prefersReducedMotion ? [1, 1, 1] : [1.08, 1, 1.05]);

  return (
    <>
      <motion.div
        className="home-scroll-progress"
        style={{ scaleX: pageScrollProgress }}
        aria-hidden="true"
      />
      <Hero />
      <Benefits />
      <FeaturedProducts />
      <Categories />
      <TrustSection />
      <HomeCollections />

      {/* Brand Story Editorial Section with Parallax */}
      <section ref={storyRef} className="brand-story">
        <div className="brand-story-art-container" aria-hidden="true">
          <motion.div
            className="brand-story-art"
            style={{
              "--category-sprite": `url(${categorySprite})`,
              y: parallaxImageY,
              scale: parallaxScale,
            }}
          />
        </div>

        <div className="brand-story-copy" data-reveal="right">
          <span className="brand-story-eyebrow">UN LUGAR PARA SENTIRTE BIEN</span>
          <h2>Tu bienestar merece un espacio propio.</h2>
          <p>
            Creemos que explorar, cuidarte y conectar contigo debe sentirse
            natural. Encuentra una experiencia cercana, discreta y hecha a tu ritmo,
            con piezas seleccionadas por su calidad, ergonomía y diseño contemporáneo.
          </p>
          <div className="brand-story-actions">
            <Link to="/para-ella" className="brand-story-cta">
              <span>DESCUBRIR LA COLECCIÓN</span>
              <span className="cta-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;

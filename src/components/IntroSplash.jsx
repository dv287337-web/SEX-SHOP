import { useEffect, useState } from "react";
import { Heart, Sparkles } from "lucide-react";

export default function IntroSplash() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setIsExiting(true), 2100);
    const hideTimer = window.setTimeout(() => setIsVisible(false), 2700);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`intro-splash ${isExiting ? "is-exiting" : ""}`}
      role="status"
      aria-label="Cargando SexShop"
    >
      <div className="intro-splash-orbit intro-splash-orbit-one" />
      <div className="intro-splash-orbit intro-splash-orbit-two" />

      <div className="intro-splash-content">
        <div className="intro-splash-mark">
          <span className="intro-splash-mark-glow" />
          <Heart size={42} fill="currentColor" strokeWidth={1.5} />
          <Sparkles className="intro-splash-sparkle" size={18} />
        </div>

        <p className="intro-splash-kicker">BIENVENIDO A TU MOMENTO</p>
        <h1>
          Sex<span>Shop</span><b>♥</b>
        </h1>
        <p className="intro-splash-tagline">Tu placer, sin límites.</p>

        <div className="intro-splash-progress" aria-hidden="true">
          <span />
        </div>
        <p className="intro-splash-loading">Preparando una experiencia para ti</p>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Box, Heart, LockKeyhole, ShieldCheck } from "lucide-react";

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
      <span className="intro-splash-ribbon intro-splash-ribbon-top" />
      <span className="intro-splash-ribbon intro-splash-ribbon-bottom" />
      <span className="intro-splash-lace intro-splash-lace-top-left" />
      <span className="intro-splash-lace intro-splash-lace-bottom-right" />

      <div className="intro-splash-orbit intro-splash-orbit-one" />
      <div className="intro-splash-orbit intro-splash-orbit-two" />
      <div className="intro-splash-orbit intro-splash-orbit-glow" />

      <div className="intro-splash-content">
        <div className="intro-splash-mark">
          <span className="intro-splash-mark-glow" />
          <svg className="intro-splash-mark-art" viewBox="0 0 120 120" aria-hidden="true">
            <path d="M43 29c-8 9-11 18-9 27 2 8 8 12 13 16 5 4 5 10 1 17" />
            <path d="M76 29c8 9 11 18 9 27-2 8-8 12-13 16-5 4-5 10-1 17" />
            <path d="M45 45c4 5 9 7 15 7s11-2 15-7" />
            <path d="M47 71c5 7 8 14 13 20 5-6 8-13 13-20" />
            <path d="M39 33c4-8 10-12 20-12s16 4 20 12" />
          </svg>
          <Heart className="intro-splash-heart" size={24} fill="currentColor" strokeWidth={1.5} />
        </div>

        <p className="intro-splash-kicker">BIENVENIDO A TU MOMENTO</p>
        <h1>
          Sex<span>Shop</span><b>♥</b>
        </h1>
        <p className="intro-splash-tagline">Tu placer, sin límites.</p>

        <div className="intro-splash-progress-row">
          <div className="intro-splash-progress" aria-hidden="true">
            <span />
          </div>
          <strong>75%</strong>
        </div>
        <p className="intro-splash-loading">Preparando una experiencia más íntima para ti...</p>

        <div className="intro-splash-benefits">
          <span><ShieldCheck size={25} /><b>Compra segura</b></span>
          <i />
          <span><Box size={25} /><b>Envío discreto</b></span>
          <i />
          <span><LockKeyhole size={25} /><b>Privacidad total</b></span>
        </div>
      </div>
    </div>
  );
}

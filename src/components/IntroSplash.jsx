import { useEffect, useState } from "react";
import { Box, Heart, LoaderCircle, LockKeyhole, ShieldCheck, X } from "lucide-react";

export default function IntroSplash() {
  const [isVisible, setIsVisible] = useState(() => sessionStorage.getItem("sexshop-intro-seen") !== "true");
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return undefined;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = prefersReducedMotion ? 450 : 1050;
    const progressTimer = window.setInterval(() => {
      setProgress((currentProgress) => Math.min(currentProgress + 5, 100));
    }, duration / 20);
    const exitTimer = window.setTimeout(() => setIsExiting(true), duration);
    const hideTimer = window.setTimeout(() => {
      sessionStorage.setItem("sexshop-intro-seen", "true");
      setIsVisible(false);
    }, duration + 300);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, [isVisible]);

  const skipIntro = () => {
    sessionStorage.setItem("sexshop-intro-seen", "true");
    setIsExiting(true);
    window.setTimeout(() => setIsVisible(false), 180);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`intro-splash ${isExiting ? "is-exiting" : ""}`}
      role="status"
      aria-label="Cargando SexShop"
    >
      <button type="button" className="intro-splash-skip" onClick={skipIntro} aria-label="Saltar introducción">
        <span>Saltar</span>
        <X size={16} />
      </button>
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
            <path d="M60 23c-16 0-27 11-27 27 0 12 7 19 16 25 7 5 8 12 3 22" />
            <path d="M60 23c16 0 27 11 27 27 0 12-7 19-16 25-7 5-8 12-3 22" />
            <path d="M42 59c5 6 11 9 18 9s13-3 18-9" />
            <path d="M49 76c4 2 8 6 11 12 3-6 7-10 11-12" />
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
            <span style={{ width: `${progress}%` }} />
          </div>
          <strong>{progress}%</strong>
        </div>
        <p className="intro-splash-loading">
          <LoaderCircle size={15} aria-hidden="true" />
          Preparando una experiencia más íntima para ti...
        </p>

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

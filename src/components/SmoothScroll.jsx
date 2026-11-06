import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { useShop } from "../context/ShopContext";

export default function SmoothScroll() {
  const { pathname } = useLocation();
  const { cartDrawerOpen, favoritesDrawerOpen } = useShop();

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.1 : 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
    });

    window.lenis = lenis;
    document.documentElement.classList.add("lenis", "lenis-smooth");

    let frameId;
    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      lenis.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      delete window.lenis;
    };
  }, []);

  // Reset scroll to top on route change
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  // Pause Lenis when drawers/modals are open so background doesn't scroll
  useEffect(() => {
    if (!window.lenis) return;
    if (cartDrawerOpen || favoritesDrawerOpen) {
      window.lenis.stop();
    } else {
      window.lenis.start();
    }
  }, [cartDrawerOpen, favoritesDrawerOpen]);

  return null;
}

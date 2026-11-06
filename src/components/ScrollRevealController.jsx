import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const REVEAL_SELECTOR = [
  "[data-reveal]",
  ".catalog-page .products-grid > .product-card",
  ".favorites-page .favorite-card",
  ".cart-page .cart-product",
].join(",");

export default function ScrollRevealController() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const targets = document.querySelectorAll(REVEAL_SELECTOR);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!targets.length || reduceMotion || !("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    const observed = new Set();
    root.classList.add("motion-ready");
    const categoryCards = [...document.querySelectorAll(".categories-section .category-card")];
    const categoryPairs = [...document.querySelectorAll(".categories-section .category-pair")];
    const categoryAnimationEndHandlers = new Map();

    categoryCards.forEach((card) => {
      card.classList.add("motion-reveal");
      card.style.setProperty("--reveal-delay", "0ms");
      const clearIntroAnimation = (event) => {
        if (event.animationName === "category-pair-arrive") card.classList.remove("motion-reveal");
      };
      categoryAnimationEndHandlers.set(card, clearIntroAnimation);
      card.addEventListener("animationend", clearIntroAnimation);
    });

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
    );

    const observeNewTargets = () => {
      document.querySelectorAll(REVEAL_SELECTOR).forEach((target, index) => {
        if (observed.has(target)) return;
        if (target.matches(".categories-section .category-card")) return;
        observed.add(target);
        target.classList.add("motion-reveal");
        target.style.setProperty("--reveal-delay", `${(index % 5) * 42}ms`);
        revealObserver.observe(target);
      });
    };

    const categoryStartObserver = categoryPairs.length
      ? new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.querySelectorAll(".category-card").forEach((card) => card.classList.add("is-revealed"));
            observer.unobserve(entry.target);
          });
        }, { threshold: 0.06, rootMargin: "-34% 0px -44% 0px" })
      : null;

    categoryPairs.forEach((pair) => categoryStartObserver?.observe(pair));

    observeNewTargets();
    const mutationObserver = new MutationObserver(observeNewTargets);
    mutationObserver.observe(document.querySelector("main") || document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      revealObserver.disconnect();
      categoryStartObserver?.disconnect();
      observed.forEach((target) => {
        target.classList.remove("motion-reveal", "is-revealed");
        target.style.removeProperty("--reveal-delay");
      });
      categoryCards.forEach((card) => {
        card.removeEventListener("animationend", categoryAnimationEndHandlers.get(card));
        card.classList.remove("motion-reveal", "is-revealed");
        card.style.removeProperty("--reveal-delay");
      });
      root.classList.remove("motion-ready");
    };
  }, [pathname, search]);

  return null;
}


import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import categorySprite from "../assets/category-editorial-grid.jpg";

const categories = [
  {
    name: "Para Ella",
    subtitle: "DESCUBRIR COLECCIÓN",
    icon: "♀",
    style: "ella",
    path: "/para-ella"
  },
  {
    name: "Para Él",
    subtitle: "DESCUBRIR COLECCIÓN",
    icon: "♂",
    style: "el",
    path: "/para-el"
  },
  {
    name: "Para Parejas",
    subtitle: "DESCUBRIR COLECCIÓN",
    icon: "♥",
    style: "parejas",
    path: "/para-parejas"
  },
  {
    name: "Lencería",
    subtitle: "DESCUBRIR COLECCIÓN",
    icon: "✦",
    style: "lenceria",
    path: "/lenceria"
  },
  {
    name: "Juguetes",
    subtitle: "DESCUBRIR COLECCIÓN",
    icon: "♡",
    style: "juguetes",
    path: "/juguetes"
  },
  {
    name: "Cosmética Erótica",
    subtitle: "DESCUBRIR COLECCIÓN",
    icon: "❀",
    style: "cosmetica",
    path: "/cosmetica-erotica"
  },
  {
    name: "BDSM",
    subtitle: "DESCUBRIR COLECCIÓN",
    icon: "♠",
    style: "bdsm",
    path: "/bdsm"
  },
  {
    name: "Ofertas",
    subtitle: "DESCUBRIR OFERTAS",
    icon: "✧",
    style: "ofertas",
    path: "/ofertas"
  }
];

function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const gestureStart = useRef(null);
  const lastWheelChange = useRef(0);
  const changeCategory = (direction) => {
    setActiveIndex((current) => (current + direction + categories.length) % categories.length);
  };

  const handleGestureStart = (event) => {
    event.currentTarget.setPointerCapture?.(event.pointerId);
    gestureStart.current = event.clientX ?? event.touches?.[0]?.clientX ?? null;
  };

  const handleGestureEnd = (event) => {
    if (gestureStart.current === null) return;
    const endX = event.clientX ?? event.changedTouches?.[0]?.clientX ?? gestureStart.current;
    const distance = endX - gestureStart.current;
    gestureStart.current = null;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    if (Math.abs(distance) < 42) return;
    changeCategory(distance < 0 ? 1 : -1);
  };

  const handleWheel = (event) => {
    if (Math.abs(event.deltaX) < Math.abs(event.deltaY)) return;
    const now = Date.now();
    if (now - lastWheelChange.current < 520) return;
    lastWheelChange.current = now;
    changeCategory(event.deltaX > 0 ? 1 : -1);
  };

  const getOffset = (index) => {
    let offset = index - activeIndex;
    if (offset > categories.length / 2) offset -= categories.length;
    if (offset < -categories.length / 2) offset += categories.length;
    return offset;
  };

  return (
    <section className="categories-section" id="categorias">

      <div className="section-heading" data-reveal>
        <div>
          <span>ENCUENTRA LO QUE BUSCAS</span>
          <h2>NUESTRAS CATEGORÍAS</h2>
        </div>

        <a href="#categorias">
          EXPLORAR TODAS →
        </a>
      </div>

      <div className="categories-carousel" role="region" aria-roledescription="carrusel" aria-label="Nuestras categorías">
        <button type="button" className="categories-carousel-button categories-carousel-button--prev" onClick={() => changeCategory(-1)} aria-label="Ver categoría anterior">
          <ArrowLeft size={18} />
        </button>
        <div
          className="categories-grid"
          onPointerDown={handleGestureStart}
          onPointerUp={handleGestureEnd}
          onPointerCancel={(event) => {
            gestureStart.current = null;
            event.currentTarget.releasePointerCapture?.(event.pointerId);
          }}
          onWheel={handleWheel}
        >
          {categories.map((category) => {
              const index = categories.indexOf(category);
              const offset = getOffset(index);
              return (
                <Link
                  to={category.path}
                  className={`category-card ${category.style} position-${offset} ${index === activeIndex ? "is-active" : ""}`}
                  onClick={(event) => {
                    if (index !== activeIndex) {
                      event.preventDefault();
                      setActiveIndex(index);
                    }
                  }}
                  aria-current={index === activeIndex ? "true" : undefined}
                  key={category.name}
                  style={{
                    "--sprite-x": `${(index % 4) * (100 / 3)}%`,
                    "--sprite-y": index < 4 ? "0%" : "100%",
                    "--category-sprite": `url(${categorySprite})`
                  }}
                >
                  <div className="category-image" aria-hidden="true" />
                  <div className="category-info">
                    <h3>{category.name}</h3>
                    <span>{category.subtitle} →</span>
                  </div>
                </Link>
              );
            })}
        </div>
        <button type="button" className="categories-carousel-button categories-carousel-button--next" onClick={() => changeCategory(1)} aria-label="Ver categoría siguiente">
          <ArrowRight size={18} />
        </button>
      </div>

    </section>
  );
}

export default Categories;

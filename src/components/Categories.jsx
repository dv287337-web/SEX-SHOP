
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  HeartHandshake,
  Link2,
  Mars,
  Shirt,
  SprayCan,
  Tag,
  Venus,
  Vibrate
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import categorySprite from "../assets/category-editorial-grid.jpg";

const categories = [
  {
    name: "Para Ella",
    subtitle: "DESCUBRIR COLECCIÓN",
    icon: Venus,
    style: "ella",
    path: "/para-ella"
  },
  {
    name: "Para Él",
    subtitle: "DESCUBRIR COLECCIÓN",
    icon: Mars,
    style: "el",
    path: "/para-el"
  },
  {
    name: "Para Parejas",
    subtitle: "DESCUBRIR COLECCIÓN",
    icon: HeartHandshake,
    style: "parejas",
    path: "/para-parejas"
  },
  {
    name: "Lencería",
    subtitle: "DESCUBRIR COLECCIÓN",
    icon: Shirt,
    style: "lenceria",
    path: "/lenceria"
  },
  {
    name: "Juguetes",
    subtitle: "DESCUBRIR COLECCIÓN",
    icon: Vibrate,
    style: "juguetes",
    path: "/juguetes"
  },
  {
    name: "Cosmética Erótica",
    subtitle: "DESCUBRIR COLECCIÓN",
    icon: SprayCan,
    style: "cosmetica",
    path: "/cosmetica-erotica"
  },
  {
    name: "BDSM",
    subtitle: "DESCUBRIR COLECCIÓN",
    icon: Link2,
    style: "bdsm",
    path: "/bdsm"
  },
  {
    name: "Ofertas",
    subtitle: "DESCUBRIR OFERTAS",
    icon: Tag,
    style: "ofertas",
    path: "/ofertas"
  }
];

function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const gestureStart = useRef(null);
  const lastWheelChange = useRef(0);
  const gridRef = useRef(null);
  const changeCategory = (direction) => {
    setActiveIndex((current) => (current + direction + categories.length) % categories.length);
  };

  const handleGestureStart = (event) => {
    gestureStart.current = event.clientX ?? event.touches?.[0]?.clientX ?? null;
  };

  const handleGestureEnd = (event) => {
    if (gestureStart.current === null) return;
    const endX = event.clientX ?? event.changedTouches?.[0]?.clientX ?? gestureStart.current;
    const distance = endX - gestureStart.current;
    gestureStart.current = null;
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

  useEffect(() => {
    const activeCard = gridRef.current?.querySelector(
      `[data-category-index="${activeIndex}"]`
    );

    activeCard?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex]);

  return (
    <section className="categories-section" id="categorias">

      <div className="section-heading" data-reveal>
        <div>
          <span>ENCUENTRA LO QUE BUSCAS</span>
          <h2>NUESTRAS CATEGORÍAS</h2>
        </div>

          <Link to="/para-ella">
            VER CATÁLOGO →
          </Link>
      </div>

      <div className="categories-carousel" role="region" aria-roledescription="carrusel" aria-label="Nuestras categorías">
        <button type="button" className="categories-carousel-button categories-carousel-button--prev" onClick={() => changeCategory(-1)} aria-label="Ver categoría anterior">
          <ArrowLeft size={18} />
        </button>
        <div
          className="categories-grid"
          ref={gridRef}
          tabIndex="0"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") changeCategory(-1);
            if (event.key === "ArrowRight") changeCategory(1);
          }}
          onPointerDown={handleGestureStart}
          onPointerUp={handleGestureEnd}
          onPointerCancel={() => {
            gestureStart.current = null;
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
                    event.preventDefault();
                    navigate(category.path);
                  }}
                  aria-current={index === activeIndex ? "true" : undefined}
                  data-category-index={index}
                  key={category.name}
                  style={{
                    "--sprite-x": `${(index % 4) * (100 / 3)}%`,
                    "--sprite-y": index < 4 ? "0%" : "100%",
                    "--category-sprite": `url(${categorySprite})`
                  }}
                  >
                  <div className="category-image" aria-hidden="true" />
                  <div className="category-info">
                    <div className="category-title">
                      <category.icon aria-hidden="true" strokeWidth={1.8} />
                      <h3>{category.name}</h3>
                    </div>
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


import {
  Link
} from "react-router-dom";
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
  return (
    <section className="categories-section" id="categorias">

      <div className="section-heading">
        <div>
          <span>ENCUENTRA LO QUE BUSCAS</span>
          <h2>NUESTRAS CATEGORÍAS</h2>
        </div>

        <a href="#categorias">
          EXPLORAR TODAS →
        </a>
      </div>

      <div className="categories-grid">
        {categories.map((category, index) => (
          <Link
            to={category.path}
            className={`category-card ${category.style}`}
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
        ))}
      </div>

    </section>
  );
}

export default Categories;

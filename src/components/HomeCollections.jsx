import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import categorySprite from "../assets/category-editorial-grid.jpg";

const collections = [
  {
    eyebrow: "SUAVIDAD Y CONFIANZA",
    title: "Lencería para sentirte tú",
    description: "Texturas delicadas y detalles que invitan a disfrutar a tu manera.",
    path: "/lenceria",
    position: "100% 0%",
    theme: "lingerie"
  },
  {
    eyebrow: "BIENESTAR ÍNTIMO",
    title: "Pequeños rituales, grandes momentos",
    description: "Descubre una selección pensada para acompañar tu bienestar.",
    path: "/cosmetica-erotica",
    position: "33.333% 100%",
    theme: "wellness"
  },
  {
    eyebrow: "PARA COMPARTIR",
    title: "Conexión a dos",
    description: "Ideas para explorar, conversar y disfrutar en pareja.",
    path: "/para-parejas",
    position: "66.667% 0%",
    theme: "couples"
  }
];

function HomeCollections() {
  return (
    <section className="home-collections">
      <div className="home-section-heading">
        <span>DESCUBRE A TU MANERA</span>
        <h2>Un espacio para cada deseo</h2>
        <p>Explora nuestras colecciones y encuentra aquello que conecta contigo.</p>
      </div>

      <div className="home-collection-grid">
        {collections.map((collection) => (
          <Link
            className={`home-collection-card ${collection.theme}`}
            key={collection.path}
            to={collection.path}
            style={{
              "--collection-sprite": `url(${categorySprite})`,
              "--collection-position": collection.position
            }}
          >
            <span>{collection.eyebrow}</span>
            <div>
              <h3>{collection.title}</h3>
              <p>{collection.description}</p>
              <strong>EXPLORAR COLECCIÓN <ArrowUpRight size={16} /></strong>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default HomeCollections;

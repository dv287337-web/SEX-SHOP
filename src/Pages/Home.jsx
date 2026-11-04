
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Benefits from "../components/Benefits";
import HomeCollections from "../components/HomeCollections";
import { Link } from "react-router-dom";
import categorySprite from "../assets/category-editorial-grid.jpg";

function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <Categories />
      <HomeCollections />
      <section className="brand-story">
        <div
          className="brand-story-art"
          aria-hidden="true"
          style={{ "--category-sprite": `url(${categorySprite})` }}
        />
        <div className="brand-story-copy">
          <span>UN LUGAR PARA SENTIRTE BIEN</span>
          <h2>Tu bienestar merece un espacio propio.</h2>
          <p>
            Creemos que explorar, cuidarte y conectar contigo debe sentirse
            natural. Encuentra una experiencia cercana, discreta y hecha a tu ritmo.
          </p>
          <Link to="/para-ella">DESCUBRIR LA COLECCIÓN <span>→</span></Link>
        </div>
      </section>
    </>
  );
}

export default Home;

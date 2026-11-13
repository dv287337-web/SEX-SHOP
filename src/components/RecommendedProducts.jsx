import { Heart, ShoppingBag, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { allCatalogProducts } from "../data/catalogProducts";
import { useShop } from "../context/ShopContext";

export default function RecommendedProducts() {
  const { favorites, cart, customProducts, addToCart, toggleFavorite, isFavorite } = useShop();
  const preferredCategories = [...favorites, ...cart]
    .map((product) => product.category)
    .filter(Boolean);

  const candidates = [...(customProducts || []), ...allCatalogProducts];
  const products = candidates
    .filter((product, index, list) => product?.id && list.findIndex((item) => String(item.id) === String(product.id)) === index)
    .filter((product) => !cart.some((item) => String(item.id) === String(product.id)))
    .sort((a, b) => {
      const aMatch = preferredCategories.includes(a.category) ? 1 : 0;
      const bMatch = preferredCategories.includes(b.category) ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 4);

  return (
    <section className="recommended-section" aria-labelledby="recommended-title">
      <div className="home-section-heading" data-reveal>
        <span><Sparkles size={13} /> PENSADO PARA TI</span>
        <h2 id="recommended-title">
          {preferredCategories.length ? "También puede gustarte" : "Empieza a explorar"}
        </h2>
        <p>Una selección para descubrir nuevos favoritos a tu ritmo.</p>
      </div>

      <div className="recommended-grid">
        {products.map((product) => (
          <article className="recommended-card" data-reveal key={product.id}>
            <Link className="recommended-image" to={`/producto/${product.id}`}>
              {product.image ? <img src={product.image} alt="" loading="lazy" /> : <Sparkles size={30} />}
            </Link>
            <div className="recommended-body">
              <span>{product.category || "Selección especial"}</span>
              <h3><Link to={`/producto/${product.id}`}>{product.name}</Link></h3>
              <div className="recommended-footer">
                <strong>S/ {Number(product.price || 0).toFixed(2)}</strong>
                <button type="button" className="recommended-add" onClick={() => addToCart(product)} aria-label={`Agregar ${product.name} al carrito`}>
                  <ShoppingBag size={16} />
                </button>
                <button type="button" className={`recommended-favorite ${isFavorite(product.id) ? "is-active" : ""}`} onClick={() => toggleFavorite(product)} aria-label={`Guardar ${product.name} en favoritos`}>
                  <Heart size={16} fill={isFavorite(product.id) ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

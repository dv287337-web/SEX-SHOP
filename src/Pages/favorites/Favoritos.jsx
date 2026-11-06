import {
  Heart,
  ShoppingBag,
  Trash2,
  Sparkles,
  ArrowRight
} from "lucide-react";

import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

function Favoritos() {
  const {
    favorites,
    removeFavorite,
    addToCart
  } = useShop();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <section className="favorites-page">
      <div className="favorites-banner">
        <span>COLECCIÓN PERSONAL</span>
        <h1>Mis favoritos</h1>
        <p>Todos los productos que has elegido especialmente para ti.</p>
        <Heart className="favorites-banner-icon" />
      </div>

      <div className="favorites-container">
        <div className="favorites-heading">
          <div>
            <span>TU SELECCIÓN PERSONAL</span>
            <h2>Productos que te encantan</h2>
          </div>

          <strong>
            {favorites.length} productos
          </strong>
        </div>

        {favorites.length > 0 ? (
          <div className="favorites-grid">
            {favorites.map((product) => (
              <article className="favorite-card" key={product.id}>
                <div className="favorite-card-image">
                  <div className="product-placeholder">
                    <Sparkles size={42} />
                    <span>Imagen del producto</span>
                  </div>

                  {product.tag && (
                    <span className="product-tag">
                      {product.tag}
                    </span>
                  )}

                  <button
                    className="favorite-remove"
                    onClick={() => removeFavorite(product.id)}
                    aria-label="Eliminar de favoritos"
                    title="Eliminar de favoritos"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="favorite-card-info">
                  <span>{product.category}</span>

                  <h3>{product.name}</h3>

                  <div className="favorite-card-price">
                    <strong>
                      S/ {product.price.toFixed(2)}
                    </strong>

                    {product.oldPrice && (
                      <del>
                        S/ {product.oldPrice.toFixed(2)}
                      </del>
                    )}
                  </div>

                  <button
                    className="add-cart-button"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingBag size={17} />
                    Agregar al carrito
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="favorites-empty">
            <div className="favorites-empty-icon">
              <Heart size={38} />
            </div>

            <h3>Aún no tienes favoritos</h3>

            <p>
              Explora nuestra colección y guarda los productos
              que más te gusten presionando el corazón.
            </p>

            <Link to="/" className="favorites-shop-button">
              Explorar productos
              <ArrowRight size={17} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default Favoritos;

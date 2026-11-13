import { Sparkles, ArrowRight, Star, Heart, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function FeaturedProducts() {
  const { customProducts, toggleFavorite, isFavorite, addToCart } = useShop();
  const navigate = useNavigate();

  // Si no hay productos nuevos subidos, no mostramos la sección o mostramos productos destacados
  const productsToShow = (customProducts || []).slice(0, 4);

  if (productsToShow.length === 0) return null;

  const handleOpenProduct = (product) => {
    sessionStorage.setItem(`sexshop-product-${product.id}`, JSON.stringify(product));
    navigate(`/producto/${encodeURIComponent(product.id)}`, { state: { product } });
  };

  return (
    <section className="home-featured-section">
      <div className="home-section-heading" data-reveal>
        <span className="home-featured-pill">
          <Sparkles size={13} />
          NOVEDADES DE LA BOUTIQUE
        </span>
        <h2>Recién Llegados al Catálogo</h2>
        <p>Descubre las últimas incorporaciones seleccionadas por su diseño y experiencia sensorial.</p>
      </div>

      <div className="home-featured-grid">
        {productsToShow.map((product) => (
          <div 
            key={product.id} 
            className="home-featured-card"
            data-reveal
          >
            <div 
              className="home-featured-image-box"
              onClick={() => handleOpenProduct(product)}
            >
              <img 
                src={product.image} 
                alt={product.name}
                loading="lazy"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600";
                }}
              />
              {product.tag && (
                <span className="home-featured-tag">{product.tag}</span>
              )}
              <button 
                type="button" 
                className={`favorite-button ${isFavorite(product.id) ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(product);
                }}
                aria-label="Guardar en favoritos"
              >
                <Heart size={18} fill={isFavorite(product.id) ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="home-featured-body">
              <div className="home-featured-meta">
                <span className="home-featured-mat">{product.material || "Silicona médica"}</span>
                <span className="home-featured-rating">
                  <Star size={13} fill="#FFB800" color="#FFB800" />
                  {Number(product.rating || 5).toFixed(1)}
                </span>
              </div>

              <h3 
                className="home-featured-title"
                onClick={() => handleOpenProduct(product)}
              >
                {product.name}
              </h3>

              <div className="home-featured-footer">
                <div className="home-featured-price-group">
                  <span className="home-featured-price">S/. {Number(product.price).toFixed(2)}</span>
                  {product.old_price && (
                    <span className="home-featured-oldprice">S/. {Number(product.old_price).toFixed(2)}</span>
                  )}
                </div>

                <button 
                  type="button" 
                  className="add-cart-button"
                  onClick={() => addToCart(product)}
                  aria-label="Añadir a la bolsa"
                >
                  <ShoppingBag size={17} />
                  <span>Agregar</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="home-featured-action" data-reveal>
        <Link to="/para-ella" className="admin-btn admin-btn--secondary">
          <span>Ver todo el catálogo completo</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

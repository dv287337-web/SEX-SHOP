import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, ShoppingBag, Trash2, X } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function FavoritesDrawer() {
  const {
    favorites,
    removeFavorite,
    addToCart,
    favoritesDrawerOpen,
    closeFavoritesDrawer,
  } = useShop();

  useEffect(() => {
    if (!favoritesDrawerOpen) return undefined;
    const onKeyDown = (event) => event.key === "Escape" && closeFavoritesDrawer();
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("favorites-drawer-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("favorites-drawer-open");
    };
  }, [favoritesDrawerOpen, closeFavoritesDrawer]);

  return (
    <div className={`favorites-drawer-layer ${favoritesDrawerOpen ? "is-open" : ""}`} aria-hidden={!favoritesDrawerOpen}>
      <button className="favorites-drawer-backdrop" aria-label="Cerrar favoritos" onClick={closeFavoritesDrawer} tabIndex={favoritesDrawerOpen ? 0 : -1} />
      <aside className="favorites-drawer" role="dialog" aria-modal="true" aria-label="Mis favoritos" inert={!favoritesDrawerOpen}>
        <header className="favorites-drawer-header">
          <span><Heart /> Mis favoritos <small>({favorites.length})</small></span>
          <button onClick={closeFavoritesDrawer} aria-label="Cerrar"><X /></button>
        </header>

        {favorites.length ? <>
          <div className="favorites-drawer-items">
            {favorites.map((product) => (
              <article className="favorites-drawer-item" key={product.id}>
                 <Link className="favorites-drawer-thumb" to={`/producto/${product.id}`} onClick={closeFavoritesDrawer} aria-label={`Ver ${product.name}`}>
                   {product.image ? <img src={product.image} alt="" /> : <Heart />}
                 </Link>
                 <div className="favorites-drawer-info">
                   <strong><Link to={`/producto/${product.id}`} onClick={closeFavoritesDrawer}>{product.name}</Link></strong>
                  <span>S/ {product.price.toFixed(2)}</span>
                  <button className="favorites-drawer-add add-cart-button" onClick={() => addToCart(product)}>
                    <ShoppingBag size={15} /> Agregar al carrito
                  </button>
                </div>
                <button className="favorites-drawer-remove" aria-label={`Quitar ${product.name} de favoritos`} onClick={() => removeFavorite(product.id)}>
                  <Trash2 size={16} />
                </button>
              </article>
            ))}
          </div>
          <footer className="favorites-drawer-footer">
            <Link className="favorites-drawer-primary" to="/favoritos" onClick={closeFavoritesDrawer}>Ver todos mis favoritos <ArrowRight size={16} /></Link>
            <button className="favorites-drawer-continue" onClick={closeFavoritesDrawer}>Seguir explorando</button>
          </footer>
        </> : (
          <div className="favorites-drawer-empty">
            <span><Heart size={34} /></span>
            <h3>Aún no tienes favoritos</h3>
            <p>Guarda los productos que te gusten y los encontrarás aquí.</p>
            <button onClick={closeFavoritesDrawer}>Explorar productos</button>
          </div>
        )}
      </aside>
    </div>
  );
}

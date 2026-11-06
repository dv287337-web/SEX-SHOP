import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, Package, ShoppingBag, Sparkles, ShieldCheck, Truck } from "lucide-react";
import { useShop } from "../../context/ShopContext";
import { getProductDescription, getProductFeatures, getProductFromSession } from "../../utils/productDetails";
import { allCatalogProducts } from "../../data/catalogProducts";

const catalogLinks = {
  bdsm: { label: "BDSM", path: "/bdsm" },
  cosmetica: { label: "Cosmética Erótica", path: "/cosmetica-erotica" },
  juguetes: { label: "Juguetes", path: "/juguetes" },
  lenceria: { label: "Lencería", path: "/lenceria" },
  ofertas: { label: "Ofertas", path: "/ofertas" },
  "para-el": { label: "Para Él", path: "/para-el" },
  "para-ella": { label: "Para Ella", path: "/para-ella" },
  "para-parejas": { label: "Para Parejas", path: "/para-parejas" },
};

export default function ProductDetail() {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart, openCartDrawer } = useShop();

  const product =
    location.state?.product ||
    getProductFromSession(productId) ||
    allCatalogProducts.find((p) => String(p.id) === String(productId));

  if (!product) {
    return (
      <main className="product-page product-page-empty">
        <Package size={38} />
        <h1>No encontramos este producto</h1>
        <p>Vuelve al catálogo para elegir un producto y consultar sus detalles.</p>
        <button className="product-back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Volver al catálogo
        </button>
      </main>
    );
  }

  const catalogKey = String(product.id).split("-").slice(0, -1).join("-");
  const catalog = catalogLinks[catalogKey] || { label: "Catálogo", path: "/" };
  const features = getProductFeatures(product);

  const handleBuyNow = () => {
    addToCart(product);
    openCartDrawer();
  };

  return (
    <main className="product-page">
      <div className="product-detail-breadcrumb">
        <Link to={catalog.path}>
          <ArrowLeft size={15} /> Volver a {catalog.label}
        </Link>
        <span>/</span>
        <span>{product.category}</span>
      </div>

      <section className="product-detail-layout">
        <div className="product-detail-visual" aria-hidden="true">
          <span className="product-detail-visual-glow" />
          <div className="product-detail-icon">
            <Package size={62} strokeWidth={1.25} />
          </div>
          <span className="product-detail-visual-caption">
            <Sparkles size={14} /> Descubre tu momento
          </span>
        </div>

        <div className="product-detail-content">
          <span className="product-detail-eyebrow">
            {product.category || "Nuestra selección"}
          </span>
          <h1>{product.name}</h1>
          <p className="product-detail-description">
            {getProductDescription(product)}
          </p>

          <div className="product-detail-divider" />
          <h2>Características del producto</h2>
          <ul className="product-detail-features">
            {features.map((feature) => (
              <li key={feature.label}>
                <span className="product-detail-check">
                  <Check size={13} />
                </span>
                <span className="product-detail-feature-label">{feature.label}</span>
                <strong>{feature.value}</strong>
              </li>
            ))}
          </ul>

          <div className="product-detail-trust-pills">
            <span><ShieldCheck size={14} /> Empaque 100% discreto</span>
            <span><Truck size={14} /> Envíos seguros a todo el Perú</span>
          </div>

          <div className="product-detail-purchase">
            <div className="product-detail-price">
              <strong>S/ {product.price.toFixed(2)}</strong>
              {product.oldPrice && <del>S/ {product.oldPrice.toFixed(2)}</del>}
            </div>
            <button
              type="button"
              className="add-cart-button"
              onClick={handleBuyNow}
            >
              <ShoppingBag size={17} /> Agregar al carrito
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

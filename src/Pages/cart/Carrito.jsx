import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShieldCheck,
  Tag,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

function Carrito() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotal,
    showToast,
  } = useShop();

  const handleDecrease = (product) => {
    if (product.quantity > 1) {
      updateQuantity(product.id, product.quantity - 1);
    }
  };

  const handleIncrease = (product) => {
    updateQuantity(product.id, product.quantity + 1);
  };

  const handleRemove = (product) => {
    removeFromCart(product.id);
    showToast({
      title: "Producto removido",
      message: `${product.name} fue retirado del carrito.`,
      type: "info",
    });
  };

  const handleClearCart = () => {
    clearCart();
    showToast({
      title: "Carrito vaciado",
      message: "Se eliminaron todos los productos de tu carrito.",
      type: "info",
    });
  };

  const handleCheckout = () => {
    showToast({
      title: "Checkout en preparación",
      message: "Próximamente podrás finalizar tu pedido directamente con Yape, Plin y Tarjeta.",
      type: "info",
    });
  };

  return (
    <section className="cart-page">
      <div className="cart-banner">
        <div>
          <span>TU EXPERIENCIA DE COMPRA</span>
          <h1>Mi carrito</h1>
          <p>
            Revisa tus productos y prepara tu próxima compra.
          </p>
        </div>

        <ShoppingBag className="cart-banner-icon" />
      </div>

      <div className="cart-container">
        <div className="cart-breadcrumb">
          <Link to="/">Inicio</Link>
          <span>/</span>
          <strong>Mi carrito</strong>
        </div>

        <div className="cart-heading">
          <div>
            <span>RESUMEN DE TU SELECCIÓN</span>
            <h2>Tu carrito de compras</h2>
          </div>

          <strong>{cartCount} productos</strong>
        </div>

        {cart.length > 0 ? (
          <div className="cart-layout">
            <div className="cart-products-section">
              <div className="cart-products-header">
                <span>Productos seleccionados</span>

                <button
                  className="cart-clear-button"
                  onClick={handleClearCart}
                >
                  <Trash2 size={16} />
                  Vaciar carrito
                </button>
              </div>

              <div className="cart-products-list">
                {cart.map((product) => (
                  <article className="cart-product" key={product.id}>
                      <Link className="cart-product-image" to={`/producto/${product.id}`} aria-label={`Ver ${product.name}`}>
                        {product.image ? <img src={product.image} alt="" loading="lazy" decoding="async" /> : <ShoppingBag size={38} />}
                      </Link>

                    <div className="cart-product-info">
                      <span className="cart-product-category">
                        {product.category || "Producto"}
                      </span>

                      <h3><Link to={`/producto/${product.id}`}>{product.name}</Link></h3>

                      <div className="cart-product-prices">
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
                        className="cart-remove-mobile"
                        onClick={() => handleRemove(product)}
                      >
                        <Trash2 size={15} />
                        Eliminar
                      </button>
                    </div>

                    <div className="cart-product-actions">
                      <div className="cart-quantity">
                        <button
                          onClick={() => handleDecrease(product)}
                          disabled={product.quantity <= 1}
                          aria-label="Disminuir cantidad"
                        >
                          <Minus size={15} />
                        </button>

                        <span aria-live="polite" aria-label={`${product.quantity} unidades`}>{product.quantity}</span>

                        <button
                          onClick={() => handleIncrease(product)}
                          aria-label="Aumentar cantidad"
                        >
                          <Plus size={15} />
                        </button>
                      </div>

                      <strong className="cart-product-subtotal">
                        S/ {(product.price * product.quantity).toFixed(2)}
                      </strong>

                      <button
                        className="cart-remove-button"
                        onClick={() => handleRemove(product)}
                        aria-label="Eliminar producto"
                        title="Eliminar producto"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <Link to="/" className="cart-continue-shopping">
                <ArrowLeft size={17} />
                Seguir comprando
              </Link>
            </div>

            <aside className="cart-summary">
              <h3>Resumen de compra</h3>

              <div className="cart-summary-row">
                <span>Productos</span>
                <strong>{cartCount} unidades</strong>
              </div>

              <div className="cart-summary-row">
                <span>Subtotal</span>
                <strong>S/ {cartTotal.toFixed(2)}</strong>
              </div>

              <div className="cart-summary-row">
                <span>Envío</span>
                <strong className="cart-shipping-pending">
                  Por calcular
                </strong>
              </div>

              <div className="cart-summary-divider" />

              <div className="cart-total-row">
                <span>Total de productos</span>
                <strong>S/ {cartTotal.toFixed(2)}</strong>
              </div>

              <p className="cart-shipping-note">
                El costo de envío se calculará durante el proceso de compra.
              </p>

              <button
                className="cart-checkout-button"
                onClick={handleCheckout}
              >
                Continuar con la compra
                <ShoppingBag size={18} />
              </button>

              <div className="cart-security">
                <ShieldCheck size={20} />
                <span>Compra segura y atención personalizada.</span>
              </div>

              <div className="cart-summary-benefit">
                <Tag size={17} />
                <span>¡Gracias por elegir nuestra tienda!</span>
              </div>
            </aside>
          </div>
        ) : (
          <div className="cart-empty">
            <div className="cart-empty-icon">
              <ShoppingBag size={42} />
            </div>

            <h3>Tu carrito está vacío</h3>

            <p>
              Todavía no has agregado productos. Explora nuestra colección
              y encuentra algo que te guste.
            </p>

            <Link to="/" className="cart-empty-button">
              Explorar productos
              <ArrowLeft size={17} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default Carrito;

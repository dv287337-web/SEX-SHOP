import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CreditCard, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useShop } from "../context/ShopContext";
import plinLogo from "../assets/plin-logo.png";

export default function CartDrawer() {
  const { cart, cartTotal, cartCount, cartDrawerOpen, closeCartDrawer, updateQuantity, removeFromCart } = useShop();
  useEffect(() => {
    if (!cartDrawerOpen) return undefined;
    const onKeyDown = (event) => event.key === "Escape" && closeCartDrawer();
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("cart-drawer-open");
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.classList.remove("cart-drawer-open"); };
  }, [cartDrawerOpen, closeCartDrawer]);

  return <div className={`cart-drawer-layer ${cartDrawerOpen ? "is-open" : ""}`} aria-hidden={!cartDrawerOpen}>
    <button className="cart-drawer-backdrop" aria-label="Cerrar carrito" onClick={closeCartDrawer} tabIndex={cartDrawerOpen ? 0 : -1} />
    <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Tu carrito" data-lenis-prevent inert={!cartDrawerOpen}>
      <header className="cart-drawer-header"><span><ShoppingBag /> Tu carrito <small>({cartCount})</small></span><button onClick={closeCartDrawer} aria-label="Cerrar"><X /></button></header>
      {cart.length ? <>
           <div className="cart-drawer-items" data-lenis-prevent>{cart.map((item) => <article className="cart-drawer-item" key={item.id}>
           <Link className="cart-drawer-thumb" to={`/producto/${item.id}`} onClick={closeCartDrawer} aria-label={`Ver ${item.name}`}>
             {item.image ? <img src={item.image} alt="" loading="lazy" decoding="async" /> : <ShoppingBag />}
           </Link><div className="cart-drawer-info"><strong><Link to={`/producto/${item.id}`} onClick={closeCartDrawer}>{item.name}</Link></strong><span>S/ {item.price.toFixed(2)} c/u</span>
            <div className="cart-drawer-qty"><button aria-label="Reducir cantidad" onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeFromCart(item.id)}><Minus size={14}/></button><span>{item.quantity}</span><button aria-label="Aumentar cantidad" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14}/></button><button aria-label="Eliminar producto" onClick={() => removeFromCart(item.id)}><Trash2 size={15}/></button></div>
          </div><b>S/ {(item.price * item.quantity).toFixed(2)}</b>
        </article>)}</div>
       <footer className="cart-drawer-footer"><div><span>Subtotal</span><strong>S/ {cartTotal.toFixed(2)}</strong></div><small>Envío calculado al continuar con la compra.</small><div className="cart-drawer-payments" aria-label="Métodos de pago"><span>Métodos de pago</span><div><b className="cart-payment-yape"><img loading="lazy" decoding="async" src="https://www.yape.com.pe/images/components/component-25/logo.png" alt="Yape" onError={(event) => event.currentTarget.parentElement.classList.add("is-fallback")} /><span className="cart-payment-fallback">Yape</span></b><b className="cart-payment-plin"><img src={plinLogo} alt="Plin" /><span className="cart-payment-fallback">Plin</span></b><b className="cart-payment-card"><CreditCard size={14} /> Tarjeta</b></div></div><Link className="cart-drawer-primary" to="/carrito" onClick={closeCartDrawer}>Ver carrito y continuar</Link><button className="cart-drawer-continue" onClick={closeCartDrawer}>Seguir explorando</button></footer>
      </> : <div className="cart-drawer-empty"><span><ShoppingBag size={34}/></span><h3>Tu carrito está vacío</h3><p>Explora la tienda y encuentra algo especial.</p><button onClick={closeCartDrawer}>Explorar productos</button></div>}
    </aside>
  </div>;
}

import { useState } from "react";
import { Building2, Check, CreditCard, LockKeyhole, MapPin, Smartphone, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { regions } from "@perucode/ubigeo-peru";
import { useShop } from "../../context/ShopContext";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  district: "",
  delivery: "delivery",
  payment: "yape",
};

const paymentMethods = [
  { id: "yape", label: "Yape", description: "Pago móvil", icon: Smartphone },
  { id: "plin", label: "Plin", description: "Pago móvil", icon: Smartphone },
  { id: "card", label: "Tarjeta", description: "Débito o crédito", icon: CreditCard },
];

const peruDistricts = regions
  .all()
  .flatMap((region) => {
    const expandedRegion = regions.expand(region.id);
    return expandedRegion.provinces.flatMap((province) =>
      province.districts.map((district) => ({
        label: `${district.name} — ${province.name}, ${region.name}`,
        value: district.name,
      }))
    );
  })
  .sort((a, b) => a.label.localeCompare(b.label, "es"));

export default function Checkout() {
  const { cart, cartCount, cartTotal, showToast } = useShop();
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    showToast({
      title: "Solicitud preparada",
      message: "Te mostraremos los pasos para completar tu pago.",
      type: "success",
    });
  };

  if (!cart.length) {
    return (
      <main className="checkout-page checkout-empty">
        <div className="checkout-empty-icon"><CreditCard size={36} /></div>
        <span className="checkout-eyebrow">PROCESO DE COMPRA</span>
        <h1>Tu carrito está vacío</h1>
        <p>Agrega productos antes de iniciar el proceso de pago.</p>
        <Link to="/" className="checkout-primary-button">Explorar productos</Link>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="checkout-page checkout-success">
        <div className="checkout-success-icon"><Check size={38} /></div>
        <span className="checkout-eyebrow">TODO LISTO</span>
        <h1>Solicitud preparada</h1>
        <p>
          Hemos preparado tu pedido. El siguiente paso será completar el pago
          mediante el método seleccionado.
        </p>
        <div className="checkout-success-reference">
          <span>Referencia de pedido</span>
          <strong>SS-{Date.now().toString().slice(-6)}</strong>
        </div>
        <Link to="/" className="checkout-primary-button">Volver a la tienda</Link>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-header">
        <div>
          <span className="checkout-eyebrow">COMPRA SEGURA Y DISCRETA</span>
          <h1>Finaliza tu compra</h1>
          <p>Completa tus datos y elige cómo quieres recibir y pagar tu pedido.</p>
        </div>
        <LockKeyhole className="checkout-header-icon" aria-hidden="true" />
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <section className="checkout-card">
            <div className="checkout-section-heading">
              <span>01</span>
              <div><h2>Datos de contacto</h2><p>Los usaremos para confirmar tu pedido.</p></div>
            </div>
            <div className="checkout-fields checkout-fields--two">
              <label>Nombre completo<input name="name" value={form.name} onChange={updateField} required autoComplete="name" /></label>
              <label>Teléfono<input name="phone" value={form.phone} onChange={updateField} required inputMode="tel" autoComplete="tel" /></label>
              <label className="checkout-field--wide">Correo electrónico<input name="email" type="email" value={form.email} onChange={updateField} required autoComplete="email" /></label>
            </div>
          </section>

          <section className="checkout-card">
            <div className="checkout-section-heading">
              <span>02</span>
              <div><h2>Entrega discreta</h2><p>Protegemos tu privacidad en cada envío.</p></div>
            </div>
            <div className="checkout-delivery-options">
              <label className={`checkout-choice ${form.delivery === "delivery" ? "is-selected" : ""}`}>
                <input type="radio" name="delivery" value="delivery" checked={form.delivery === "delivery"} onChange={updateField} />
                <Truck size={19} /><span><strong>Envío discreto</strong><small>Calcularemos el costo según tu ubicación.</small></span>
              </label>
              <label className={`checkout-choice ${form.delivery === "pickup" ? "is-selected" : ""}`}>
                <input type="radio" name="delivery" value="pickup" checked={form.delivery === "pickup"} onChange={updateField} />
                <MapPin size={19} /><span><strong>Recojo en tienda</strong><small>Coordina la fecha después de confirmar.</small></span>
              </label>
            </div>
            {form.delivery === "delivery" && (
              <div className="checkout-fields checkout-fields--two checkout-address-fields">
                <label className="checkout-field--wide">Dirección<input name="address" value={form.address} onChange={updateField} required autoComplete="street-address" /></label>
                <label>
                  Distrito
                  <input
                    name="district"
                    list="peru-districts"
                    value={form.district}
                    onChange={updateField}
                    placeholder="Escribe para buscar tu distrito"
                    required
                    autoComplete="address-level2"
                  />
                  <datalist id="peru-districts">
                    {peruDistricts.map((district) => (
                      <option key={district.label} value={district.value}>
                        {district.label}
                      </option>
                    ))}
                  </datalist>
                </label>
              </div>
            )}
          </section>

          <section className="checkout-card">
            <div className="checkout-section-heading">
              <span>03</span>
              <div><h2>Forma de pago</h2><p>Selecciona tu método preferido.</p></div>
            </div>
            <div className="checkout-payment-options">
              {paymentMethods.map(({ id, label, description, icon: Icon }) => (
                <label className={`checkout-payment ${form.payment === id ? "is-selected" : ""}`} key={id}>
                  <input type="radio" name="payment" value={id} checked={form.payment === id} onChange={updateField} />
                  <Icon size={19} />
                  <span><strong>{label}</strong><small>{description}</small></span>
                </label>
              ))}
            </div>
            <p className="checkout-payment-note"><Building2 size={15} /> El pago se habilitará al confirmar tu solicitud.</p>
          </section>

          <button className="checkout-primary-button checkout-submit" type="submit">
            Confirmar solicitud de pedido <Check size={18} />
          </button>
        </form>

        <aside className="checkout-summary">
          <span className="checkout-summary-label">TU SELECCIÓN</span>
          <h2>Resumen de compra</h2>
          <div className="checkout-summary-products">
            {cart.map((product) => (
              <div className="checkout-summary-product" key={product.id}>
                <span>{product.quantity} × {product.name}</span>
                <strong>S/ {(product.price * product.quantity).toFixed(2)}</strong>
              </div>
            ))}
          </div>
          <div className="checkout-summary-line"><span>{cartCount} productos</span><strong>S/ {cartTotal.toFixed(2)}</strong></div>
          <div className="checkout-summary-line"><span>Envío</span><strong>Por calcular</strong></div>
          <div className="checkout-summary-total"><span>Total</span><strong>S/ {cartTotal.toFixed(2)}</strong></div>
          <p className="checkout-summary-security"><LockKeyhole size={16} /> Tus datos se tratarán de forma confidencial.</p>
        </aside>
      </div>
    </main>
  );
}

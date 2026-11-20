import { useState } from "react";
import { Building2, Check, CreditCard, LockKeyhole, MapPin, Smartphone, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { districts, provinces, regions } from "@perucode/ubigeo-peru";
import { useShop } from "../../context/ShopContext";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  department: "",
  city: "",
  district: "",
  address: "",
  delivery: "delivery",
  payment: "yape",
};

const paymentMethods = [
  { id: "yape", label: "Yape", description: "Pago móvil", icon: Smartphone },
  { id: "plin", label: "Plin", description: "Pago móvil", icon: Smartphone },
  { id: "card", label: "Tarjeta", description: "Débito o crédito", icon: CreditCard },
];

const departments = regions.all().sort((a, b) => a.name.localeCompare(b.name, "es"));

export default function Checkout() {
  const { cart, cartCount, cartTotal, showToast, createOrder, clearCart } = useShop();
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [orderReference, setOrderReference] = useState("");
  const selectedDepartment = departments.find((item) => item.name === form.department);
  const cities = selectedDepartment
    ? [...provinces.byRegionId(selectedDepartment.id)].sort((a, b) => a.name.localeCompare(b.name, "es"))
    : [];
  const selectedCity = cities.find((item) => item.name === form.city);
  const availableDistricts = selectedCity
    ? [...districts.byProvinceId(selectedCity.id)].sort((a, b) => a.name.localeCompare(b.name, "es"))
    : [];

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
      ...(name === "department" ? { city: "", district: "" } : {}),
      ...(name === "city" ? { district: "" } : {}),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const order = await createOrder({
      customer: {
        name: form.name,
        email: form.email,
        phone: form.phone,
      },
      delivery: form.delivery,
      payment: form.payment,
      shipping: {
        department: form.department,
        city: form.city,
        district: form.district,
        address: form.address,
      },
      items: cart.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      })),
      total: cartTotal,
    });
    setOrderReference(order.id);
    setSubmitted(true);
    clearCart();
    showToast({
      title: "Solicitud preparada",
      message: "Tu solicitud ya fue enviada a la administración.",
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
           <strong>{orderReference}</strong>
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
              <div><h2>Ubicación de entrega</h2><p>Primero selecciona dónde recibirás tu pedido.</p></div>
            </div>
            <div className="checkout-fields checkout-fields--two">
              <label>
                Departamento
                <select name="department" value={form.department} onChange={updateField} required>
                  <option value="">Selecciona un departamento</option>
                  {departments.map((department) => <option key={department.id} value={department.name}>{department.name}</option>)}
                </select>
              </label>
              <label>
                Ciudad / provincia
                <select name="city" value={form.city} onChange={updateField} required disabled={!form.department}>
                  <option value="">Selecciona una ciudad</option>
                  {cities.map((city) => <option key={city.id} value={city.name}>{city.name}</option>)}
                </select>
              </label>
              <label>
                Distrito
                <select name="district" value={form.district} onChange={updateField} required disabled={!form.city}>
                  <option value="">Selecciona un distrito</option>
                  {availableDistricts.map((district) => <option key={district.id} value={district.name}>{district.name}</option>)}
                </select>
              </label>
              <label className="checkout-field--wide">Dirección<input name="address" value={form.address} onChange={updateField} required autoComplete="street-address" /></label>
            </div>
          </section>

          <section className="checkout-card">
            <div className="checkout-section-heading">
              <span>02</span>
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
              <span>03</span>
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
          </section>

          <section className="checkout-card">
            <div className="checkout-section-heading">
              <span>04</span>
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

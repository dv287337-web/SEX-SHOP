import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import WhatsAppButton from "./components/WhatsAppButton";
import Footer from "./components/Footer";
import ScrollRevealController from "./components/ScrollRevealController";
import CartDrawer from "./components/CartDrawer";
import FavoritesDrawer from "./components/FavoritesDrawer";
import SmoothScroll from "./components/SmoothScroll";
import LuxuryToast from "./components/LuxuryToast";
import Home from "./Pages/Home";

// Catálogos
import ParaElla from "./Pages/catalog/ParaElla";
import ParaEl from "./Pages/catalog/ParaEl";
import ParaParejas from "./Pages/catalog/ParaParejas";
import Lenceria from "./Pages/catalog/Lenceria";
import Juguetes from "./Pages/catalog/Juguetes";
import Cosmetica from "./Pages/catalog/Cosmetica";
import BDSM from "./Pages/catalog/BDSM";
import Ofertas from "./Pages/catalog/Ofertas";

// Nuevas páginas
import MiCuenta from "./Pages/account/MiCuenta";
import Favoritos from "./Pages/favorites/Favoritos";
import Carrito from "./Pages/cart/Carrito";
import ProductDetail from "./Pages/product/ProductDetail";
import SearchResults from "./Pages/search/SearchResults";
import AboutStore from "./Pages/about/AboutStore";
import PrivacySecurity from "./Pages/legal/PrivacySecurity";
import PaymentMethods from "./Pages/legal/PaymentMethods";
import DiscreetShipping from "./Pages/legal/DiscreetShipping";
import StorePickup from "./Pages/help/StorePickup";

import "./App.css";

function App() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <ScrollRevealController />

      <main>
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<Home />} />

          {/* Catálogos */}
          <Route path="/para-ella" element={<ParaElla />} />
          <Route path="/para-el" element={<ParaEl />} />
          <Route path="/para-parejas" element={<ParaParejas />} />
          <Route path="/lenceria" element={<Lenceria />} />
          <Route path="/juguetes" element={<Juguetes />} />
          <Route path="/cosmetica-erotica" element={<Cosmetica />} />
          <Route path="/bdsm" element={<BDSM />} />
          <Route path="/ofertas" element={<Ofertas />} />

          {/* Cuenta, favoritos y carrito */}
          <Route path="/mi-cuenta" element={<MiCuenta />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/producto/:productId" element={<ProductDetail />} />
          <Route path="/buscar" element={<SearchResults />} />
          <Route path="/sobre-nosotros" element={<AboutStore />} />
          <Route path="/privacidad-y-seguridad" element={<PrivacySecurity />} />
          <Route path="/metodos-de-pago" element={<PaymentMethods />} />
          <Route path="/envios-discretos" element={<DiscreetShipping />} />
          <Route path="/recojo-en-tienda" element={<StorePickup />} />
        </Routes>
      </main>

      <Footer />
      <WhatsAppButton />
      <CartDrawer />
      <FavoritesDrawer />
      <LuxuryToast />
    </>
  );
}

export default App;

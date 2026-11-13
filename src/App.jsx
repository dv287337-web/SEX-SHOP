import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import WhatsAppButton from "./components/WhatsAppButton";
import Footer from "./components/Footer";
import ScrollRevealController from "./components/ScrollRevealController";
import CartDrawer from "./components/CartDrawer";
import FavoritesDrawer from "./components/FavoritesDrawer";
import SmoothScroll from "./components/SmoothScroll";
import LuxuryToast from "./components/LuxuryToast";
import BackToTop from "./components/BackToTop";
import IntroSplash from "./components/IntroSplash";

// Catálogos
const Home = lazy(() => import("./Pages/Home"));
const ParaElla = lazy(() => import("./Pages/catalog/ParaElla"));
const ParaEl = lazy(() => import("./Pages/catalog/ParaEl"));
const ParaParejas = lazy(() => import("./Pages/catalog/ParaParejas"));
const Lenceria = lazy(() => import("./Pages/catalog/Lenceria"));
const Juguetes = lazy(() => import("./Pages/catalog/Juguetes"));
const Cosmetica = lazy(() => import("./Pages/catalog/Cosmetica"));
const BDSM = lazy(() => import("./Pages/catalog/BDSM"));
const Ofertas = lazy(() => import("./Pages/catalog/Ofertas"));

// Nuevas páginas
const MiCuenta = lazy(() => import("./Pages/account/MiCuenta"));
const Favoritos = lazy(() => import("./Pages/favorites/Favoritos"));
const Carrito = lazy(() => import("./Pages/cart/Carrito"));
const ProductDetail = lazy(() => import("./Pages/product/ProductDetail"));
const SearchResults = lazy(() => import("./Pages/search/SearchResults"));
const AboutStore = lazy(() => import("./Pages/about/AboutStore"));
const PrivacySecurity = lazy(() => import("./Pages/legal/PrivacySecurity"));
const PaymentMethods = lazy(() => import("./Pages/legal/PaymentMethods"));
const DiscreetShipping = lazy(() => import("./Pages/legal/DiscreetShipping"));
const StorePickup = lazy(() => import("./Pages/help/StorePickup"));
const AdminDashboard = lazy(() => import("./Pages/admin/AdminDashboard"));

import "./App.css";

function App() {
  return (
    <>
      <IntroSplash />
      <SmoothScroll />
      <Header />
      <ScrollRevealController />

      <main>
        <Suspense fallback={<div className="route-loading" role="status">Cargando experiencia…</div>}>
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

          {/* Panel Administrador */}
          <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <WhatsAppButton />
      <BackToTop />
      <CartDrawer />
      <FavoritesDrawer />
      <LuxuryToast />
    </>
  );
}

export default App;

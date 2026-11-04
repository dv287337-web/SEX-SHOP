import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";

// Catálogos
import ParaElla from "./pages/catalog/ParaElla";
import ParaEl from "./pages/catalog/ParaEl";
import ParaParejas from "./pages/catalog/ParaParejas";
import Lenceria from "./pages/catalog/Lenceria";
import Juguetes from "./pages/catalog/Juguetes";
import Cosmetica from "./pages/catalog/Cosmetica";
import BDSM from "./pages/catalog/BDSM";
import Ofertas from "./pages/catalog/Ofertas";

// Nuevas páginas
import MiCuenta from "./pages/account/MiCuenta";
import Favoritos from "./pages/favorites/Favoritos";
import Carrito from "./pages/cart/Carrito";

import "./App.css";

function App() {
  return (
    <>
      <Header />

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
        </Routes>
      </main>

      <WhatsAppButton />
    </>
  );
}

export default App;

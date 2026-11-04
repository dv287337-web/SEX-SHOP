import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import WhatsAppButton from "./components/WhatsAppButton";
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


import { useEffect, useState } from "react";
import {
  Search,
  UserRound,
  Heart,
  ShoppingBag,
  Truck,
  CreditCard,
  ShieldCheck
} from "lucide-react";

import { Link, NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useShop } from "../context/ShopContext";

function Header() {
  const { favorites, cartCount, openCartDrawer, openFavoritesDrawer } = useShop();
  const { pathname } = useLocation();
  const isCatalogPage = [
    "/para-ella",
    "/para-el",
    "/para-parejas",
    "/lenceria",
    "/juguetes",
    "/cosmetica-erotica",
    "/bdsm",
    "/ofertas",
  ].includes(pathname);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(queryFromUrl);

  useEffect(() => {
    setSearchTerm(queryFromUrl);
  }, [queryFromUrl]);

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();
    if (!query) return;
    navigate(`/buscar?q=${encodeURIComponent(query)}`);
  };

  const navigation = [
    { name: "Inicio", path: "/" },
    { name: "Para Ella", path: "/para-ella" },
    { name: "Para Él", path: "/para-el" },
    { name: "Para Parejas", path: "/para-parejas" },
    { name: "Lencería", path: "/lenceria" },
    { name: "Juguetes", path: "/juguetes" },
    { name: "Cosmética Erótica", path: "/cosmetica-erotica" },
    { name: "BDSM", path: "/bdsm" },
    { name: "Ofertas", path: "/ofertas" },
  ];

  return (
    <header className={`header${isCatalogPage ? " header--catalog-sticky" : ""}`}>
      <div className="top-bar">
        <span>
          <Truck /> Envíos discretos a todo el Perú
        </span>

        <span>
          <CreditCard /> Pagos seguros: Yape, Plin, Tarjeta y Transferencia
        </span>

        <span>
          <ShieldCheck /> Tu privacidad está protegida
        </span>

        <span className="adult">
          <span>18+</span> Solo para mayores de edad
        </span>
      </div>

      <div className="main-header">
        <Link className="logo" to="/">
          <div>
            Sex<span>Shop</span><b>♥</b>
          </div>
          <small>TU PLACER, SIN LÍMITES</small>
        </Link>

        <form className="search-box" onSubmit={handleSearch} role="search">
          <input
            type="text"
            placeholder="¿Qué deseas explorar hoy?"
            aria-label="Buscar productos"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <button type="submit" aria-label="Buscar">
            <Search />
          </button>
        </form>

        <div className="header-actions">
          <Link to="/mi-cuenta" aria-label="Mi cuenta">
            <UserRound />
            <span className="header-action-label">Mi cuenta</span>
          </Link>

          <button className="header-favorites-trigger" type="button" onClick={openFavoritesDrawer}>
            <Heart />
            <span className="header-action-label">Favoritos</span>
            <i className="header-count" key={favorites.length}>
              {favorites.length}
            </i>
          </button>

          <button className="header-cart-trigger" type="button" onClick={openCartDrawer}>
            <ShoppingBag />
            <span className="header-action-label">Mi carrito</span>
            <i className="header-count" key={cartCount}>
              {cartCount}
            </i>
          </button>
        </div>
      </div>

      <nav className="navigation">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Header;


import { useEffect, useState } from "react";
import {
  Search,
  UserRound,
  Heart,
  ShoppingBag,
  Truck,
  CreditCard,
  ShieldCheck,
  Menu,
  X,
  House
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    setSearchTerm(queryFromUrl);
    setIsMenuOpen(false);
  }, [queryFromUrl]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

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

        <button
          type="button"
          className="header-menu-toggle"
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <nav id="main-navigation" className={`navigation${isMenuOpen ? " is-open" : ""}`}>
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

      <nav className="mobile-bottom-nav" aria-label="Accesos rápidos">
        <Link to="/" aria-label="Inicio">
          <House />
          <span>Inicio</span>
        </Link>
        <Link to="/buscar" aria-label="Buscar productos">
          <Search />
          <span>Buscar</span>
        </Link>
        <button type="button" onClick={openFavoritesDrawer} aria-label="Abrir favoritos">
          <Heart />
          <span>Favoritos</span>
        </button>
        <button type="button" onClick={openCartDrawer} aria-label="Abrir carrito">
          <ShoppingBag />
          <span>Carrito</span>
          {cartCount > 0 && <i>{cartCount}</i>}
        </button>
      </nav>
    </header>
  );
}

export default Header;

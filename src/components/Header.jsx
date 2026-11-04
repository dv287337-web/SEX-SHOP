
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

import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useShop } from "../context/ShopContext";

function Header() {
  const { favorites, cartCount } = useShop();
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
    <header className="header">
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
            Mi cuenta
          </Link>

          <Link to="/favoritos" aria-label="Mis favoritos">
            <Heart />
            Favoritos
            <i className="header-count">
              {favorites.length}
            </i>
          </Link>

          <Link to="/carrito" aria-label="Mi carrito">
            <ShoppingBag />
            Mi carrito
            <i className="header-count">
              {cartCount}
            </i>
          </Link>
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

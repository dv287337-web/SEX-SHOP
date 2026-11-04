
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  SlidersHorizontal,
  Grid3X3,
  List,
  Star,
  ChevronDown,
  Tag,
  Flame,
} from "lucide-react";
import { useShop } from "../../context/ShopContext";

const products = [
  {
    id: 1,
    name: "Vibrador recargable premium",
    category: "Juguetes",
    price: 119.90,
    oldPrice: 159.90,
    rating: 4.9,
    tag: "MÁS VENDIDO",
  },
  {
    id: 2,
    name: "Conjunto de lencería elegante",
    category: "Lencería",
    price: 89.90,
    oldPrice: 129.90,
    rating: 4.8,
    tag: "OFERTA",
  },
  {
    id: 3,
    name: "Lubricante íntimo base agua",
    category: "Cosmética",
    price: 29.90,
    oldPrice: 44.90,
    rating: 4.7,
    tag: "DESTACADO",
  },
  {
    id: 4,
    name: "Kit de accesorios para parejas",
    category: "Parejas",
    price: 99.90,
    oldPrice: 149.90,
    rating: 4.9,
    tag: "OFERTA",
  },
  {
    id: 5,
    name: "Masajeador compacto",
    category: "Juguetes",
    price: 79.90,
    oldPrice: 109.90,
    rating: 4.8,
    tag: "POPULAR",
  },
  {
    id: 6,
    name: "Aceite de masaje aromático",
    category: "Cosmética",
    price: 39.90,
    oldPrice: 54.90,
    rating: 4.6,
    tag: "OFERTA",
  },
  {
    id: 7,
    name: "Body de encaje premium",
    category: "Lencería",
    price: 74.90,
    oldPrice: 99.90,
    rating: 4.8,
    tag: "RECOMENDADO",
  },
  {
    id: 8,
    name: "Set de esposas acolchadas",
    category: "BDSM",
    price: 49.90,
    oldPrice: 69.90,
    rating: 4.7,
    tag: "OFERTA",
  },
  {
    id: 9,
    name: "Anillo vibrador",
    category: "Juguetes",
    price: 44.90,
    oldPrice: 64.90,
    rating: 4.6,
    tag: "NOVEDAD",
  },
  {
    id: 10,
    name: "Kit de aceites para masaje",
    category: "Cosmética",
    price: 69.90,
    oldPrice: 99.90,
    rating: 4.9,
    tag: "OFERTA",
  },
  {
    id: 11,
    name: "Conjunto de lencería sensual",
    category: "Lencería",
    price: 94.90,
    oldPrice: 139.90,
    rating: 4.8,
    tag: "EXCLUSIVO",
  },
  {
    id: 12,
    name: "Kit de iniciación BDSM",
    category: "BDSM",
    price: 119.90,
    oldPrice: 159.90,
    rating: 4.9,
    tag: "OFERTA",
  },
];

// Identificadores únicos para los productos de Ofertas
export const catalogProducts = products.map((product) => ({
  ...product,
  id: `ofertas-${product.id}`,
}));

const categories = [
  "Todas",
  "Juguetes",
  "Lencería",
  "Cosmética",
  "Parejas",
  "BDSM",
];

function Ofertas() {
  const {
    toggleFavorite,
    isFavorite,
    addToCart,
  } = useShop();
  const navigate = useNavigate();
  const openProductDetails = (product) => {
    sessionStorage.setItem(`sexshop-product-${product.id}`, JSON.stringify(product));
    navigate(`/producto/${encodeURIComponent(product.id)}`, { state: { product } });
  };

  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [maxPrice, setMaxPrice] = useState(200);
  const [sort, setSort] = useState("default");
  const [view, setView] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = catalogProducts.filter((product) => {
      const categoryMatch =
        selectedCategory === "Todas" ||
        product.category === selectedCategory;

      return categoryMatch && product.price <= maxPrice;
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sort === "discount") {
      result.sort(
        (a, b) =>
          (b.oldPrice - b.price) - (a.oldPrice - a.price)
      );
    }

    return result;
  }, [selectedCategory, maxPrice, sort]);

  const clearFilters = () => {
    setSelectedCategory("Todas");
    setMaxPrice(200);
  };

  return (
    <section className="catalog-page">
      <div className="catalog-banner">
        <div>
          <span className="catalog-eyebrow">
            OFERTAS ESPECIALES PARA TI
          </span>
          <h1>Promociones Exclusivas</h1>
          <p>
            Descubre productos seleccionados con precios especiales.
            Renueva tus favoritos y aprovecha nuestras promociones.
          </p>
        </div>

        <Tag className="catalog-banner-icon" />
      </div>

      <div className="catalog-breadcrumb">
        <span>Inicio</span>
        <span>/</span>
        <strong>Ofertas</strong>
      </div>

      <div className="catalog-layout">
        <aside
          className={`catalog-sidebar ${
            showFilters ? "filters-open" : ""
          }`}
        >
          <div className="sidebar-heading">
            <SlidersHorizontal size={19} />
            <h3>Filtrar ofertas</h3>
          </div>

          <div className="filter-group">
            <h4>Categorías</h4>

            {categories.map((category) => (
              <label className="filter-option" key={category}>
                <input
                  type="radio"
                  name="ofertas-category"
                  checked={selectedCategory === category}
                  onChange={() => setSelectedCategory(category)}
                />
                {category}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Precio máximo</h4>

            <div className="price-slider">
              <input
                type="range"
                min="20"
                max="200"
                step="5"
                value={maxPrice}
                onChange={(event) =>
                  setMaxPrice(Number(event.target.value))
                }
              />

              <div className="price-range-values">
                <span>S/ 20</span>
                <strong>S/ {maxPrice.toFixed(2)}</strong>
              </div>
            </div>
          </div>

          <button className="clear-filters" onClick={clearFilters}>
            Limpiar filtros
          </button>
        </aside>

        <div className="catalog-content">
          <div className="catalog-heading">
            <div>
              <span>APROVECHA ANTES DE QUE SE AGOTEN</span>
              <h2>Ofertas para todos los gustos</h2>
              <p>
                Encuentra tus productos favoritos a precios especiales.
              </p>
            </div>

            <button
              className="mobile-filter-button"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={17} />
              Filtros
            </button>
          </div>

          <div className="catalog-controls">
            <span>
              <strong>{filteredProducts.length}</strong> ofertas encontradas
            </span>

            <div className="catalog-control-actions">
              <label className="sort-control">
                Ordenar:
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  <option value="default">Destacados</option>
                  <option value="discount">Mayor descuento</option>
                  <option value="low">Menor precio</option>
                  <option value="high">Mayor precio</option>
                  <option value="rating">Mejor valorados</option>
                </select>
                <ChevronDown size={15} />
              </label>

              <button
                className={view === "grid" ? "view-active" : ""}
                onClick={() => setView("grid")}
                aria-label="Vista de cuadrícula"
              >
                <Grid3X3 size={18} />
              </button>

              <button
                className={view === "list" ? "view-active" : ""}
                onClick={() => setView("list")}
                aria-label="Vista de lista"
              >
                <List size={19} />
              </button>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div
              className={`products-grid ${
                view === "list" ? "list-view" : ""
              }`}
            >
              {filteredProducts.map((product) => {
                const discount = Math.round(
                  ((product.oldPrice - product.price) /
                    product.oldPrice) *
                    100
                );

                const favorite = isFavorite(product.id);

                return (
                  <article
                    className="product-card"
                    key={product.id}
                    role="group"
                    tabIndex={0}
                    aria-label={`Selecciona para ver los detalles de ${product.name}`}
                    onClick={(event) => {
                      if (event.target.closest("button, a")) return;
                      openProductDetails(product);
                    }}
                    onKeyDown={(event) => {
                      if (
                        event.target === event.currentTarget &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        openProductDetails(product);
                      }
                    }}
                  >
                    <div className="product-image">
                      <div className="product-placeholder">
                        <Flame size={42} />
                        <span>Imagen del producto</span>
                      </div>

                      {product.tag && (
                        <span className="product-tag">
                          {product.tag}
                        </span>
                      )}

                      <span className="product-discount">
                        -{discount}%
                      </span>

                      <button
                        className={`favorite-button ${
                          favorite ? "is-favorite" : ""
                        }`}
                        onClick={() => toggleFavorite(product)}
                        aria-label={
                          favorite
                            ? "Quitar de favoritos"
                            : "Agregar a favoritos"
                        }
                      >
                        <Heart
                          size={19}
                          fill={favorite ? "currentColor" : "none"}
                        />
                      </button>
                    </div>

                    <div className="product-info">
                      <span className="product-category">
                        {product.category}
                      </span>

                      <h3>{product.name}</h3>

                      <div className="product-rating">
                        <Star size={14} fill="currentColor" />
                        <span>{product.rating}</span>
                      </div>

                      <button
                        type="button"
                        className="product-details-button"
                        onClick={() => openProductDetails(product)}
                      >
                        Ver detalles del producto
                      </button>

                      <div className="product-price">
                        <strong>
                          S/ {product.price.toFixed(2)}
                        </strong>

                        <del>
                          S/ {product.oldPrice.toFixed(2)}
                        </del>
                      </div>

                      <button
                        className="add-cart-button"
                        onClick={() => {
                          addToCart(product);
                        }}
                      >
                        <ShoppingBag size={17} />
                        Agregar al carrito
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="catalog-empty">
              <ShoppingBag size={38} />
              <h3>No encontramos ofertas</h3>
              <p>Prueba modificando los filtros seleccionados.</p>
              <button className="clear-filters" onClick={clearFilters}>
                Ver todas las ofertas
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Ofertas;

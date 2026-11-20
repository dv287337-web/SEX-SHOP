
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
  Shield,
} from "lucide-react";
import { useShop } from "../../context/ShopContext";
import { mergeCustomProducts } from "../../utils/catalogHelpers";

const products = [];

// Identificadores únicos para la categoría BDSM
export const catalogProducts = products.map((product) => ({
  ...product,
  id: `bdsm-${product.id}`,
}));

const categories = [
  "Todas",
  "Restricción",
  "Sensaciones",
  "Accesorios",
  "Sets y kits",
];

const types = ["Todos", "Accesorios", "Sets"];

function BDSM() {
  const {
    toggleFavorite,
    isFavorite,
    addToCart,
    customProducts,
  } = useShop();
  const navigate = useNavigate();
  const openProductDetails = (product) => {
    sessionStorage.setItem(`sexshop-product-${product.id}`, JSON.stringify(product));
    navigate(`/producto/${encodeURIComponent(product.id)}`, { state: { product } });
  };

  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedType, setSelectedType] = useState("Todos");
  const [maxPrice, setMaxPrice] = useState(200);
  const [sort, setSort] = useState("default");
  const [view, setView] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    const combinedList = mergeCustomProducts(catalogProducts, customProducts, "bdsm");

    let result = combinedList.filter((product) => {
      const categoryMatch =
        selectedCategory === "Todas" ||
        product.category === selectedCategory;

      const typeMatch =
        selectedType === "Todos" ||
        (product.type ? product.type === selectedType : true);

      const priceMatch = maxPrice ? product.price <= maxPrice : true;

      return categoryMatch && typeMatch && priceMatch;
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, selectedType, maxPrice, sort, customProducts]);

  const clearFilters = () => {
    setSelectedCategory("Todas");
    setSelectedType("Todos");
    setMaxPrice(200);
  };

  return (
    <section className="catalog-page catalog-page--bdsm">
      <div className="catalog-banner">
        <div>
          <span className="catalog-eyebrow">
            EXPLORA NUEVAS SENSACIONES
          </span>
          <h1>BDSM & Accesorios</h1>
          <p>
            Una selección de accesorios para explorar tus preferencias
            con confianza, comunicación y seguridad.
          </p>
        </div>

        <Shield className="catalog-banner-icon" />
      </div>

      <div className="catalog-breadcrumb">
        <span>Inicio</span>
        <span>/</span>
        <strong>BDSM</strong>
      </div>

      <div className="catalog-layout">
        <aside
          className={`catalog-sidebar ${
            showFilters ? "filters-open" : ""
          }`}
        >
          <div className="sidebar-heading">
            <SlidersHorizontal size={19} />
            <h3>Filtrar productos</h3>
          </div>

          <div className="filter-group">
            <h4>Categorías</h4>

            {categories.map((category) => (
              <label className="filter-option" key={category}>
                <input
                  type="radio"
                  name="bdsm-category"
                  checked={selectedCategory === category}
                  onChange={() => setSelectedCategory(category)}
                />
                {category}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Tipo de producto</h4>

            {types.map((type) => (
              <label className="filter-option" key={type}>
                <input
                  type="radio"
                  name="bdsm-type"
                  checked={selectedType === type}
                  onChange={() => setSelectedType(type)}
                />
                {type}
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
              <span>DESCUBRE NUESTRA SELECCIÓN</span>
              <h2>BDSM y accesorios</h2>
              <p>
                Productos para explorar nuevas experiencias de manera
                responsable.
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
              <strong>{filteredProducts.length}</strong> productos encontrados
            </span>

            <div className="catalog-control-actions">
              <label className="sort-control">
                Ordenar:
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  <option value="default">Destacados</option>
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
                      {product.image ? (
                      <img src={product.image} alt={product.name} className="product-card-img" loading="lazy" />
                    ) : (
                      <div className="product-placeholder">
                        <ShoppingBag size={42} />
                        <span>Imagen del producto</span>
                      </div>
                    )}

                      {product.tag && (
                        <span className="product-tag">
                          {product.tag}
                        </span>
                      )}

                      {product.oldPrice && (
                        <span className="product-discount">
                          -
                          {Math.round(
                            ((product.oldPrice - product.price) /
                              product.oldPrice) *
                              100
                          )}
                          %
                        </span>
                      )}

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

                        {product.oldPrice && (
                          <del>
                            S/ {product.oldPrice.toFixed(2)}
                          </del>
                        )}
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
              <h3>No encontramos productos</h3>
              <p>Prueba modificando los filtros seleccionados.</p>
              <button className="clear-filters" onClick={clearFilters}>
                Ver todos los productos
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default BDSM;


import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  SlidersHorizontal,
  Grid3X3,
  List,
  ChevronDown,
  Star,
  Sparkles,
} from "lucide-react";
import { useShop } from "../../context/ShopContext";

const products = [
  {
    id: 1,
    name: "Kit de conexión para parejas",
    category: "Kits para parejas",
    material: "Mixto",
    price: 129.9,
    oldPrice: 159.9,
    rating: 4.9,
    tag: "MÁS VENDIDO",
  },
  {
    id: 2,
    name: "Juego de cartas íntimas",
    category: "Juegos y dinámicas",
    material: "Cartón",
    price: 49.9,
    oldPrice: null,
    rating: 4.8,
    tag: "POPULAR",
  },
  {
    id: 3,
    name: "Set de masaje para dos",
    category: "Masajes",
    material: "Mixto",
    price: 89.9,
    oldPrice: 109.9,
    rating: 4.7,
    tag: "OFERTA",
  },
  {
    id: 4,
    name: "Dados de posiciones",
    category: "Juegos y dinámicas",
    material: "Madera",
    price: 29.9,
    oldPrice: null,
    rating: 4.6,
    tag: "",
  },
  {
    id: 5,
    name: "Kit romántico para parejas",
    category: "Kits para parejas",
    material: "Mixto",
    price: 119.9,
    oldPrice: 139.9,
    rating: 4.9,
    tag: "RECOMENDADO",
  },
  {
    id: 6,
    name: "Aceite de masaje sensorial",
    category: "Masajes",
    material: "Aceite",
    price: 39.9,
    oldPrice: null,
    rating: 4.7,
    tag: "",
  },
  {
    id: 7,
    name: "Juego de retos para dos",
    category: "Juegos y dinámicas",
    material: "Cartón",
    price: 59.9,
    oldPrice: null,
    rating: 4.8,
    tag: "NOVEDAD",
  },
  {
    id: 8,
    name: "Set de accesorios para parejas",
    category: "Accesorios",
    material: "Mixto",
    price: 99.9,
    oldPrice: 119.9,
    rating: 4.6,
    tag: "OFERTA",
  },
  {
    id: 9,
    name: "Vibrador para parejas",
    category: "Juguetes para parejas",
    material: "Silicona",
    price: 189.9,
    oldPrice: 219.9,
    rating: 4.9,
    tag: "DESTACADO",
  },
  {
    id: 10,
    name: "Set de velas para masajes",
    category: "Masajes",
    material: "Cera especial",
    price: 69.9,
    oldPrice: null,
    rating: 4.7,
    tag: "",
  },
  {
    id: 11,
    name: "Kit de experiencias en pareja",
    category: "Kits para parejas",
    material: "Mixto",
    price: 149.9,
    oldPrice: 179.9,
    rating: 4.8,
    tag: "EXCLUSIVO",
  },
  {
    id: 12,
    name: "Accesorio de exploración compartida",
    category: "Juguetes para parejas",
    material: "Silicona",
    price: 159.9,
    oldPrice: null,
    rating: 4.7,
    tag: "",
  },
];

// Identificadores únicos para esta categoría
export const catalogProducts = products.map((product) => ({
  ...product,
  id: `para-parejas-${product.id}`,
}));

const categories = [
  "Todos",
  "Kits para parejas",
  "Juegos y dinámicas",
  "Masajes",
  "Juguetes para parejas",
  "Accesorios",
];

const materials = [
  "Todos",
  "Silicona",
  "Mixto",
  "Madera",
  "Cartón",
  "Aceite",
];

function ParaParejas() {
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

  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedMaterial, setSelectedMaterial] = useState("Todos");
  const [maxPrice, setMaxPrice] = useState(250);
  const [sort, setSort] = useState("default");
  const [view, setView] = useState("grid");

  const filteredProducts = useMemo(() => {
    let result = catalogProducts.filter((product) => {
      const categoryMatch =
        selectedCategory === "Todos" ||
        product.category === selectedCategory;

      const materialMatch =
        selectedMaterial === "Todos" ||
        product.material === selectedMaterial;

      const priceMatch = product.price <= maxPrice;

      return categoryMatch && materialMatch && priceMatch;
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, selectedMaterial, maxPrice, sort]);

  const clearFilters = () => {
    setSelectedCategory("Todos");
    setSelectedMaterial("Todos");
    setMaxPrice(250);
  };

  return (
    <section className="catalog-page">
      <div className="catalog-banner">
        <div>
          <span className="catalog-eyebrow">
            COMPARTE NUEVAS EXPERIENCIAS
          </span>
          <h1>Para Parejas</h1>
          <p>
            Descubran juntos nuevas formas de conectar, explorar y disfrutar.
          </p>
        </div>
        <Sparkles className="catalog-banner-icon" />
      </div>

      <div className="catalog-breadcrumb">
        <span>Inicio</span>
        <span>/</span>
        <strong>Para Parejas</strong>
      </div>

      <div className="catalog-layout">
        <aside className="catalog-sidebar">
          <div className="sidebar-heading">
            <SlidersHorizontal size={19} />
            <h3>Filtros</h3>
          </div>

          <div className="filter-group">
            <h4>Categorías</h4>

            {categories.map((category) => (
              <button
                key={category}
                className={`filter-option ${
                  selectedCategory === category ? "selected" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                <span>{category}</span>
                {selectedCategory === category && <span>✓</span>}
              </button>
            ))}
          </div>

          <div className="filter-group">
            <h4>Material</h4>

            {materials.map((material) => (
              <button
                key={material}
                className={`filter-option ${
                  selectedMaterial === material ? "selected" : ""
                }`}
                onClick={() => setSelectedMaterial(material)}
              >
                <span>{material}</span>
                {selectedMaterial === material && <span>✓</span>}
              </button>
            ))}
          </div>

          <div className="filter-group">
            <h4>Precio máximo</h4>
            <div className="price-slider">
              <input
                type="range"
                min="20"
                max="250"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
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
              <h2>Productos para parejas</h2>
              <p>
                Encuentra opciones para compartir momentos especiales.
              </p>
            </div>
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
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="default">Recomendados</option>
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
                      <div className="product-placeholder">
                        <Heart size={43} />
                        <span>Imagen del producto</span>
                      </div>

                      {product.tag && (
                        <span className="product-tag">
                          {product.tag}
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
                        <strong>S/ {product.price.toFixed(2)}</strong>
                        {product.oldPrice && (
                          <del>S/ {product.oldPrice.toFixed(2)}</del>
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
            <div className="no-products">
              <SlidersHorizontal size={35} />
              <h3>No encontramos productos</h3>
              <p>Prueba modificando los filtros de búsqueda.</p>
              <button onClick={clearFilters}>
                Ver todos los productos
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ParaParejas;

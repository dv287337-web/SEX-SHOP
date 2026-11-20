
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
  Shirt,
} from "lucide-react";

import { useShop } from "../../context/ShopContext";
import { mergeCustomProducts } from "../../utils/catalogHelpers";

// PRODUCTOS
const products = [];

// IDENTIFICADORES ÚNICOS PARA LENCERÍA
export const catalogProducts = products.map((product) => ({
  ...product,
  id: `lenceria-${product.id}`,
}));

// CATEGORÍAS
const categories = [
  "Todas",
  "Conjuntos",
  "Bodies",
  "Babydolls",
  "Corsets",
  "Medias",
  "Batas",
];

// MATERIALES
const materials = [
  "Todos",
  "Encaje",
  "Satén",
  "Tul",
  "Red",
  "Poliéster",
];

function Lenceria() {
  // SISTEMA GLOBAL DE FAVORITOS Y CARRITO
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

  // ESTADOS DEL CATÁLOGO
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedMaterial, setSelectedMaterial] = useState("Todos");
  const [maxPrice, setMaxPrice] = useState(200);
  const [sort, setSort] = useState("default");
  const [view, setView] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  // FILTRAR Y ORDENAR PRODUCTOS (INCLUYE ADMIN)
  const filteredProducts = useMemo(() => {
    const combinedList = mergeCustomProducts(catalogProducts, customProducts, "lenceria");

    let result = combinedList.filter((product) => {
      const categoryMatch =
        selectedCategory === "Todas" ||
        product.category === selectedCategory;

      const materialMatch =
        selectedMaterial === "Todos" ||
        product.material === selectedMaterial;

      const priceMatch = maxPrice ? product.price <= maxPrice : true;

      return (
        categoryMatch &&
        materialMatch &&
        priceMatch
      );
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, selectedMaterial, maxPrice, sort, customProducts]);

  // LIMPIAR FILTROS
  const clearFilters = () => {
    setSelectedCategory("Todas");
    setSelectedMaterial("Todos");
    setMaxPrice(200);
  };

  // AGREGAR AL CARRITO
  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <section className="catalog-page catalog-page--lenceria">

      {/* BANNER */}
      <div className="catalog-banner">
        <div>
          <span className="catalog-eyebrow">
            ELEGANCIA, SENSUALIDAD Y ESTILO
          </span>

          <h1>Lencería</h1>

          <p>
            Encuentra diseños especiales que resaltan tu belleza y confianza.
          </p>
        </div>

        <Shirt className="catalog-banner-icon" aria-hidden="true" />
      </div>

      {/* MIGAS DE PAN */}
      <div className="catalog-breadcrumb">
        <span>Inicio</span>
        <span>/</span>
        <strong>Lencería</strong>
      </div>

      <div className="catalog-layout">

        {/* FILTROS */}
        <aside
          className={`catalog-sidebar ${
            showFilters ? "filters-open" : ""
          }`}
        >
          <div className="sidebar-heading">
            <SlidersHorizontal size={19} />
            <h3>Filtrar productos</h3>
          </div>

          {/* FILTRO POR CATEGORÍA */}
          <div className="filter-group">
            <h4>Categorías</h4>

            {categories.map((category) => (
              <label className="filter-option" key={category}>
                <input
                  type="radio"
                  name="lenceria-category"
                  checked={selectedCategory === category}
                  onChange={() => setSelectedCategory(category)}
                />

                {category}
              </label>
            ))}
          </div>

          {/* FILTRO POR MATERIAL */}
          <div className="filter-group">
            <h4>Material</h4>

            {materials.map((material) => (
              <label className="filter-option" key={material}>
                <input
                  type="radio"
                  name="lenceria-material"
                  checked={selectedMaterial === material}
                  onChange={() => setSelectedMaterial(material)}
                />

                {material}
              </label>
            ))}
          </div>

          {/* FILTRO POR PRECIO */}
          <div className="filter-group">
            <h4>Precio máximo</h4>

            <div className="price-slider">
              <input
                type="range"
                min="30"
                max="200"
                step="5"
                value={maxPrice}
                onChange={(event) =>
                  setMaxPrice(Number(event.target.value))
                }
              />

              <div className="price-range-values">
                <span>S/ 30</span>
                <strong>S/ {maxPrice.toFixed(2)}</strong>
              </div>
            </div>
          </div>

          <button
            className="clear-filters"
            onClick={clearFilters}
          >
            Limpiar filtros
          </button>
        </aside>

        {/* CONTENIDO DEL CATÁLOGO */}
        <div className="catalog-content">

          <div className="catalog-heading">
            <div>
              <span>DESCUBRE NUESTRA COLECCIÓN</span>

              <h2>Lencería para cada ocasión</h2>

              <p>
                Explora nuestros diseños y encuentra tu próximo favorito.
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

          {/* CONTROLES */}
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

          {/* PRODUCTOS */}
          {filteredProducts.length > 0 ? (
            <div
              className={`products-grid ${
                view === "list" ? "list-view" : ""
              }`}
            >
              {filteredProducts.map((product) => (
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
                        -{Math.round(
                          ((product.oldPrice - product.price) /
                            product.oldPrice) *
                            100
                        )}%
                      </span>
                    )}

                    {/* FAVORITOS GLOBALES */}
                    <button
                      type="button"
                      className={`favorite-button ${
                        isFavorite(product.id) ? "is-favorite" : ""
                      }`}
                      onClick={() => toggleFavorite(product)}
                      aria-label={
                        isFavorite(product.id)
                          ? "Quitar de favoritos"
                          : "Agregar a favoritos"
                      }
                    >
                      <Heart
                        size={19}
                        fill={
                          isFavorite(product.id)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                  </div>

                  {/* INFORMACIÓN DEL PRODUCTO */}
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

                    {/* CARRITO GLOBAL */}
                    <button
                      type="button"
                      className="add-cart-button"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingBag size={17} />
                      Agregar al carrito
                    </button>

                  </div>
                </article>
              ))}
            </div>
          ) : (

            /* ESTADO SIN RESULTADOS */
            <div className="catalog-empty">
              <ShoppingBag size={42} />
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

export default Lenceria;

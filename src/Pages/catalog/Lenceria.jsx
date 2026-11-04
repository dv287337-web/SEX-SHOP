
import { useMemo, useState } from "react";
import {
  Heart,
  ShoppingBag,
  SlidersHorizontal,
  Grid3X3,
  List,
  Star,
  ChevronDown,
  Sparkles,
} from "lucide-react";

import { useShop } from "../../context/ShopContext";

// PRODUCTOS
const products = [
  {
    id: 1,
    name: "Conjunto de encaje negro",
    category: "Conjuntos",
    material: "Encaje",
    price: 89.90,
    oldPrice: 119.90,
    rating: 4.9,
    tag: "MÁS VENDIDO",
  },
  {
    id: 2,
    name: "Body elegante de encaje",
    category: "Bodies",
    material: "Encaje",
    price: 109.90,
    oldPrice: null,
    rating: 4.8,
    tag: "NOVEDAD",
  },
  {
    id: 3,
    name: "Babydoll de satén rojo",
    category: "Babydolls",
    material: "Satén",
    price: 79.90,
    oldPrice: 99.90,
    rating: 4.7,
    tag: "OFERTA",
  },
  {
    id: 4,
    name: "Corset de encaje",
    category: "Corsets",
    material: "Encaje",
    price: 129.90,
    oldPrice: null,
    rating: 4.9,
    tag: "DESTACADO",
  },
  {
    id: 5,
    name: "Medias de red elegantes",
    category: "Medias",
    material: "Red",
    price: 39.90,
    oldPrice: null,
    rating: 4.6,
    tag: "",
  },
  {
    id: 6,
    name: "Conjunto de lencería vino",
    category: "Conjuntos",
    material: "Encaje",
    price: 94.90,
    oldPrice: 119.90,
    rating: 4.8,
    tag: "OFERTA",
  },
  {
    id: 7,
    name: "Body de transparencias",
    category: "Bodies",
    material: "Tul",
    price: 99.90,
    oldPrice: null,
    rating: 4.7,
    tag: "",
  },
  {
    id: 8,
    name: "Bata de satén",
    category: "Batas",
    material: "Satén",
    price: 119.90,
    oldPrice: 149.90,
    rating: 4.9,
    tag: "EXCLUSIVO",
  },
  {
    id: 9,
    name: "Conjunto de encaje rosa",
    category: "Conjuntos",
    material: "Encaje",
    price: 84.90,
    oldPrice: null,
    rating: 4.7,
    tag: "",
  },
  {
    id: 10,
    name: "Corset negro con detalles",
    category: "Corsets",
    material: "Poliéster",
    price: 139.90,
    oldPrice: 169.90,
    rating: 4.8,
    tag: "POPULAR",
  },
  {
    id: 11,
    name: "Babydoll de encaje floral",
    category: "Babydolls",
    material: "Encaje",
    price: 74.90,
    oldPrice: null,
    rating: 4.6,
    tag: "",
  },
  {
    id: 12,
    name: "Medias con liguero",
    category: "Medias",
    material: "Red",
    price: 54.90,
    oldPrice: 69.90,
    rating: 4.8,
    tag: "OFERTA",
  },
];

// IDENTIFICADORES ÚNICOS PARA LENCERÍA
const catalogProducts = products.map((product) => ({
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
  } = useShop();

  // ESTADOS DEL CATÁLOGO
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedMaterial, setSelectedMaterial] = useState("Todos");
  const [maxPrice, setMaxPrice] = useState(200);
  const [sort, setSort] = useState("default");
  const [view, setView] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  // FILTRAR Y ORDENAR PRODUCTOS
  const filteredProducts = useMemo(() => {
    let result = catalogProducts.filter((product) => {
      const categoryMatch =
        selectedCategory === "Todas" ||
        product.category === selectedCategory;

      const materialMatch =
        selectedMaterial === "Todos" ||
        product.material === selectedMaterial;

      return (
        categoryMatch &&
        materialMatch &&
        product.price <= maxPrice
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
  }, [selectedCategory, selectedMaterial, maxPrice, sort]);

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
    <section className="catalog-page">

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

        <Sparkles className="catalog-banner-icon" />
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
                <article className="product-card" key={product.id}>

                  <div className="product-image">

                    <div className="product-placeholder">
                      <Sparkles size={42} />
                      <span>Imagen del producto</span>
                    </div>

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
              <ShoppingBag size={38} />

              <h3>No encontramos productos</h3>

              <p>
                Prueba modificando los filtros seleccionados.
              </p>

              <button
                className="clear-filters"
                onClick={clearFilters}
              >
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

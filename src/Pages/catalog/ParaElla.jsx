
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  SlidersHorizontal,
  Grid2X2,
  List,
  ChevronDown,
  Star,
  Package
} from "lucide-react";

import { useShop } from "../../context/ShopContext";

// PRODUCTOS
const products = [
  { id: 1, name: "Vibrador elegante recargable", category: "Vibradores", material: "Silicona", price: 89.90, oldPrice: 119.90, rating: 4.9, discount: 25, tag: "MÁS VENDIDO" },
  { id: 2, name: "Estimulador de succión", category: "Estimuladores", material: "Silicona", price: 129.90, oldPrice: 159.90, rating: 4.8, discount: 19, tag: "POPULAR" },
  { id: 3, name: "Bala vibradora compacta", category: "Estimuladores", material: "Silicona", price: 49.90, oldPrice: null, rating: 4.7, discount: 0, tag: "NUEVO" },
  { id: 4, name: "Vibrador de diseño premium", category: "Vibradores", material: "Silicona", price: 149.90, oldPrice: null, rating: 4.9, discount: 0, tag: "" },
  { id: 5, name: "Conjunto de lencería delicada", category: "Lencería", material: "Encaje", price: 79.90, oldPrice: 99.90, rating: 4.6, discount: 20, tag: "OFERTA" },
  { id: 6, name: "Body de encaje elegante", category: "Lencería", material: "Encaje", price: 99.90, oldPrice: null, rating: 4.8, discount: 0, tag: "" },
  { id: 7, name: "Aceite de masaje sensorial", category: "Cosmética", material: "Natural", price: 39.90, oldPrice: null, rating: 4.5, discount: 0, tag: "" },
  { id: 8, name: "Gel íntimo de efecto cálido", category: "Cosmética", material: "Natural", price: 34.90, oldPrice: 44.90, rating: 4.6, discount: 22, tag: "OFERTA" },
  { id: 9, name: "Anillo estimulador", category: "Accesorios", material: "Silicona", price: 54.90, oldPrice: null, rating: 4.5, discount: 0, tag: "" },
  { id: 10, name: "Kit de exploración", category: "Accesorios", material: "Mixto", price: 109.90, oldPrice: 139.90, rating: 4.8, discount: 21, tag: "RECOMENDADO" },
  { id: 11, name: "Estimulador discreto", category: "Estimuladores", material: "Silicona", price: 69.90, oldPrice: null, rating: 4.7, discount: 0, tag: "" },
  { id: 12, name: "Set de bienestar íntimo", category: "Accesorios", material: "Mixto", price: 119.90, oldPrice: 149.90, rating: 4.8, discount: 20, tag: "ESPECIAL" }
];

// IDENTIFICADORES ÚNICOS PARA PARA ELLA
export const catalogProducts = products.map((product) => ({
  ...product,
  id: `para-ella-${product.id}`
}));

// CATEGORÍAS
const categories = [
  "Vibradores",
  "Estimuladores",
  "Lencería",
  "Cosmética",
  "Accesorios"
];

// MATERIALES
const materials = ["Silicona", "Encaje", "Natural", "Mixto"];

function ParaElla() {
  // SISTEMA GLOBAL
  const {
    toggleFavorite,
    isFavorite,
    addToCart
  } = useShop();
  const navigate = useNavigate();
  const openProductDetails = (product) => {
    sessionStorage.setItem(`sexshop-product-${product.id}`, JSON.stringify(product));
    navigate(`/producto/${encodeURIComponent(product.id)}`, { state: { product } });
  };

  // ESTADOS
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [maxPrice, setMaxPrice] = useState(200);
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState("grid");

  // SELECCIÓN MÚLTIPLE
  const toggleValue = (value, selected, setter) => {
    setter(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value]
    );
  };

  // FILTRAR Y ORDENAR
  const filteredProducts = useMemo(() => {
    let result = catalogProducts.filter((product) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const materialMatch =
        selectedMaterials.length === 0 ||
        selectedMaterials.includes(product.material);

      return categoryMatch && materialMatch && product.price <= maxPrice;
    });

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategories, selectedMaterials, maxPrice, sort]);

  // LIMPIAR FILTROS
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedMaterials([]);
    setMaxPrice(200);
  };

  // AGREGAR AL CARRITO
  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="catalog-page">

      {/* BANNER */}
      <section className="catalog-banner">
        <div>
          <span className="catalog-eyebrow">
            UNA EXPERIENCIA PARA TI
          </span>

          <h1>Para Ella</h1>

          <p>
            Descubre una colección pensada para explorar, disfrutar y sentir.
          </p>
        </div>
      </section>

      {/* MIGAS DE PAN */}
      <div className="catalog-breadcrumb">
        Inicio / Categorías / <strong>Para Ella</strong>
      </div>

      <div className="catalog-layout">

        {/* FILTROS */}
        <aside className="catalog-sidebar">

          <div className="sidebar-heading">
            <SlidersHorizontal size={19} />
            <h2>Filtrar productos</h2>
          </div>

          <div className="filter-group">
            <h3>Categorías</h3>

            {categories.map((category) => (
              <label className="filter-option" key={category}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() =>
                    toggleValue(
                      category,
                      selectedCategories,
                      setSelectedCategories
                    )
                  }
                />

                {category}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h3>Material</h3>

            {materials.map((material) => (
              <label className="filter-option" key={material}>
                <input
                  type="checkbox"
                  checked={selectedMaterials.includes(material)}
                  onChange={() =>
                    toggleValue(
                      material,
                      selectedMaterials,
                      setSelectedMaterials
                    )
                  }
                />

                {material}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h3>Precio máximo</h3>

            <input
              className="price-slider"
              type="range"
              min="30"
              max="200"
              step="5"
              value={maxPrice}
              onChange={(event) =>
                setMaxPrice(Number(event.target.value))
              }
            />

            <div className="price-range">
              <span>S/ 30</span>
              <strong>S/ {maxPrice.toFixed(2)}</strong>
            </div>
          </div>

          <button
            className="clear-filters"
            onClick={clearFilters}
          >
            Limpiar filtros
          </button>

        </aside>

        {/* CATÁLOGO */}
        <section className="catalog-content">

          <div className="catalog-heading">
            <div>
              <span>EXPLORA NUESTRA COLECCIÓN</span>
              <h2>Productos para Ella</h2>
              <p>{filteredProducts.length} productos encontrados</p>
            </div>
          </div>

          {/* CONTROLES */}
          <div className="catalog-controls">

            <div className="catalog-results">
              Mostrando {filteredProducts.length} productos
            </div>

            <div className="catalog-control-actions">

              <label className="sort-select">
                Ordenar:

                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  <option value="featured">Destacados</option>
                  <option value="price-low">Menor precio</option>
                  <option value="price-high">Mayor precio</option>
                  <option value="rating">Mejor valorados</option>
                </select>

                <ChevronDown size={15} />
              </label>

              <button
                className={view === "grid" ? "view-active" : ""}
                onClick={() => setView("grid")}
                aria-label="Vista de cuadrícula"
              >
                <Grid2X2 size={19} />
              </button>

              <button
                className={view === "list" ? "view-active" : ""}
                onClick={() => setView("list")}
                aria-label="Vista de lista"
              >
                <List size={20} />
              </button>

            </div>
          </div>

          {/* PRODUCTOS */}
          {filteredProducts.length === 0 ? (

            <div className="catalog-empty">
              <Package size={42} />
              <h3>No encontramos productos</h3>
              <p>Prueba modificando los filtros seleccionados.</p>

              <button
                className="clear-filters"
                onClick={clearFilters}
              >
                Ver todos los productos
              </button>
            </div>

          ) : (

            <div className={`products-grid ${view === "list" ? "list-view" : ""}`}>

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

                    <div className="product-placeholder">
                      <ShoppingBag size={42} />
                      <span>Imagen del producto</span>
                    </div>

                    {product.tag && (
                      <span className="product-tag">
                        {product.tag}
                      </span>
                    )}

                    {product.discount > 0 && (
                      <span className="product-discount">
                        -{product.discount}%
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

                  {/* INFORMACIÓN */}
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

          )}

        </section>
      </div>
    </div>
  );
}

export default ParaElla;

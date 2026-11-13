
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
import { mergeCustomProducts } from "../../utils/catalogHelpers";

// PRODUCTOS
const products = [
  { id: 1, name: "Masturbador masculino premium", category: "Masturbadores", material: "TPE", price: 119.90, oldPrice: 149.90, rating: 4.9, discount: 20, tag: "MÁS VENDIDO" },
  { id: 2, name: "Masturbador compacto discreto", category: "Masturbadores", material: "Silicona", price: 89.90, oldPrice: null, rating: 4.7, discount: 0, tag: "NUEVO" },
  { id: 3, name: "Anillo estimulador masculino", category: "Anillos", material: "Silicona", price: 49.90, oldPrice: 64.90, rating: 4.6, discount: 23, tag: "OFERTA" },
  { id: 4, name: "Anillo vibrador recargable", category: "Anillos", material: "Silicona", price: 69.90, oldPrice: null, rating: 4.8, discount: 0, tag: "" },
  { id: 5, name: "Estimulador masculino", category: "Estimuladores", material: "Silicona", price: 79.90, oldPrice: 99.90, rating: 4.8, discount: 20, tag: "POPULAR" },
  { id: 6, name: "Bala estimuladora compacta", category: "Estimuladores", material: "Silicona", price: 44.90, oldPrice: null, rating: 4.5, discount: 0, tag: "" },
  { id: 7, name: "Plug anal de silicona", category: "Juguetes anales", material: "Silicona", price: 59.90, oldPrice: null, rating: 4.7, discount: 0, tag: "" },
  { id: 8, name: "Kit de exploración masculino", category: "Juguetes anales", material: "Mixto", price: 109.90, oldPrice: 139.90, rating: 4.8, discount: 21, tag: "OFERTA" },
  { id: 9, name: "Aceite de masaje sensorial", category: "Cosmética", material: "Natural", price: 39.90, oldPrice: null, rating: 4.6, discount: 0, tag: "" },
  { id: 10, name: "Gel íntimo efecto cálido", category: "Cosmética", material: "Natural", price: 34.90, oldPrice: 44.90, rating: 4.5, discount: 22, tag: "OFERTA" },
  { id: 11, name: "Set de accesorios masculinos", category: "Accesorios", material: "Mixto", price: 89.90, oldPrice: null, rating: 4.7, discount: 0, tag: "ESPECIAL" },
  { id: 12, name: "Kit íntimo para parejas", category: "Accesorios", material: "Mixto", price: 129.90, oldPrice: 159.90, rating: 4.9, discount: 19, tag: "RECOMENDADO" }
];

// IDENTIFICADORES ÚNICOS
export const catalogProducts = products.map((product) => ({
  ...product,
  id: `para-el-${product.id}`
}));

const categories = [
  "Masturbadores",
  "Anillos",
  "Estimuladores",
  "Juguetes anales",
  "Cosmética",
  "Accesorios"
];

const materials = ["Silicona", "TPE", "Natural", "Mixto"];

function ParaEl() {
  // SISTEMA GLOBAL DE FAVORITOS Y CARRITO
  const {
    toggleFavorite,
    isFavorite,
    addToCart,
    customProducts
  } = useShop();
  const navigate = useNavigate();
  const openProductDetails = (product) => {
    sessionStorage.setItem(`sexshop-product-${product.id}`, JSON.stringify(product));
    navigate(`/producto/${encodeURIComponent(product.id)}`, { state: { product } });
  };

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

  // FILTRAR Y ORDENAR (INCLUYE PRODUCTOS SUBIDOS DESDE EL ADMIN)
  const filteredProducts = useMemo(() => {
    const combinedList = mergeCustomProducts(catalogProducts, customProducts, "para-el");

    let result = combinedList.filter((product) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const materialMatch =
        selectedMaterials.length === 0 ||
        selectedMaterials.includes(product.material);

      const withinPrice = maxPrice ? product.price <= maxPrice : true;

      return categoryMatch && materialMatch && withinPrice;
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
  }, [selectedCategories, selectedMaterials, maxPrice, sort, customProducts]);

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
    <div className="catalog-page catalog-page--el">

      {/* BANNER */}
      <section className="catalog-banner">
        <div>
          <span className="catalog-eyebrow">
            DESCUBRE TU PROPIO ESTILO
          </span>

          <h1>Para Él</h1>

          <p>
            Explora nuestra selección de productos diseñados para disfrutar sin límites.
          </p>
        </div>
      </section>

      {/* MIGAS DE PAN */}
      <div className="catalog-breadcrumb">
        Inicio / Categorías / <strong>Para Él</strong>
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
              <h2>Productos para Él</h2>
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

          )}

        </section>
      </div>
    </div>
  );
}

export default ParaEl;

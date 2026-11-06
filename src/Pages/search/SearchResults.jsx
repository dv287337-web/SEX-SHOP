import { Link, useSearchParams } from "react-router-dom";
import { Search, SearchX } from "lucide-react";
import { allCatalogProducts } from "../../data/catalogProducts";

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es");
}

function openProduct(product) {
  sessionStorage.setItem(`sexshop-product-${product.id}`, JSON.stringify(product));
}

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";
  const normalizedQuery = normalizeText(query);
  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  const results = terms.length
    ? allCatalogProducts.filter((product) => {
        const searchableFields = [
          product.name,
          product.category,
          product.material,
          product.type,
          product.tag,
        ];
        const searchableText = normalizeText(searchableFields.join(" "));
        return terms.every((term) => searchableText.includes(term));
      })
    : [];

  return (
    <main className="search-results-page">
      <span className="search-results-eyebrow">BÚSQUEDA EN LA TIENDA</span>
      <h1>Resultados para “{query}”</h1>
      <p className="search-results-count">
        {results.length} {results.length === 1 ? "producto encontrado" : "productos encontrados"}
      </p>

      {results.length ? (
        <div className="search-result-grid">
          {results.map((product) => (
            <Link
              className="search-result-card"
              data-reveal
              key={product.id}
              to={`/producto/${encodeURIComponent(product.id)}`}
              state={{ product }}
              onClick={() => openProduct(product)}
            >
              <span className="search-result-art" aria-hidden="true">
                <Search size={28} strokeWidth={1.5} />
                {product.tag && <span>{product.tag}</span>}
              </span>
              <span className="search-result-category">{product.category}</span>
              <strong className="search-result-name">{product.name}</strong>
              <span className="search-result-bottom">
                <b>S/ {product.price.toFixed(2)}</b>
                <span>Ver producto →</span>
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <section className="search-empty-state">
          <SearchX size={35} strokeWidth={1.5} />
          <h2>{query ? "No encontramos productos" : "Escribe qué deseas explorar"}</h2>
          <p>
            {query
              ? "Prueba con otro nombre, categoría o material."
              : "Busca por nombre, categoría o material para encontrar tu próximo favorito."}
          </p>
          <Link to="/juguetes">Explorar productos</Link>
        </section>
      )}
    </main>
  );
}

import { useState, useMemo } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Eye, 
  LogOut, 
  Layers, 
  AlertCircle,
  PackageCheck,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { Link } from "react-router-dom";
import { CATALOG_CATEGORIES, isSupabaseConfigured } from "../../utils/supabase";
import ProductFormModal from "./ProductFormModal";
import AdminLogin from "./AdminLogin";
import { useShop } from "../../context/ShopContext";

export default function AdminDashboard() {
  const { showToast, customProducts, addCustomProduct, updateCustomProduct, deleteCustomProduct, refreshProducts, isProductsLoading } = useShop();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("sexshop_admin_auth") === "true";
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleLogout = () => {
    sessionStorage.removeItem("sexshop_admin_auth");
    setIsAuthenticated(false);
    showToast({
      title: "Sesión cerrada",
      message: "Has salido del panel de administración.",
      type: "info"
    });
  };

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (productData, id) => {
    if (id) {
      await updateCustomProduct(id, productData);
      showToast({
        title: "Producto actualizado",
        message: `Se guardaron los cambios de "${productData.name}".`,
        type: "success"
      });
    } else {
      await addCustomProduct(productData);
      showToast({
        title: "¡Producto publicado!",
        message: `"${productData.name}" ya está visible en la categoría correspondiente.`,
        type: "success"
      });
    }
  };

  const handleDeleteProduct = async (product) => {
    const confirmDelete = window.confirm(`¿Estás seguro de eliminar "${product.name}"?`);
    if (!confirmDelete) return;

    await deleteCustomProduct(product.id);
    showToast({
      title: "Producto eliminado",
      message: `"${product.name}" fue retirado del catálogo.`,
      type: "info"
    });
  };

  const filteredProducts = useMemo(() => {
    return (customProducts || []).filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.material && item.material.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [customProducts, searchTerm, selectedCategory]);

  if (!isAuthenticated) {
    return <AdminLogin onLogin={setIsAuthenticated} />;
  }

  return (
    <div className="admin-page">
      {/* Barra Superior de Control */}
      <header className="admin-header">
        <div className="admin-header-brand">
          <div className="admin-header-pill">
            <Sparkles size={14} />
            <span>PANEL DE CONTROL</span>
          </div>
          <h1>Gestión de Catálogo & Productos</h1>
          <p>Sube nuevos artículos fotográficos, ajusta precios y actualiza el stock en vivo.</p>
        </div>

        <div className="admin-header-actions">
          <Link to="/" className="admin-btn admin-btn--ghost" target="_blank">
            <Eye size={16} />
            Ver Tienda
          </Link>
          <button onClick={handleLogout} className="admin-btn admin-btn--danger-ghost">
            <LogOut size={16} />
            Salir
          </button>
        </div>
      </header>

      {/* Banner de Estado de Conexión */}
      {!isSupabaseConfigured && (
        <div className="admin-connection-banner">
          <AlertCircle size={20} />
          <div>
            <strong>Modo Local / Almacenamiento Seguro Activo</strong>
            <span>
              Tus productos se guardan en el navegador. Para sincronizarlos con la nube y el móvil de los clientes, vincula tus credenciales de Supabase en el archivo <code>.env</code>.
            </span>
          </div>
        </div>
      )}

      {/* Tarjetas de Resumen */}
      <section className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Layers size={22} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-label">Total Productos Creados</span>
            <span className="admin-stat-value">{customProducts.length}</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon admin-stat-icon--highlight">
            <PackageCheck size={22} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-label">Categorías Activas</span>
            <span className="admin-stat-value">{CATALOG_CATEGORIES.length}</span>
          </div>
        </div>

        <div className="admin-stat-card admin-stat-card--cta">
          <button onClick={handleOpenCreateModal} className="admin-btn admin-btn--primary admin-btn--full">
            <Plus size={18} />
            Subir Nuevo Producto
          </button>
        </div>
      </section>

      {/* Filtros y Buscador */}
      <section className="admin-filter-bar">
        <div className="admin-search-wrapper">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nombre, material o etiqueta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="admin-category-filter">
          <Filter size={16} />
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Todas las Categorías</option>
            {CATALOG_CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>

        {refreshProducts && (
          <button 
            className="admin-btn admin-btn--ghost admin-btn--icon-only" 
            onClick={refreshProducts}
            title="Recargar productos"
            disabled={isProductsLoading}
          >
            <RefreshCw size={17} className={isProductsLoading ? "spin" : ""} />
          </button>
        )}
      </section>

      {/* Tabla de Productos */}
      <section className="admin-table-container" data-lenis-prevent>
        {filteredProducts.length === 0 ? (
          <div className="admin-table-empty">
            <Layers size={40} />
            <h3>No se encontraron productos</h3>
            <p>Comienza subiendo el primer artículo fotográfico a tu catálogo.</p>
            <button onClick={handleOpenCreateModal} className="admin-btn admin-btn--primary">
              <Plus size={16} />
              Crear Producto Ahora
            </button>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre & Especificación</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Etiqueta</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const categoryObj = CATALOG_CATEGORIES.find(c => c.id === product.category);
                return (
                  <tr key={product.id}>
                    <td>
                      <div className="admin-table-thumb-wrapper">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="admin-table-thumb"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=200";
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="admin-table-prod-name">{product.name}</div>
                      <div className="admin-table-prod-sub">{product.material || "Estándar"}</div>
                    </td>
                    <td>
                      <span className="admin-table-badge">
                        {categoryObj?.label || product.category}
                      </span>
                    </td>
                    <td>
                      <div className="admin-table-price">S/. {Number(product.price).toFixed(2)}</div>
                      {product.old_price && (
                        <div className="admin-table-oldprice">S/. {Number(product.old_price).toFixed(2)}</div>
                      )}
                    </td>
                    <td>
                      <span className={`admin-stock-pill ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
                        {product.stock > 0 ? `${product.stock} un.` : "Agotado"}
                      </span>
                    </td>
                    <td>
                      {product.tag ? (
                        <span className="admin-tag-pill">{product.tag}</span>
                      ) : (
                        <span className="admin-text-muted">—</span>
                      )}
                    </td>
                    <td>
                      <div className="admin-actions-cell">
                        <button 
                          className="admin-action-btn edit" 
                          title="Editar producto"
                          onClick={() => handleOpenEditModal(product)}
                        >
                          <Edit3 size={15} />
                        </button>
                        <button 
                          className="admin-action-btn delete" 
                          title="Eliminar producto"
                          onClick={() => handleDeleteProduct(product)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>

      {/* Modal de Crear / Editar */}
      <ProductFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        editingProduct={editingProduct}
      />
    </div>
  );
}

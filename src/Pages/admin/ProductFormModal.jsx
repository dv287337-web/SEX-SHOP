import { useState, useRef } from "react";
import { 
  UploadCloud, 
  X, 
  Sparkles, 
  Check, 
  ArrowLeft,
  Image as ImageIcon,
  DollarSign,
  Tag,
  Package
} from "lucide-react";
import { CATALOG_CATEGORIES, uploadProductImage } from "../../utils/supabase";

export default function ProductFormModal({ isOpen, onClose, onSave, editingProduct = null }) {
  const [formData, setFormData] = useState(() => {
    if (editingProduct) {
      return {
        name: editingProduct.name || "",
        category: editingProduct.category || "para-ella",
        price: editingProduct.price || "",
        old_price: editingProduct.old_price || editingProduct.oldPrice || "",
        material: editingProduct.material || "Silicona médica",
        tag: editingProduct.tag || "NUEVO",
        description: editingProduct.description || "",
        stock: editingProduct.stock ?? 10,
        image: editingProduct.image || ""
      };
    }
    return {
      name: "",
      category: "para-ella",
      price: "",
      old_price: "",
      material: "Silicona médica",
      tag: "NUEVO",
      description: "",
      stock: 10,
      image: ""
    };
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(editingProduct?.image || "");
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileSelect = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      alert("Por favor selecciona un archivo de imagen válido (JPG, PNG, WEBP).");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Por favor ingresa el nombre del producto.");
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      alert("Por favor ingresa un precio válido mayor a 0.");
      return;
    }

    try {
      setUploading(true);
      let finalImageUrl = formData.image || "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600";

      // Si seleccionó un archivo nuevo, lo subimos
      if (imageFile) {
        finalImageUrl = await uploadProductImage(imageFile);
      }

      const productPayload = {
        ...formData,
        price: Number(formData.price),
        old_price: formData.old_price ? Number(formData.old_price) : null,
        stock: Number(formData.stock) || 0,
        image: finalImageUrl,
        is_active: true
      };

      await onSave(productPayload, editingProduct?.id);
      onClose();
    } catch (err) {
      console.error("Error guardando producto:", err);
      alert(`Error al guardar: ${err.message || "Verifica los datos ingresados"}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div 
        className="admin-modal-card" 
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        <div className="admin-modal-header">
          <div>
            <span className="admin-modal-eyebrow">
              <Sparkles size={13} />
              {editingProduct ? "EDICIÓN DE ARTÍCULO" : "NUEVO PRODUCTO"}
            </span>
            <h2 className="admin-modal-title">
              {editingProduct ? "Editar Producto" : "Publicar Nuevo Producto"}
            </h2>
          </div>
          <button className="admin-modal-close" onClick={onClose} aria-label="Cerrar modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-modal-form">
          {/* Subida de Imagen */}
          <div className="admin-form-section">
            <label className="admin-field-label">Imagen del Producto *</label>
            <div 
              className={`admin-image-dropzone ${isDragging ? "dragging" : ""} ${imagePreview ? "has-image" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                accept="image/*"
                style={{ display: "none" }}
              />

              {imagePreview ? (
                <div className="admin-image-preview-wrapper">
                  <img src={imagePreview} alt="Vista previa" className="admin-image-preview" />
                  <div className="admin-image-preview-overlay">
                    <UploadCloud size={24} />
                    <span>Hacer clic o arrastrar para cambiar imagen</span>
                  </div>
                </div>
              ) : (
                <div className="admin-image-placeholder">
                  <div className="admin-image-icon-bubble">
                    <ImageIcon size={30} />
                  </div>
                  <span className="admin-dropzone-title">Arrastra la fotografía aquí</span>
                  <span className="admin-dropzone-subtitle">o haz clic para explorar tus archivos (PNG, JPG, WEBP)</span>
                </div>
              )}
            </div>

            {/* Opción alternativa de URL directa */}
            <div className="admin-url-alt">
              <span>O pega una URL directa de imagen:</span>
              <input 
                type="url" 
                placeholder="https://ejemplo.com/foto-producto.jpg"
                value={formData.image}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, image: e.target.value }));
                  if (!imageFile) setImagePreview(e.target.value);
                }}
                className="admin-input-text"
              />
            </div>
          </div>

          {/* Datos Generales */}
          <div className="admin-form-grid-2">
            <div className="admin-field-group">
              <label className="admin-field-label">Nombre del Producto *</label>
              <input 
                type="text" 
                placeholder="Ej. Vibrador Luxury Velvet Touch"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="admin-input-text"
                required
              />
            </div>

            <div className="admin-field-group">
              <label className="admin-field-label">Categoría de Catálogo *</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="admin-select"
                required
              >
                {CATALOG_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="admin-form-grid-3">
            <div className="admin-field-group">
              <label className="admin-field-label">Precio Actual (S/.) *</label>
              <div className="admin-input-icon-group">
                <DollarSign size={16} />
                <input 
                  type="number" 
                  step="0.10"
                  min="0"
                  placeholder="99.90"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="admin-input-text"
                  required
                />
              </div>
            </div>

            <div className="admin-field-group">
              <label className="admin-field-label">Precio Anterior (Tachado)</label>
              <div className="admin-input-icon-group">
                <DollarSign size={16} />
                <input 
                  type="number" 
                  step="0.10"
                  min="0"
                  placeholder="129.90 (opcional)"
                  value={formData.old_price}
                  onChange={(e) => setFormData(prev => ({ ...prev, old_price: e.target.value }))}
                  className="admin-input-text"
                />
              </div>
            </div>

            <div className="admin-field-group">
              <label className="admin-field-label">Stock Disponible</label>
              <div className="admin-input-icon-group">
                <Package size={16} />
                <input 
                  type="number" 
                  min="0"
                  placeholder="10"
                  value={formData.stock}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                  className="admin-input-text"
                />
              </div>
            </div>
          </div>

          <div className="admin-form-grid-2">
            <div className="admin-field-group">
              <label className="admin-field-label">Material / Especificación</label>
              <input 
                type="text" 
                placeholder="Ej. Silicona médica líquida hipoalergénica"
                value={formData.material}
                onChange={(e) => setFormData(prev => ({ ...prev, material: e.target.value }))}
                className="admin-input-text"
              />
            </div>

            <div className="admin-field-group">
              <label className="admin-field-label">Etiqueta Destacada (Tag)</label>
              <div className="admin-input-icon-group">
                <Tag size={16} />
                <input 
                  type="text" 
                  placeholder="Ej. NUEVO, MÁS VENDIDO, OFERTA"
                  value={formData.tag}
                  onChange={(e) => setFormData(prev => ({ ...prev, tag: e.target.value.toUpperCase() }))}
                  className="admin-input-text"
                />
              </div>
            </div>
          </div>

          <div className="admin-field-group">
            <label className="admin-field-label">Descripción Sensorial / Detalles</label>
            <textarea 
              rows={3}
              placeholder="Describe las sensaciones, modos de uso, ergonomía y beneficios..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="admin-textarea"
            />
          </div>

          <div className="admin-modal-actions">
            <button 
              type="button" 
              className="admin-btn admin-btn--secondary"
              onClick={onClose}
              disabled={uploading}
            >
              <ArrowLeft size={16} />
              Cancelar
            </button>
            <button 
              type="submit" 
              className="admin-btn admin-btn--primary"
              disabled={uploading}
            >
              {uploading ? (
                <>Subiendo fotografía y guardando...</>
              ) : (
                <>
                  <Check size={18} />
                  {editingProduct ? "Actualizar Producto" : "Publicar en Catálogo"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

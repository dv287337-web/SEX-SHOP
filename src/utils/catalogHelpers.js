// Helper unificado para mezclar productos creados desde el admin en cualquier categoría
export function mergeCustomProducts(defaultProducts, customProducts, categoryId) {
  if (!Array.isArray(customProducts) || customProducts.length === 0) {
    return defaultProducts;
  }

  // Mapeo flexible de categorías
  const target = String(categoryId).toLowerCase().trim();

  const categoryCustoms = customProducts
    .filter(p => {
      if (!p) return false;
      const cat = String(p.category || "").toLowerCase().trim();
      
      if (cat === target) return true;
      if (cat === target.replace("para-", "")) return true;
      if (cat === target.replace("-", " ")) return true;
      if (target === "ofertas" && (p.old_price || p.oldPrice)) return true;

      return false;
    })
    .map(p => ({
      ...p,
      id: p.id ? String(p.id) : `custom-${Date.now()}-${Math.random()}`,
      name: p.name || "Producto sin título",
      price: Number(p.price) || 0,
      oldPrice: p.old_price ? Number(p.old_price) : (p.oldPrice ? Number(p.oldPrice) : null),
      material: p.material || "Silicona",
      // Si el producto no tiene una subcategoría que coincida, asignamos una válida del catálogo para que los filtros no lo oculten
      category: p.category_name || (defaultProducts[0]?.category || "General"),
      rating: Number(p.rating) || 5.0,
      tag: p.tag || "NUEVO",
      image: p.image || "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600",
      description: p.description || ""
    }));

  // Los nuevos productos van primero para máxima visibilidad
  return [...categoryCustoms, ...defaultProducts];
}


// Helper unificado para mezclar productos creados desde el admin en cualquier categoría
export function mergeCustomProducts(defaultProducts, customProducts, categoryId) {
  if (!Array.isArray(customProducts) || customProducts.length === 0) {
    return defaultProducts;
  }

  // Filtramos por la categoría correspondiente
  const categoryCustoms = customProducts
    .filter(p => {
      if (!p) return false;
      const targetCat = String(categoryId).toLowerCase();
      const pCat = String(p.category || "").toLowerCase();
      return pCat === targetCat || pCat === targetCat.replace("-", "") || pCat === targetCat.replace("para-", "");
    })
    .map(p => ({
      ...p,
      id: p.id || `custom-${Date.now()}-${Math.random()}`,
      name: p.name || "Producto sin título",
      price: Number(p.price) || 0,
      oldPrice: p.old_price ? Number(p.old_price) : (p.oldPrice ? Number(p.oldPrice) : null),
      material: p.material || "Silicona médica",
      category: p.category_name || (defaultProducts[0]?.category || "General"),
      rating: Number(p.rating) || 5.0,
      tag: p.tag || "NUEVO",
      image: p.image || "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600"
    }));

  // Los nuevos productos van primero para máxima visibilidad
  return [...categoryCustoms, ...defaultProducts];
}

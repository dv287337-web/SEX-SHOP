export function getProductDescription(product) {
  const details = `${product.name} ${product.category}`.toLowerCase();
  const name = product.name;

  if (/lencer|encaje|babydoll|corset|medias|batas|body/.test(details)) {
    return `${name} aporta un toque de estilo para hacer especial cada ocasión.`;
  }

  if (/pareja|cartas|dados|juego|kit romántico|para dos/.test(details)) {
    return `Con ${name}, compartan nuevas experiencias y creen momentos especiales.`;
  }

  if (/lubric|aceite|masaje|gel íntimo|crema|espuma|cosmética/.test(details)) {
    return `Haz de ${name} parte de una rutina sensorial y disfruta a tu manera.`;
  }

  if (/bdsm|restricción|esposas|antifaz|sensaciones|sujeción/.test(details)) {
    return `Explora nuevas sensaciones con ${name}, a tu propio ritmo y desde la confianza.`;
  }

  return `Descubre nuevas sensaciones con ${name} y disfruta a tu manera.`;
}

export function getProductFeatures(product) {
  const features = [];

  if (product.category) features.push({ label: "Colección", value: product.category });
  if (product.material) features.push({ label: "Material", value: product.material });
  if (product.type) features.push({ label: "Tipo", value: product.type });

  if (/^(set|kit|conjunto|juego)\b/i.test(product.name)) {
    features.push({ label: "Presentación", value: "Set o kit" });
  }

  if (product.rating) {
    features.push({ label: "Valoración", value: `${product.rating} de 5` });
  }

  if (product.tag && features.length < 4) {
    features.push({ label: "Selección", value: product.tag });
  }

  return features.slice(0, 4);
}

export function getProductFromSession(productId) {
  try {
    const storedProduct = sessionStorage.getItem(`sexshop-product-${productId}`);
    return storedProduct ? JSON.parse(storedProduct) : null;
  } catch {
    return null;
  }
}

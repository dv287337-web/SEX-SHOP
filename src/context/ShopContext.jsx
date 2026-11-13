import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback
} from "react";
import { supabase, isSupabaseConfigured } from "../utils/supabase";

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("sexshop-favorites")) || [];
    } catch {
      return [];
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("sexshop-cart")) || [];
    } catch {
      return [];
    }
  });
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [favoritesDrawerOpen, setFavoritesDrawerOpen] = useState(false);
  const [lastAddedId, setLastAddedId] = useState(null);
  const [toasts, setToasts] = useState([]);
  const addButtonRef = useRef(null);
  const favoriteButtonRef = useRef(null);

  // GESTIÓN DE PRODUCTOS PERSONALIZADOS (SUPABASE + LOCALSTORAGE FALLBACK)
  const [customProducts, setCustomProducts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("sexshop-custom-products")) || [];
    } catch {
      return [];
    }
  });
  const [isProductsLoading, setIsProductsLoading] = useState(false);

  // Carga inicial y sincronización con Supabase si está disponible
  const fetchProductsFromSupabase = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) return;
    try {
      setIsProductsLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Supabase fetch warning:", error.message);
        return;
      }

      if (data && Array.isArray(data)) {
        setCustomProducts(data);
        localStorage.setItem("sexshop-custom-products", JSON.stringify(data));
      }
    } catch (err) {
      console.warn("Error cargando productos de Supabase:", err);
    } finally {
      setIsProductsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductsFromSupabase();
  }, [fetchProductsFromSupabase]);

  // Función para agregar producto
  const addCustomProduct = async (productData) => {
    const tempId = `prod-${Date.now()}`;
    const newProduct = {
      ...productData,
      id: tempId,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("products")
          .insert([productData])
          .select()
          .single();

        if (!error && data) {
          setCustomProducts(prev => [data, ...prev]);
          const updated = [data, ...customProducts];
          localStorage.setItem("sexshop-custom-products", JSON.stringify(updated));
          return data;
        }
      } catch (err) {
        console.error("Error guardando en Supabase:", err);
      }
    }

    // Fallback local
    const updated = [newProduct, ...customProducts];
    setCustomProducts(updated);
    localStorage.setItem("sexshop-custom-products", JSON.stringify(updated));
    return newProduct;
  };

  // Función para editar producto
  const updateCustomProduct = async (id, updatedData) => {
    if (isSupabaseConfigured && supabase && typeof id === "number") {
      try {
        const { data, error } = await supabase
          .from("products")
          .update(updatedData)
          .eq("id", id)
          .select()
          .single();

        if (!error && data) {
          setCustomProducts(prev => prev.map(p => p.id === id ? data : p));
          return data;
        }
      } catch (err) {
        console.error("Error actualizando en Supabase:", err);
      }
    }

    // Fallback local
    setCustomProducts(prev => {
      const next = prev.map(p => p.id === id ? { ...p, ...updatedData } : p);
      localStorage.setItem("sexshop-custom-products", JSON.stringify(next));
      return next;
    });
  };

  // Función para eliminar producto
  const deleteCustomProduct = async (id) => {
    if (isSupabaseConfigured && supabase && typeof id === "number") {
      try {
        await supabase.from("products").delete().eq("id", id);
      } catch (err) {
        console.error("Error eliminando en Supabase:", err);
      }
    }

    setCustomProducts(prev => {
      const next = prev.filter(p => p.id !== id);
      localStorage.setItem("sexshop-custom-products", JSON.stringify(next));
      return next;
    });
  };

  const showToast = ({ title, message, type = "info", action = null, duration = 3600 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 7);
    setToasts((prev) => [...prev, { id, title, message, type, action }]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
    return id;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    const handleCustomToast = (event) => {
      if (event.detail) showToast(event.detail);
    };
    window.addEventListener("sexshop-toast", handleCustomToast);
    return () => window.removeEventListener("sexshop-toast", handleCustomToast);
  }, []);

  useEffect(() => {
    const rememberAddButton = (event) => {
      const button = event.target.closest?.(".add-cart-button");
      if (button) addButtonRef.current = button;
      const favoriteButton = event.target.closest?.(".favorite-button");
      if (favoriteButton) favoriteButtonRef.current = favoriteButton;
    };

    document.addEventListener("click", rememberAddButton, true);
    return () => document.removeEventListener("click", rememberAddButton, true);
  }, []);

  const animateCartArrival = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sourceButton = addButtonRef.current;
    const cartButton = document.querySelector(".header-cart-trigger");
    const sourceIcon = sourceButton?.querySelector("svg") || sourceButton;
    const cartIcon = cartButton?.querySelector("svg");
    if (!sourceIcon || !cartIcon) return;

    const source = sourceIcon.getBoundingClientRect();
    const target = cartIcon.getBoundingClientRect();
    const startX = source.left + source.width / 2;
    const startY = source.top + source.height / 2;
    const endX = target.left + target.width / 2;
    const endY = target.top + target.height / 2;
    const spark = document.createElement("span");
    spark.className = "cart-flight-spark";
    spark.textContent = "✦";
    spark.setAttribute("aria-hidden", "true");
    spark.style.left = `${startX - 14}px`;
    spark.style.top = `${startY - 14}px`;
    document.body.appendChild(spark);

    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const flight = spark.animate([
      { transform: "translate(0, 0) scale(.7) rotate(0deg)", opacity: 0 },
      { transform: `translate(${deltaX * 0.42}px, ${deltaY * 0.42 - 24}px) scale(1.25) rotate(150deg)`, opacity: 1, offset: 0.48 },
      { transform: `translate(${deltaX}px, ${deltaY}px) scale(.18) rotate(330deg)`, opacity: 0.1 },
    ], { duration: 1150, easing: "cubic-bezier(.2, .7, .25, 1)" });
    flight.onfinish = () => spark.remove();

    cartButton?.animate([
      { transform: "scale(1)", filter: "drop-shadow(0 0 0 rgb(245 34 118 / 0%))" },
      { transform: "scale(1.22)", filter: "drop-shadow(0 0 9px rgb(245 34 118 / 75%))", offset: 0.55 },
      { transform: "scale(1)", filter: "drop-shadow(0 0 0 rgb(245 34 118 / 0%))" },
    ], { duration: 680, easing: "cubic-bezier(.2, .7, .25, 1)" });
  };

  const animateFavoriteArrival = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sourceIcon = favoriteButtonRef.current?.querySelector("svg");
    const favoritesButton = document.querySelector(".header-favorites-trigger");
    const targetIcon = favoritesButton?.querySelector("svg");
    if (!sourceIcon || !targetIcon) return;

    const source = sourceIcon.getBoundingClientRect();
    const target = targetIcon.getBoundingClientRect();
    const startX = source.left + source.width / 2;
    const startY = source.top + source.height / 2;
    const endX = target.left + target.width / 2;
    const endY = target.top + target.height / 2;
    const heart = document.createElement("span");
    heart.className = "favorite-flight-heart";
    heart.textContent = "♥";
    heart.setAttribute("aria-hidden", "true");
    heart.style.left = `${startX - 14}px`;
    heart.style.top = `${startY - 14}px`;
    document.body.appendChild(heart);

    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const flight = heart.animate([
      { transform: "translate(0, 0) scale(.65) rotate(-15deg)", opacity: 0 },
      { transform: `translate(${deltaX * .42}px, ${deltaY * .42 - 25}px) scale(1.2) rotate(8deg)`, opacity: 1, offset: .48 },
      { transform: `translate(${deltaX}px, ${deltaY}px) scale(.2) rotate(0deg)`, opacity: .15 },
    ], { duration: 1150, easing: "cubic-bezier(.2, .7, .25, 1)" });
    flight.onfinish = () => heart.remove();

    favoritesButton?.animate([
      { transform: "scale(1)", filter: "drop-shadow(0 0 0 rgb(245 34 118 / 0%))" },
      { transform: "scale(1.22)", filter: "drop-shadow(0 0 9px rgb(245 34 118 / 75%))", offset: .55 },
      { transform: "scale(1)", filter: "drop-shadow(0 0 0 rgb(245 34 118 / 0%))" },
    ], { duration: 680, easing: "cubic-bezier(.2, .7, .25, 1)" });
  };

  // Guardar favoritos y carrito en el navegador
  useEffect(() => {
    localStorage.setItem("sexshop-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("sexshop-cart", JSON.stringify(cart));
  }, [cart]);

  // Agregar o quitar favoritos
  const toggleFavorite = (product) => {
    const isAlreadyFavorite = favorites.some((item) => item.id === product.id);
    if (!isAlreadyFavorite) {
      animateFavoriteArrival();
      showToast({
        title: "Añadido a tus favoritos",
        message: product.name,
        type: "success",
      });
    } else {
      showToast({
        title: "Removido de favoritos",
        message: product.name,
        type: "info",
      });
    }
    setFavorites((current) => {
      const exists = current.some((item) => item.id === product.id);

      return exists
        ? current.filter((item) => item.id !== product.id)
        : [...current, product];
    });
  };

  const isFavorite = (productId) => {
    return favorites.some((item) => item.id === productId);
  };

  const removeFavorite = (productId) => {
    setFavorites((current) =>
      current.filter((item) => item.id !== productId)
    );
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  // Agregar productos al carrito
  const addToCart = (product, options = {}) => {
    animateCartArrival();
    setLastAddedId(product.id);
    window.setTimeout(() => setLastAddedId(null), 700);
    setCart((current) => {
      const exists = current.find((item) => item.id === product.id);

      if (exists) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });

    if (!options.silent) {
      showToast({
        title: "Agregado al carrito",
        message: product.name,
        type: "cart",
        action: "cart",
      });
    }
  };

  // Cambiar cantidad
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;

    setCart((current) =>
      current.map((item) =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Eliminar producto del carrito
  const removeFromCart = (productId) => {
    setCart((current) =>
      current.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = {
    favorites,
    toggleFavorite,
    isFavorite,
    removeFavorite,
    clearFavorites,
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotal,
    cartDrawerOpen,
    favoritesDrawerOpen,
    openCartDrawer: () => { setFavoritesDrawerOpen(false); setCartDrawerOpen(true); },
    closeCartDrawer: () => setCartDrawerOpen(false),
    openFavoritesDrawer: () => { setCartDrawerOpen(false); setFavoritesDrawerOpen(true); },
    closeFavoritesDrawer: () => setFavoritesDrawerOpen(false),
    lastAddedId,
    toasts,
    showToast,
    removeToast,
    customProducts,
    addCustomProduct,
    updateCustomProduct,
    deleteCustomProduct,
    refreshProducts: fetchProductsFromSupabase,
    isProductsLoading
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop debe utilizarse dentro de ShopProvider");
  }

  return context;
}

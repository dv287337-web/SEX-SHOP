
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

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

  // Guardar favoritos y carrito en el navegador
  useEffect(() => {
    localStorage.setItem("sexshop-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("sexshop-cart", JSON.stringify(cart));
  }, [cart]);

  // Agregar o quitar favoritos
  const toggleFavorite = (product) => {
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

  // Agregar productos al carrito
  const addToCart = (product) => {
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
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotal
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

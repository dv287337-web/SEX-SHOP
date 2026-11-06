import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, X, ShoppingBag } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function LuxuryToast() {
  const { toasts, removeToast, openCartDrawer } = useShop();

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="toast-viewport"
      style={{
        position: "fixed",
        bottom: "28px",
        right: "24px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "380px",
        width: "calc(100vw - 48px)",
        pointerEvents: "none",
      }}
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="luxury-toast"
            style={{
              pointerEvents: "auto",
              background: "rgba(18, 14, 21, 0.88)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 18px 40px -10px rgba(0, 0, 0, 0.7), 0 0 35px rgba(230, 24, 109, 0.22)",
              borderRadius: "16px",
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              color: "#FAF6F0",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background:
                  toast.type === "cart"
                    ? "linear-gradient(135deg, #E6186D, #8E1044)"
                    : "rgba(255, 255, 255, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                flexShrink: 0,
              }}
            >
              {toast.type === "cart" ? (
                <ShoppingBag size={18} />
              ) : toast.type === "success" ? (
                <Check size={18} />
              ) : (
                <Sparkles size={18} />
              )}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              {toast.title && (
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    color: "#FAF6F0",
                    marginBottom: "2px",
                  }}
                >
                  {toast.title}
                </div>
              )}
              <div
                style={{
                  fontSize: "12px",
                  color: "#C8BFCC",
                  lineHeight: 1.4,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {toast.message}
              </div>
            </div>

            {toast.action === "cart" && (
              <button
                type="button"
                onClick={() => {
                  removeToast(toast.id);
                  openCartDrawer();
                }}
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#FF7AA7",
                  padding: "6px 10px",
                  borderRadius: "8px",
                  background: "rgba(230, 24, 109, 0.15)",
                  border: "1px solid rgba(230, 24, 109, 0.3)",
                  whiteSpace: "nowrap",
                }}
              >
                Ver
              </button>
            )}

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              aria-label="Cerrar notificación"
              style={{
                color: "#8C8090",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px",
                borderRadius: "6px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FAF6F0")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#8C8090")}
            >
              <X size={15} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

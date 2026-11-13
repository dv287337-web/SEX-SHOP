import { useState } from "react";
import { Lock, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Contraseña definida en .env o fallback 'admin123'
    const expectedPassword = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

    setTimeout(() => {
      if (password === expectedPassword) {
        sessionStorage.setItem("sexshop_admin_auth", "true");
        onLogin(true);
      } else {
        setError("Contraseña incorrecta. Intenta nuevamente.");
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="admin-login-screen">
      <motion.div 
        className="admin-login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="admin-login-badge">
          <ShieldCheck size={16} />
          <span>PORTAL ADMINISTRATIVO</span>
        </div>

        <h1 className="admin-login-title">Control & Catálogo</h1>
        <p className="admin-login-subtitle">
          Ingresa con tu clave de acceso para gestionar los productos, imágenes y stock de la boutique.
        </p>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-input-group">
            <label htmlFor="admin-pass">Clave Maestra</label>
            <div className="admin-input-wrapper">
              <Lock size={18} className="admin-input-icon" />
              <input
                id="admin-pass"
                type="password"
                placeholder="Ingresa la contraseña..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                required
              />
            </div>
          </div>

          {error && <div className="admin-login-error">{error}</div>}

          <button 
            type="submit" 
            className="admin-btn admin-btn--primary admin-btn--full"
            disabled={loading}
          >
            {loading ? "Verificando..." : (
              <>
                Acceder al Panel
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="admin-login-hint">
          <Sparkles size={14} />
          <span>Acceso privado exclusivo para la administración de la tienda</span>
        </div>
      </motion.div>
    </div>
  );
}

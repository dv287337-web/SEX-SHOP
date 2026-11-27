import { useState } from "react";
import {
  UserRound,
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useShop } from "../../context/ShopContext";
import { isSupabaseConfigured, supabase } from "../../utils/supabase";
import accountImage from "../../assets/account-login.jpg";

function MiCuenta() {
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { showToast } = useShop();

  const handleGoogleLogin = async () => {
    if (!isSupabaseConfigured || !supabase) {
      showToast({
        title: "Acceso con Google",
        message: "Configura Supabase para habilitar el inicio de sesión con Google.",
        type: "info",
      });
      return;
    }

    try {
      setIsGoogleLoading(true);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/mi-cuenta`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error iniciando sesión con Google:", error);
      const isProviderDisabled =
        error?.code === "validation_failed" &&
        /provider is not enabled/i.test(error?.message || "");

      showToast({
        title: "No se pudo iniciar sesión",
        message: isProviderDisabled
          ? "Google aún no está habilitado en Supabase. Actívalo desde Authentication > Providers > Google."
          : error.message || "Inténtalo nuevamente en unos segundos.",
        type: "error",
      });
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    showToast({
      title: "Cuenta de usuario",
      message: "Próximamente habilitaremos el inicio de sesión y registro.",
      type: "info",
    });
  };

  return (
    <section className="account-page">
      <div className="account-container">
        <div className="account-decoration">
          <img className="account-decoration-image" src={accountImage} alt="Detalle editorial de bienestar íntimo" />
          <div className="account-decoration-overlay" />
          <div className="account-decoration-content">
            <h2>Tu placer, <span>sin límites.</span></h2>
          </div>
        </div>

        <div className="account-form-container">
          <div className="account-heading">
            <div className="account-icon">
              <UserRound size={27} />
            </div>

            <span className="account-eyebrow">TU ESPACIO PERSONAL</span>
            <h1>Bienvenido de nuevo</h1>
            <p>Accede a tu cuenta para consultar tus pedidos, favoritos y beneficios.</p>
          </div>

          <button
            type="button"
            className="account-google-button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            aria-busy={isGoogleLoading}
          >
            <span className="account-google-mark">G</span>
            {isGoogleLoading ? "Conectando con Google..." : "Continuar con Google"}
          </button>

          <div className="account-divider"><span>o continúa con tu correo</span></div>

          <form className="account-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Correo electrónico</label>

            <div className="account-input">
              <Mail size={19} />
              <input
                id="email"
                type="email"
                placeholder="tucorreo@ejemplo.com"
                required
              />
            </div>

            <label htmlFor="password">Contraseña</label>

            <div className="account-input">
              <LockKeyhole size={19} />
              <input
                id="password"
                type={mostrarPassword ? "text" : "password"}
                placeholder="Ingresa tu contraseña"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {mostrarPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>

            <div className="account-options">
              <label className="remember-option">
                <input type="checkbox" />
                Recordarme
              </label>

              <button
                type="button"
                className="forgot-password"
                onClick={() =>
                  showToast({
                    title: "Recuperación de contraseña",
                    message: "Próximamente habilitaremos la recuperación de acceso.",
                    type: "info",
                  })
                }
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button type="submit" className="account-submit">
              Entrar a mi cuenta <ArrowRight size={17} />
            </button>
          </form>

          <div className="account-register">
            <p>¿Es tu primera visita?</p>
            <button
              type="button"
              onClick={() =>
                showToast({
                  title: "Registro de clientes",
                  message: "Próximamente habilitaremos el registro de nuevas cuentas.",
                  type: "info",
                })
              }
            >
              Crear una cuenta
            </button>
          </div>

          <div className="account-footer">
            <ShieldCheck size={16} />
            <span>Compra segura · Envíos discretos · Privacidad protegida</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MiCuenta;

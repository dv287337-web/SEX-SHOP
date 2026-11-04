
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserRound, LockKeyhole, Mail, Eye, EyeOff, ShieldCheck } from "lucide-react";

function MiCuenta() {
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Próximamente habilitaremos el inicio de sesión.");
  };

  return (
    <section className="account-page">
      <div className="account-container">

        <div className="account-decoration">
          <span className="account-decoration-icon">♥</span>
          <h2>Bienvenido a <span>SexShop</span></h2>
          <p>
            Un espacio pensado para descubrir, disfrutar
            y vivir tu experiencia con total confianza.
          </p>

          <div className="account-security">
            <ShieldCheck size={20} />
            <span>Tu privacidad es nuestra prioridad</span>
          </div>
        </div>

        <div className="account-form-container">
          <div className="account-heading">
            <div className="account-icon">
              <UserRound size={27} />
            </div>

            <span className="account-eyebrow">TU ESPACIO PERSONAL</span>
            <h1>Iniciar sesión</h1>
            <p>Ingresa tus credenciales para continuar.</p>
          </div>

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
                onClick={() => alert("Próximamente habilitaremos esta opción.")}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button type="submit" className="account-submit">
              INICIAR SESIÓN
            </button>
          </form>

          <div className="account-register">
            <p>¿Aún no tienes una cuenta?</p>
            <button
              type="button"
              onClick={() => alert("Próximamente habilitaremos el registro.")}
            >
              Regístrate aquí
            </button>
          </div>

          <div className="account-footer">
            <ShieldCheck size={16} />
            <span>Compra con confianza y discreción</span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default MiCuenta;

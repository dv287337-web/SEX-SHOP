import { useEffect, useState } from "react";
import {
  UserRound,
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  LogOut,
} from "lucide-react";
import { useShop } from "../../context/ShopContext";
import { isSupabaseConfigured, supabase } from "../../utils/supabase";
import accountImage from "../../assets/account-login.jpg";

function MiCuenta() {
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [session, setSession] = useState(null);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { showToast } = useShop();

  useEffect(() => {
    if (!supabase) return undefined;

    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (isMounted) setSession(data.session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (!isMounted) return;

      setSession(nextSession);

       if (event === "SIGNED_IN") {
         showToast({
           title: "Inicio de sesión exitoso",
           message: "Tu cuenta se vinculó correctamente.",
           type: "success",
         });
      }
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

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

  const handleSignOut = async () => {
    if (!supabase) return;

    try {
      setIsSigningOut(true);
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      setSession(null);
      showToast({
        title: "Sesión cerrada",
        message: "Has salido de tu cuenta correctamente.",
        type: "info",
      });
    } catch (error) {
      showToast({
        title: "No se pudo cerrar sesión",
        message: error.message || "Inténtalo nuevamente.",
        type: "error",
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleEmailAuth = async (event) => {
    event.preventDefault();

    if (!isSupabaseConfigured || !supabase) {
      showToast({
        title: "Cuenta por correo",
        message: "Configura Supabase para habilitar el acceso con correo y contraseña.",
        type: "info",
      });
      return;
    }

    if (isRegistering && password !== passwordConfirmation) {
      showToast({
        title: "Las contraseñas no coinciden",
        message: "Revisa ambos campos e inténtalo nuevamente.",
        type: "error",
      });
      return;
    }

    try {
      setIsEmailLoading(true);

      if (isRegistering) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: fullName.trim(),
            },
            emailRedirectTo: `${window.location.origin}/mi-cuenta`,
          },
        });

        if (error) throw error;

        if (data.session) {
          showToast({
            title: "Cuenta creada",
            message: "Tu cuenta ya está activa. Bienvenido a SexShop.",
            type: "success",
          });
        } else {
          showToast({
            title: "Revisa tu correo",
            message: "Te enviamos un enlace para confirmar tu cuenta antes de ingresar.",
            type: "info",
          });
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) throw error;
      }
    } catch (error) {
      console.error("Error en autenticación por correo:", error);
      showToast({
        title: isRegistering ? "No se pudo crear la cuenta" : "No se pudo iniciar sesión",
        message: error.message || "Verifica tus datos e inténtalo nuevamente.",
        type: "error",
      });
    } finally {
      setIsEmailLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      showToast({
        title: "Ingresa tu correo",
        message: "Escribe tu correo electrónico para enviarte el enlace de recuperación.",
        type: "info",
      });
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      showToast({
        title: "Recuperación de contraseña",
        message: "Configura Supabase para habilitar la recuperación de acceso.",
        type: "info",
      });
      return;
    }

    try {
      setIsResetLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/mi-cuenta`,
      });

      if (error) throw error;

      showToast({
        title: "Revisa tu correo",
        message: "Te enviamos un enlace para crear una nueva contraseña.",
        type: "success",
      });
    } catch (error) {
      showToast({
        title: "No se pudo enviar el enlace",
        message: error.message || "Inténtalo nuevamente.",
        type: "error",
      });
    } finally {
      setIsResetLoading(false);
    }
  };

  const profileName =
    session?.user?.user_metadata?.full_name ||
    session?.user?.user_metadata?.name ||
    session?.user?.email?.split("@")[0] ||
    "bienvenido";
  const profileAvatar =
    session?.user?.user_metadata?.avatar_url ||
    session?.user?.user_metadata?.picture ||
    "";

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
             <h1>{isRegistering ? "Crea tu cuenta" : "Bienvenido de nuevo"}</h1>
             <p>
               {isRegistering
                 ? "Regístrate para consultar tus pedidos, favoritos y beneficios."
                 : "Accede a tu cuenta para consultar tus pedidos, favoritos y beneficios."}
             </p>
          </div>

          {session ? (
            <div className="account-signed-in">
              <div className="account-profile-avatar">
                {profileAvatar ? (
                  <img src={profileAvatar} alt={`Foto de perfil de ${profileName}`} />
                ) : (
                  <UserRound size={28} />
                )}
                <span className="account-profile-online" aria-label="Cuenta activa" />
              </div>
              <span className="account-signed-in-badge">CUENTA CONECTADA</span>
              <h2>
                Hola, <span>{profileName}</span>
              </h2>
              <p className="account-profile-email">{session.user.email}</p>
              <div className="account-profile-divider" />
              <div className="account-signed-in-status">
                <ShieldCheck size={15} />
                <span>Tu cuenta está protegida y lista para disfrutar.</span>
              </div>
              <button
                type="button"
                className="account-signout-button"
                onClick={handleSignOut}
                disabled={isSigningOut}
              >
                <LogOut size={16} />
                {isSigningOut ? "Cerrando sesión..." : "Cerrar sesión"}
              </button>
            </div>
          ) : (
            <>
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

              <form className="account-form" onSubmit={handleEmailAuth}>
                {isRegistering && (
                  <>
                    <label htmlFor="full-name">Nombre completo</label>

                    <div className="account-input">
                      <UserRound size={19} />
                      <input
                        id="full-name"
                        type="text"
                        placeholder="Tu nombre"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        autoComplete="name"
                        required
                      />
                    </div>
                  </>
                )}

                <label htmlFor="email">Correo electrónico</label>

                <div className="account-input">
                  <Mail size={19} />
                  <input
                    id="email"
                    type="email"
                    placeholder="tucorreo@ejemplo.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
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
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete={isRegistering ? "new-password" : "current-password"}
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

                {isRegistering ? (
                  <>
                    <label htmlFor="password-confirmation">Confirmar contraseña</label>

                    <div className="account-input">
                      <LockKeyhole size={19} />
                      <input
                        id="password-confirmation"
                        type={mostrarPassword ? "text" : "password"}
                        placeholder="Repite tu contraseña"
                        value={passwordConfirmation}
                        onChange={(event) => setPasswordConfirmation(event.target.value)}
                        autoComplete="new-password"
                        required
                      />
                    </div>
                  </>
                ) : (
                  <div className="account-options">
                    <label className="remember-option">
                      <input type="checkbox" />
                      Recordarme
                    </label>

                    <button
                      type="button"
                      className="forgot-password"
                      onClick={handleForgotPassword}
                      disabled={isResetLoading}
                    >
                      {isResetLoading ? "Enviando enlace..." : "¿Olvidaste tu contraseña?"}
                    </button>
                  </div>
                )}

                <button type="submit" className="account-submit" disabled={isEmailLoading}>
                  {isEmailLoading
                    ? (isRegistering ? "Creando cuenta..." : "Ingresando...")
                    : (isRegistering ? "Crear mi cuenta" : "Entrar a mi cuenta")}
                  {!isEmailLoading && <ArrowRight size={17} />}
                </button>
              </form>

              <div className="account-register">
                <p>¿Es tu primera visita?</p>
                <button
                  type="button"
                  onClick={() => setIsRegistering((current) => !current)}
                >
                  {isRegistering ? "Volver a iniciar sesión" : "Crear una cuenta"}
                </button>
              </div>
            </>
          )}

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

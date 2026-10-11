import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import "./Login.css";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.target);

    axios
      .post(`${import.meta.env.VITE_API_URL}login.php`, {
        email: form.get("email"),
        password: form.get("password")
      })
      .then((response) => {
        sessionStorage.setItem("access_token", response.data.jwt);
        sessionStorage.setItem("userdata", response.data.data);
        window.location.href='./dashboard';
      })
      .catch(() => {
        setMessage("An error occurred while creating your account. Please try again.");
      });

  }

  return (
    <main className="login-page">
      <section className="login-layout" aria-label="Sign in">
        <aside className="login-welcome">
          <a className="login-brand" href="/" aria-label="Inventory home">
            <span className="login-brand-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none">
                <path d="M5 10.5 16 5l11 5.5v11L16 27 5 21.5v-11Z" />
                <path d="m5.5 10.8 10.5 5.3 10.5-5.3M16 16v10.5M10.5 8l11 5.5" />
              </svg>
            </span>
            <span>Stockroom</span>
          </a>

          <div className="login-welcome-copy">
            <span className="login-eyebrow">YOUR INVENTORY, IN SYNC</span>
            <h1>Good things happen when everything&apos;s in its place.</h1>
            <p>
              A clearer view of your stock starts here. Sign in to keep your
              team and inventory moving together.
            </p>
          </div>

          <div className="login-art" aria-hidden="true">
            <div className="login-art-glow" />
            <div className="login-art-card login-art-card-back">
              <span className="login-art-line login-art-line-short" />
              <span className="login-art-line" />
              <span className="login-art-line login-art-line-medium" />
            </div>
            <div className="login-art-card login-art-card-front">
              <div className="login-art-card-heading">
                <span className="login-art-box-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="m3.75 7.5 8.25-4.25 8.25 4.25v9L12 20.75 3.75 16.5v-9Z" />
                    <path d="m4 7.65 8 4.1 8-4.1M12 11.75v8.5" />
                  </svg>
                </span>
                <span className="login-art-menu">•••</span>
              </div>
              <span className="login-art-label">TOTAL ITEMS</span>
              <strong>2,480</strong>
              <div className="login-art-foot">
                <span className="login-art-dot" />
                All systems looking good
              </div>
              <div className="login-art-chart">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="login-art-badge">
              <span className="login-art-check" aria-hidden="true">✓</span>
              <span>
                <strong>In good shape</strong>
                <small>Stock levels updated</small>
              </span>
            </div>
          </div>

          <p className="login-quote">
            “Finally, everything we need to know at a glance.”
            <span>— A happier, more organized team</span>
          </p>
        </aside>

        <section className="login-form-panel">
          <div className="login-form-wrap">
            <div className="login-mobile-brand" aria-hidden="true">
              <span className="login-brand-mark">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M5 10.5 16 5l11 5.5v11L16 27 5 21.5v-11Z" />
                  <path d="m5.5 10.8 10.5 5.3 10.5-5.3M16 16v10.5M10.5 8l11 5.5" />
                </svg>
              </span>
              <span>Stockroom</span>
            </div>

            <span className="login-form-eyebrow">WELCOME BACK</span>
            <h2>Sign in to your account</h2>
            <p className="login-form-intro">
              Pick up right where you left off.
            </p>

            <form className="login-form" onSubmit={handleSubmit}>
              <label htmlFor="login-email">Email address</label>
              <div className="login-input-wrap">
                <svg className="login-input-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <rect x="2.5" y="4" width="15" height="12" rx="2" />
                  <path d="m3.5 5.5 6.5 5 6.5-5" />
                </svg>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="login-password-label">
                <label htmlFor="login-password">Password</label>
                <button
                  className="login-text-button"
                  type="button"
                  onClick={() => setMessage("Please contact your administrator to reset your password.")}
                >
                  Forgot password?
                </button>
              </div>
              <div className="login-input-wrap">
                <svg className="login-input-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <rect x="3.5" y="8.5" width="13" height="9" rx="2" />
                  <path d="M6.5 8.5V6a3.5 3.5 0 0 1 7 0v2.5M10 12v2" />
                </svg>
                <input
                  id="login-password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  className="login-visibility-button"
                  type="button"
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
                  aria-pressed={passwordVisible}
                  onClick={() => setPasswordVisible((visible) => !visible)}
                >
                  {passwordVisible ? (
                    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M2 10s2.8-5 8-5 8 5 8 5-2.8 5-8 5-8-5-8-5Z" />
                      <circle cx="10" cy="10" r="2" />
                      <path d="m3 3 14 14" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M2 10s2.8-5 8-5 8 5 8 5-2.8 5-8 5-8-5-8-5Z" />
                      <circle cx="10" cy="10" r="2" />
                    </svg>
                  )}
                </button>
              </div>

              <label className="login-remember">
                <input type="checkbox" name="remember" />
                <span className="login-custom-checkbox" aria-hidden="true" />
                <span>Keep me signed in</span>
              </label>

              <button className="login-submit" type="submit">
                Sign in
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 10h12M10 4l6 6-6 6" />
                </svg>
              </button>
              <p className="login-status" role="status" aria-live="polite">
                {message}
              </p>
            </form>

            <div className="login-help">
              <span className="login-help-icon" aria-hidden="true">?</span>
              <span>
                New to Stockroom?{" "}
                <Link className="login-text-button" to="/register">
                  Create an account
                </Link>
              </span>
            </div>
          </div>

          <footer className="login-footer">
            <span>© Stockroom</span>
            <span className="login-footer-secure">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="3" y="7" width="10" height="7" rx="1.5" />
                <path d="M5.5 7V4.5a2.5 2.5 0 0 1 5 0V7" />
              </svg>
              Secure sign in
            </span>
          </footer>
        </section>
      </section>
    </main>
  );
}

export default Login;

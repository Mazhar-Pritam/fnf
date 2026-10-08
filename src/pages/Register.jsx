import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import "./Login.css";
import "./Register.css";

function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.target);
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");

    if (password !== confirmPassword) {
      setMessage("Your passwords do not match. Please try again.");
      form.elements.confirmPassword.focus();
      return;
    }

    axios
      .post(`${import.meta.env.VITE_API_URL}register.php`, {
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password")
      })
      .then(() => {
        setMessage("Account created successfully. You can now sign in.");
      })
      .catch(() => {
        setMessage("An error occurred while creating your account. Please try again.");
      });
  }

  return (
    <main className="login-page register-page">
      <section className="login-layout" aria-label="Create an account">
        <aside className="login-welcome register-welcome">
          <Link className="login-brand" to="/" aria-label="Stockroom home">
            <span className="login-brand-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none">
                <path d="M5 10.5 16 5l11 5.5v11L16 27 5 21.5v-11Z" />
                <path d="m5.5 10.8 10.5 5.3 10.5-5.3M16 16v10.5M10.5 8l11 5.5" />
              </svg>
            </span>
            <span>Stockroom</span>
          </Link>

          <div className="login-welcome-copy">
            <span className="login-eyebrow">A BETTER WAY TO KEEP TRACK</span>
            <h1>Make room for a little more organized.</h1>
            <p>
              Bring your inventory, suppliers, and team into one clear,
              easy-to-manage space.
            </p>
          </div>

          <div className="register-highlights">
            <div className="register-highlight">
              <span className="register-highlight-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 19V5m0 14h16M8 15l3-4 3 2 5-7" />
                  <path d="M16 6h3v3" />
                </svg>
              </span>
              <span>
                <strong>See the full picture</strong>
                <small>Know what you have and what needs attention.</small>
              </span>
            </div>
            <div className="register-highlight">
              <span className="register-highlight-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="9" cy="8" r="3" />
                  <path d="M3.5 19v-1.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.5 4.5V19M16 5.5a3 3 0 0 1 0 5.8m2 2.2a4.5 4.5 0 0 1 2.5 4v1.5" />
                </svg>
              </span>
              <span>
                <strong>Keep everyone in sync</strong>
                <small>Give your team one place to stay up to date.</small>
              </span>
            </div>
          </div>

          <p className="login-quote">
            Less searching. More getting things done.
            <span>Your inventory workspace starts here.</span>
          </p>
        </aside>

        <section className="login-form-panel register-panel">
          <div className="login-form-wrap register-form-wrap">
            <Link className="login-mobile-brand" to="/" aria-label="Stockroom home">
              <span className="login-brand-mark" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M5 10.5 16 5l11 5.5v11L16 27 5 21.5v-11Z" />
                  <path d="m5.5 10.8 10.5 5.3 10.5-5.3M16 16v10.5M10.5 8l11 5.5" />
                </svg>
              </span>
              <span>Stockroom</span>
            </Link>

            <span className="login-form-eyebrow">GET STARTED</span>
            <h2>Create your account</h2>
            <p className="login-form-intro">
              Set up your space and bring your inventory together.
            </p>

            <form className="login-form register-form" onSubmit={handleSubmit}>
              <label htmlFor="register-name">Full name</label>
              <div className="login-input-wrap">
                <svg className="login-input-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="6.25" r="3" />
                  <path d="M3.5 17v-1.25A4.25 4.25 0 0 1 7.75 11.5h4.5a4.25 4.25 0 0 1 4.25 4.25V17" />
                </svg>
                <input
                  id="register-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  minLength={2}
                  required
                />
              </div>

              <label className="register-field-label" htmlFor="register-email">
                Email address
              </label>
              <div className="login-input-wrap">
                <svg className="login-input-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <rect x="2.5" y="4" width="15" height="12" rx="2" />
                  <path d="m3.5 5.5 6.5 5 6.5-5" />
                </svg>
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  required
                />
              </div>

              <label className="register-field-label" htmlFor="register-password">
                Password
              </label>
              <div className="login-input-wrap">
                <svg className="login-input-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <rect x="3.5" y="8.5" width="13" height="9" rx="2" />
                  <path d="M6.5 8.5V6a3.5 3.5 0 0 1 7 0v2.5M10 12v2" />
                </svg>
                <input
                  id="register-password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
                <button
                  className="login-visibility-button"
                  type="button"
                  aria-label={passwordVisible ? "Hide passwords" : "Show passwords"}
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

              <label className="register-field-label" htmlFor="register-confirm-password">
                Confirm password
              </label>
              <div className="login-input-wrap">
                <svg className="login-input-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <rect x="3.5" y="8.5" width="13" height="9" rx="2" />
                  <path d="M6.5 8.5V6a3.5 3.5 0 0 1 7 0v2.5M10 12v2" />
                </svg>
                <input
                  id="register-confirm-password"
                  name="confirmPassword"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>

              <button className="login-submit register-submit" type="submit">
                Create account
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 10h12M10 4l6 6-6 6" />
                </svg>
              </button>
              <p className="login-status" role="status" aria-live="polite">
                {message}
              </p>
            </form>

            <div className="login-help register-login-link">
              <span>Already have an account?</span>
              <Link className="login-text-button" to="/login">Sign in</Link>
            </div>
          </div>

          <footer className="login-footer">
            <span>© Stockroom</span>
            <span className="login-footer-secure">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="3" y="7" width="10" height="7" rx="1.5" />
                <path d="M5.5 7V4.5a2.5 2.5 0 0 1 5 0V7" />
              </svg>
              Secure sign up
            </span>
          </footer>
        </section>
      </section>
    </main>
  );
}

export default Register;

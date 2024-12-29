import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h1 style={styles.heading}>Welcome Back</h1>
        <p style={styles.subHeading}>Please log in to continue</p>
        <form style={styles.form} onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                style={styles.toggleButton}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div style={styles.options}>
            <label style={styles.checkboxContainer}>
              <input type="checkbox" style={styles.checkbox} />
              <span style={styles.checkboxLabel}>Remember me</span>
            </label>
            <a href="/forgot-password" style={styles.forgotLink}>
              Forgot Password?
            </a>
          </div>
          <button type="submit" style={styles.button}>
            Log In
          </button>
        </form>
        <p style={styles.footerText}>
          Don't have an account?{" "}
          <a href="/signup" style={styles.signupLink}>
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#171717",
    color: "#fff",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    padding: "20px",
  },
  loginBox: {
    backgroundColor: "#1c1c1c",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
    width: "100%",
    maxWidth: "500px", // Adjusted for desktop
    textAlign: "center",
  },
  heading: {
    fontSize: "2.5rem", // Increased size for desktop
    marginBottom: "10px",
  },
  subHeading: {
    fontSize: "1rem",
    color: "#aaa",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "1rem", // Adjusted size for readability
    color: "#ccc",
  },
  input: {
    width: "100%",
    padding: "12px", // Increased padding for better desktop experience
    borderRadius: "5px",
    border: "none",
    outline: "none",
    backgroundColor: "#2a2a2a",
    color: "#fff",
    fontSize: "1rem",
  },
  passwordWrapper: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  toggleButton: {
    position: "absolute",
    right: "10px",
    padding: "5px",
    backgroundColor: "transparent",
    color: "#aaa",
    border: "none",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  options: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "1rem",
    color: "#ccc",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
  },
  checkbox: {
    marginRight: "10px",
  },
  checkboxLabel: {
    fontSize: "1rem",
    color: "#ccc",
  },
  forgotLink: {
    color: "#3b82f6",
    textDecoration: "none",
  },
  button: {
    padding: "12px",
    borderRadius: "5px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    fontSize: "1.2rem", // Larger button text for desktop
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  footerText: {
    marginTop: "20px",
    fontSize: "1rem", // Adjusted for readability
    color: "#ccc",
  },
  signupLink: {
    color: "#3b82f6",
    textDecoration: "none",
  },
};

export default Login;

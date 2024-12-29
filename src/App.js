import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import SignupPage from "./pages/signup";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/analytics";
import ContentManager from "./pages/ContentManager"; // Import the Content Manager page
import CreatePost from "./pages/createpost"; // Import Create Post page
import Settings from "./pages/Settings"; // Import the Settings page
import TeamCollaboration from "./pages/TeamCollaboration";

const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div style={loadingContainerStyles}>
        <div className="spinner" style={spinnerStyles}></div>
        <p style={loadingTextStyles}>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Default Redirect */}
        <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />

        {/* Authentication Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/analytics"
          element={isLoggedIn ? <Analytics /> : <Navigate to="/login" />}
        />
        <Route
          path="/content-manager"
          element={isLoggedIn ? <ContentManager /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-post"
          element={isLoggedIn ? <CreatePost /> : <Navigate to="/login" />}
        />
        
        <Route
          path="/Team-Collaboration"
          element={isLoggedIn ? <TeamCollaboration /> : <Navigate to="/login" />}
        />

        {/* Settings Page */}
        <Route
          path="/settings"
          element={isLoggedIn ? <Settings /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

// Styles
const loadingContainerStyles = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#171717",
  color: "#ffffff",
  fontFamily: "Arial, sans-serif",
};

const loadingTextStyles = {
  textAlign: "center",
  marginTop: "10px",
};

const spinnerStyles = {
  width: "40px",
  height: "40px",
  border: "4px solid rgba(255, 255, 255, 0.3)",
  borderTop: "4px solid #ffffff",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import About from "./pages/About";
import "./App.scss";

function App() {
  const [tempScale, setTempScale] = useState("Celsius");
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("en");

  const handleTempScaleChange = (scale) => {
    setTempScale(scale);
  };

  const handleDarkModeChange = (isDarkMode) => {
    setDarkMode(isDarkMode);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/weather-app">Home</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                tempScale={tempScale}
                darkMode={darkMode}
                language={language}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <Settings
                onTempScaleChange={handleTempScaleChange}
                onDarkModeChange={handleDarkModeChange}
                onLanguageChange={handleLanguageChange}
                darkMode={darkMode}
                tempScale={tempScale}
                language={language}
              />
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

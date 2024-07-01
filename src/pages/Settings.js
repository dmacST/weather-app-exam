import React, { useState, useEffect } from "react";
import "../App.scss";

const Settings = ({
  onTempScaleChange,
  onDarkModeChange,
  onLanguageChange,
  darkMode: initialDarkMode,
  tempScale: initialTempScale,
  language: initialLanguage,
}) => {
  const [darkMode, setDarkMode] = useState(
    () => JSON.parse(localStorage.getItem("darkMode")) ?? initialDarkMode
  );
  const [tempScale, setTempScale] = useState(
    () => localStorage.getItem("tempScale") ?? initialTempScale
  );
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") ?? initialLanguage
  );

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("tempScale", tempScale);
  }, [tempScale]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const handleTempScaleChange = (e) => {
    const value = e.target.value;
    setTempScale(value);
    onTempScaleChange(value);
  };

  const handleDarkModeChange = (e) => {
    const checked = e.target.checked;
    setDarkMode(checked);
    onDarkModeChange(checked);
  };

  const handleLanguageChange = (e) => {
    const value = e.target.value;
    setLanguage(value);
    onLanguageChange(value);
  };

  return (
    <div
      className={`w-full h-screen ${
        darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-gradientBg-light to-gradientBg-dark"
      } flex flex-col items-center justify-center px-4 lg:px-0`}
    >
      <div
        className={`w-full max-w-[450px] bg-black/20 min-h-[500px] backdrop-blur-[32px] rounded-[32px] py-12 px-6 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        <div className="mb-4">
          <label
            className={`${darkMode ? "text-white" : "text-gray-800"} mr-2`}
          >
            Temperature Scale:
          </label>
          <select
            value={tempScale}
            onChange={handleTempScaleChange}
            className="bg-gray-200 p-2 rounded"
          >
            <option value="Celsius">Celsius</option>
            <option value="Fahrenheit">Fahrenheit</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className={`${darkMode ? "text-white" : "text-gray-800"} mr-2`}
          >
            Dark Mode:
          </label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={handleDarkModeChange}
          />
        </div>
        <div className="mb-4">
          <label
            className={`${darkMode ? "text-white" : "text-gray-800"} mr-2`}
          >
            Language:
          </label>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-gray-200 p-2 rounded"
          >
            <option value="en">English</option>
            <option value="ge">Georgian</option>
          </select>
        </div>
      </div>
      <div className="hidden">
        this text only appears in light mode: i wanted to make spotify app, but
        there was just not much time
      </div>
    </div>
  );
};

export default Settings;

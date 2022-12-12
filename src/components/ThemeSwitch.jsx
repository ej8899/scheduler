
import React, { useEffect, useRef, useState, useContext } from "react";
import { ThemeContext } from './ThemeContext.jsx';
import './Application.scss';
import './ThemeSwitch.scss';

function ThemeSwitch() {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = () => {
    const isCurrentDark = theme === 'dark';
    setTheme(isCurrentDark ? 'light' : 'dark');
    localStorage.setItem('theme', isCurrentDark ? 'light' : 'dark');
  };

  return (
    <div>
      <label>{theme === "light" ? "Currently Light Mode" : "Currently Dark Mode"}</label>
      <div className="toggle-btn-section">
        <div className={`toggle-checkbox m-vertical-auto`}>
          <input
            className="toggle-btn__input"
            type="checkbox"
            name="checkbox"
            onChange={handleThemeChange}
            checked={theme === 'light'}
          />
          <button type="button" className={`toggle-btn__input-label`} onClick={handleThemeChange}></button>
        </div>
      </div>
    </div>
  );
};
export default ThemeSwitch;
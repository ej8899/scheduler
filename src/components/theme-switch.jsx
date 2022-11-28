
import React, { useEffect, useRef, useState, useContext } from "react";
import { ThemeContext } from './theme-context.ts';
import './Application.scss';


function ThemeSwitch() {
  const { theme, setTheme } = useContext(ThemeContext);
  const handleThemeChange = () => {
    const isCurrentDark = theme === 'dark';
    setTheme(isCurrentDark ? 'light' : 'dark');
  };

  return (
    <header className="header">
    <div className="header-content">
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
  </header>
  );
};
export default ThemeSwitch;
import React, { useEffect, useRef, useState, useContext } from "react";
import HourSwitch from "./HourSwitch";
import ThemeSwitch from "./ThemeSwitch";

import './NavBar.scss';
function NavBar(props) {
  
  return (
  <nav className="navbar-main">
  <span>this is the nav bar</span> <span><ThemeSwitch/></span>
  </nav>
  );
};
export default NavBar;
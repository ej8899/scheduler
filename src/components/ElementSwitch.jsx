import React, { useEffect, useRef, useState, useContext } from "react";
import './ThemeSwitch.scss';

function ElementSwitch(props) {
  console.log("SWITCH PROPS:",props)
  return (
    <div>
      <label>{props.label}</label>
      <div className="toggle-btn-section">
        <div className={`toggle-checkbox m-vertical-auto`}>
          <input
            className="toggle-btn__input"
            type="checkbox"
            name="checkbox"
            onChange={props.onChange}
            checked={props.checkedValue}
          />
          <button type="button" className={`toggle-btn__input-label`} onClick={props.onChange}></button>
        </div>
      </div>
    </div>
  );
};
export default ElementSwitch;
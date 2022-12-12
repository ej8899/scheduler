import { alternatives } from "joi";
import React, { useEffect, useRef, useState, useContext } from "react";
import ElementSwitch from "./ElementSwitch";
import './ThemeSwitch.scss';


function HourSwitch() {
  const [ hourTheme, setHourTheme ] = useState('24');

  const handleHourChange = () => {
    const isCurrentHour = hourTheme === '24';
    setHourTheme(isCurrentHour ? '12' : '24');
    console.log("SWITCHED:",hourTheme);
    global.config.timeClock = +hourTheme;
  };

  return (
    <div>
    <label>{hourTheme + " hour time"}</label>
    <div className="toggle-btn-section">
      <div className={`toggle-checkbox m-vertical-auto`}>
        <input
          className="toggle-btn__input"
          type="checkbox"
          name="checkbox"
          onChange={handleHourChange}
          checked={hourTheme === '12'}
        />
        <button type="button" className={`toggle-btn__input-label`} onClick={handleHourChange}></button>
      </div>
    </div>
  </div>
  );
};
export default HourSwitch;




// function HourSwitch(props) {
//   const [ hourTheme, setHourTheme ] = useState('12');

//   const handleHourChange = () => {
//     const isCurrentHour = hourTheme === '24';
//     setHourTheme(isCurrentHour ? '12' : '24');
//     console.log("SWITCHED:",hourTheme)
//   };

//   return (
//     <ElementSwitch label={hourTheme + " hour time"} onChange={handleHourChange} checked={hourTheme === '12'} />
//   );
// };
// export default HourSwitch;
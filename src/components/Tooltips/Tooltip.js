import React, { useState, useEffect } from "react";
import "./Tooltip.scss";
import config from "config";

// original tooltipcode:
// https://paladini.dev/posts/how-to-make-an-extremely-reusable-tooltip-component-with-react--and-nothing-else/

// usage: <Tooltip content="Visit our GitHub profile" direction="right" delay="400">item to add tip to</Tooltip>
// content - text, jsx, etc.
// direction - top, bottom, left, right
// delay  - how long until tooltip shows up
// styles - any changes in styles
// ex: {"--tooltip-text-color": "black",
// "--tooltip-background-color": "orange"};

function Tooltip(props) {
  let styleUpdates = { visibility: "hidden" };
  let timeout;
  const mouseHoverDelay = 400; // how long for mouse hover over item until tooltip is rendered
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || mouseHoverDelay);
  };

  const hideTip = () => {
    clearInterval(timeout);
    //await new Promise(r => setTimeout(r, 300)); // this was to initiate a way to 'fade out' the tool tip still a consideration for use
    setActive(false);
  };

  
  return (
    <div
      className="Tooltip-Wrapper"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
      onClick={hideTip}
    >
      {/* Wrapping */}
      {props.children}

      {/* in style we had visibility: active ? 'visible' : 'hidden' this worked, but 'not quite' */}
      {active && (
        <div
          className={`Tooltip-Tip ${props.direction || "top"}`}
          style={{ ...props.styles }}
        >
          {props.content}
        </div>
      )}
    </div>
  );
}

export function tooltipUpdator(stateFunction, currState, newData) {
  stateFunction(currState => { return {...currState, ...newData }});
};

export default Tooltip;

import React, { useState } from "react";
import "./Tooltip.scss";

// original tooltipcode:
// https://paladini.dev/posts/how-to-make-an-extremely-reusable-tooltip-component-with-react--and-nothing-else/


// usage: <Tooltip content="Visit our GitHub profile" direction="right" delay="400">item to add tip to</Tooltip>
// content - text, jsx, etc.
// direction - top, bottom, left, right
// delay  - how long until tooltip shows up
// styles - any changes in styles
// ex: {"--tooltip-text-color": "black",
// "--tooltip-background-color": "orange"};

const Tooltip = (props) => {
  let timeout;
  let styleUpdates = {...props.styles};
  const mouseHoverDelay = 400;    // how long for mouse hover over item until tooltip is rendered
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || mouseHoverDelay);
  };

  const hideTip = async () => {
    clearInterval(timeout);
    //await new Promise(r => setTimeout(r, 2000));
    setActive(false);
  };

  
  return (
    <div
      className="Tooltip-Wrapper"
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {props.children}
    
      {active && (
        <div className={`Tooltip-Tip ${props.direction || "top"}`} style={props.styles}>
    
          {/* Content */}
          {props.content}
        </div>
      
      )}
    </div>
  );
};

export default Tooltip;

import Tooltip from "components/Tooltips/Tooltip";
import useApplicationData from "hooks/useApplicationData";
import React, { useState } from "react";

//
// https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w17/activities/900?journey_step=54
//

export default function Empty(props) { 

  // localized dragging support - also see Application.js for main handler
  const [isOver, setIsOver] = useState(false);
  function handleDragOver(e) {
    setIsOver(true);
    e.stopPropagation();
    e.preventDefault();
  }
  function handleDragLeave() {
    setIsOver(false);
  }

  let tipStyles = {
    "--tooltip-text-color": "black",
    "--tooltip-background-color": "orange",
    "--tooltip-margin": "40px;",
  };

  return (
    <main className="appointment__add dragitem"
    style = {{ backgroundColor: isOver ? "teal" : "" }} 
    
    onDragOver={handleDragOver}
    onDrop= {(e) => { setIsOver(false); e.stopPropagation();e.preventDefault()}}
    onDragLeave = {handleDragLeave}

    onDragEnter={(e) => {props.dragEnterFn(e,props.keyname)}}
    >
      <Tooltip styles={tipStyles} content={props.toolTip} direction="bottom">
        <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      /></Tooltip>
    </main>
  );
}

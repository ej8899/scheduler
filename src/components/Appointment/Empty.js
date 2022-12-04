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

  
  // default EMPTY icon is to 'add'
  let icon = (
    <img
    className="appointment__add-button"
    src="images/add.png"
    alt="Add"
    onClick={props.onAdd}
  />
  )

  // set EMPTY icon to a trash can if we're in the 5pm position - item stays hidden unless we're dragging an item
  if(props.theTime === "5pm") {
    icon = (
      <i className="fa-solid fa-trash-can fa-xl"></i>
    )
  }


  // set up classes in our 'empty' panels for adding or trashing (drag n drop) appointments
  let classes="";
  if(props.trashMode === true) {
    classes = "showtrash ";
  }
  classes += "appointment__add dragitem";

  return (
    <main className={classes}
    style = {{
      backgroundColor: isOver ? "teal" : "",
  }} 
    
    onDragOver={handleDragOver}
    onDrop= {(e) => { setIsOver(false); e.stopPropagation();e.preventDefault()}}
    onDragLeave = {handleDragLeave}

    onDragEnter={(e) => {props.dragEnterFn(e,props.keyname || "trashcan")}}
    >
      <Tooltip styles={tipStyles} content={props.toolTip} direction="bottom">
        {icon}
      </Tooltip>
    </main>
  );
}

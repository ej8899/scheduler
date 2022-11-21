import React, { useRef } from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
  //if (global.config.debug) console.log("BUTTON PROPS",props)

  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  const inputRef = React.useRef(null);
  if (props.danger) {
    global.config.editsOpen = inputRef;
  }

  function myClickHandler() {
    if (global.config.debug) console.log("TEST of click handler in Button.js");
    props.onClick();
  }

  return (
    <button
      ref={inputRef}
      id={props.id}
      disabled={props.disabled}
      className={buttonClass}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

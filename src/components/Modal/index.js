import React, { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import "./modal.scss";

export default function ZModal(props) {
  // props.show  true = show modal, false = remove modal
  // if(!props.show) {
  //   return null;
  // }
  const { onClose } = props;
  const closeOnEscapeKeyDown = useCallback((e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  }, [onClose]);
  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, [closeOnEscapeKeyDown]);

  // props.title - deprecated 2022-11-14 - along with zmodal-title class
  
  //return ReactDOM.createPortal (
  return (
    <div className={`zmodal ${props.show ? 'showzmodal' : ''}`} onClick={props.onClose}>
      <div className="zmodal-content" onClick={e => e.stopPropagation()}>
        <div className="zmodal-header" align="right">
          <i onClick={props.onClose} className="zmodalclose fa-regular fa-circle-xmark fa-xl"></i>
        </div>
        <div className="zmodal-body">
          {props.children}
        </div>
        <div className="zmodal-footer" align="center">
          <button className="zmodalbutton" onClick={props.onClose}>close</button>
        </div>
      </div>
    </div>
  );
  // ,document.getElementById("root") // was above  as part of the return
}
import React from "react";
import "./LoadingSpinner.scss";

{/* <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div> */}
export default function LoadingSpinner() {
  return (
    
    <div className="spinner-container">
      <div className="spinner-box">
        <div className="circle-border">
          <div className="circle-core">
          </div>
        </div>  
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { zmodalUpdater } from ".";




export function showAbout() {
  let styles = {
    fontSize: '6rem',
    color: 'orange',
  }
  const mymodalMessage = (
    <div align="center">
    <i className="fashadow fa-solid fa-circle-question" style={styles}></i><br/><br/>
    <h2>
    LHL Scheduler App</h2><br/><big>
    This is a project for learning React and<br/>
    various testing integrations such as<br/>
    Jest and Cypress.<br/><br/>
    Modified by {global.config.appDeveloper}<br/>
    <i className="fa-regular fa-copyright"></i> 2022, All Rights Reserved<br/>
    Version: {global.config.appVersion}
    </big>
    <br/><br/>
    </div>
  );
  zmodalUpdater(updateZModal ,zmodalData, {
    message:mymodalMessage,
    button:"",
    show:true,
    settings: { 
      noAbort: false, 
    },
  });
  return;
}

export function showPrivacy() {
  let styles = {
    fontSize:"6rem",
    color:"orange"
  }
  let mymodalMessage = (
    <div>
    <div align="center">
    <i className="fashadow fa-solid fa-lock" style={styles}></i>
    <br/><br/>
  
    <h2>Privacy Policy</h2><br/>
    Nullam cursus velit ac dui cursus hendrerit. Proin malesuada erat eu tempus sagittis. Pellentesque sit amet odio at mauris tristique egestas at vulputate mauris. Duis eget est eu neque accumsan fringilla in at mauris. Donec molestie libero sem, et mattis tellus porttitor quis. Nulla ut dolor quis nibh maximus venenatis. Vestibulum iaculis tempus commodo. Nulla tincidunt dolor mauris, quis eleifend massa commodo in. Nulla vehicula neque nec malesuada eleifend. Vivamus sagittis ornare risus, vel semper purus aliquam nec. Donec porttitor elit sem, vel rhoncus diam vulputate sed.
    <br/><br/>
    </div>

    </div>
  );
  zmodalUpdater(updateZModal ,zmodalData, {
    message:mymodalMessage,
    button:"agree",
    show:true,
    settings: { 
      noAbort: true, 
  },
  });
  return;
}
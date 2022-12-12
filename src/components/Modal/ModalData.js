import React, { useState } from "react";
import ThemeSwitch from "components/ThemeSwitch";
import HourSwitch from "components/HourSwitch.jsx";
import { zmodalUpdater } from "./index.js";

function showReleaseNotes() {
  zmodalUpdater(updateZModal, zmodalData, modalReleaseNotes());
}

//
// cookies modal
//
export function modalCookiesMessage(data) {
  let styles = {
    color: "navy",
    cursor: "pointer",
    background: "linearGradient(260deg,#9b6c50 0%,#4f2626 100%)",
  };
  let mymodalMessage = (
    <div>
      <div align="center">
        <div>
          <img
            className="fashadow cookieimage"
            src="./images/cookie.svg"
            alt="myCookie"
            width="200"
            height="200"
          />
        </div>
        <h2 className="glitchyshadow">Nom, Nom, Nom...</h2>
        <big>
          Our web application uses cookies to provide you with the best browsing
          experience and relevant information.
          <br />
          <br />
          Before continuing to use our web application, you agree & accept our{" "}
          <br />
          <span className="underLink" style={styles} onClick={data.clickFunction}>
            Cookie & Privacy Policy
          </span>
          .
        </big>
      </div>
    </div>
  );

  const settings = {
    message: mymodalMessage,
    show:true,
    button: "Agree & Continue",
    settings: { 
      noAbort: true, 
    },
  };

  return settings;
}

//
// about app modal
//
export function modalAboutMessage(data) {
  let styles = {
    fontSize: "6rem",
    color: "orange",
  };
  let linkstyles = {
    cursor: "pointer",
  }
  const mymodalMessage = (
    <div align="center">
      <i className="fashadow fa-solid fa-circle-question" style={styles}></i>
      <br />
      <br />
      <h2 className="glitchyshadow">LHL Scheduler</h2>
      <br />
      <big>
        This is a project for learning React and
        <br />
        various testing integrations such as
        <br />
        Jest and Cypress.
        <br />
        <br />
        Modified by {global.config.appDeveloper}
        <br />
        <i className="fa-regular fa-copyright"></i> 2022, All Rights Reserved
        <br />
        Version: {global.config.appVersion}
        <br /><br />
        <span className="underLink" style={linkstyles} onClick={data.clickFunction}>
        <i className="fa-solid fa-chevron-right fa-sm"></i> Release Notes <i className="fa-solid fa-chevron-left fa-sm"></i>
          </span>
      </big>
      <br />
      <br />
      
      <ThemeSwitch />
      <HourSwitch />
    </div>
  );

  const settings = {
      message:mymodalMessage,
      button:"",
      show:true,
      settings: { 
        noAbort: false, 
      },
    };

  return settings;
}

//
// privacy policy modal
//
export function modalPrivacyPolicy() {
  let styles = {
    fontSize: "6rem",
    color: "orange",
  };
  let mymodalMessage = (
    <div>
      <div align="center">
        <i className="fashadow fa-solid fa-lock" style={styles}></i>
        <br />
        <br />
        <h2 className="glitchyshadow">Privacy Policy</h2>
        <br />
        Nullam cursus velit ac dui cursus hendrerit. Proin malesuada erat eu
        tempus sagittis. Pellentesque sit amet odio at mauris tristique egestas
        at vulputate mauris. Duis eget est eu neque accumsan fringilla in at
        mauris. Donec molestie libero sem, et mattis tellus porttitor quis.
        Nulla ut dolor quis nibh maximus venenatis. Vestibulum iaculis tempus
        commodo. Nulla tincidunt dolor mauris, quis eleifend massa commodo in.
        Nulla vehicula neque nec malesuada eleifend. Vivamus sagittis ornare
        risus, vel semper purus aliquam nec. Donec porttitor elit sem, vel
        rhoncus diam vulputate sed.
        <br />
        <br />
      </div>
    </div>
  );

  const settings = {
    message: mymodalMessage,
    button:"agree",
    show:true,
    settings: { 
      noAbort: true, 
  },
  };

  return settings;
}

//
// application release notes modal
//
export function modalReleaseNotes() {
  let styles = {
    fontSize: "6rem",
    color: "orange",
  };
  let mymodalMessage = (
    <div>
      <div align="center">
        <i className="fashadow fa-solid fa-file-lines" style={styles}></i>
        <br />
        <br />
        <h2 className="glitchyshadow">Release Notes:</h2>
        <br/>
  
        <code style={{display: "inline-block",textAlign: "left"}}>
        v1.0:<br/>
        - Websocket Support<br/>&nbsp;&nbsp;(auto updates across all open instances)<br/>
        - Dark & Light mode toggle<br/>
        - Drag and Drop to adjust schedules<br/>
        </code>

        <br />
      </div>
    </div>
  );

  const settings = {
    message: mymodalMessage,
    button:"ok",
    show:true,
    settings: { 
      noAbort: true, 
  },
  };

  return settings;
}

//
// drag and drop WIP modal
//
export function dragndropMessage() {
  let styles = {
    fontSize: "6rem",
    color: "orange",
  };
  const mymodalMessage = (
    <div align="center">
      <i className="fashadow fa-solid fa-circle-exclamation" style={styles}></i>
      <br />
      <br />
      <big>
        Hang tight...<br/>
        Drag & drop is under construction!
      </big>
      <br />
      <br />
    </div>
  );

  const settings = {
      message:mymodalMessage,
      button:"",
      show:true,
      settings: { 
        noAbort: false, 
      },
    };

  return settings;
}
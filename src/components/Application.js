import React, { useEffect, useState } from "react";
import axios from "axios";
import "components/Application.scss";

import DayList  from "components/DayList.js";
import Appointment  from "components/Appointment/index.js";
import {getAppointmentsForDay, getInterview, getInterviewersForDay }  from "helpers/selectors.js";
import useApplicationData from "hooks/useApplicationData";
import { isFalsey } from "config";

import Tooltip from "./Tooltips/Tooltip.js";
import ZModal, { zmodalUpdater } from "./Modal/index.js";

export default function Application(props) {
  
  // set up states & defaults for our zmodal windows
  const [zmodalData, updateZModal] = useState ({
    message: "",
    button: "Agree & Continue",
    settings: { 
        noAbort: true, 
    },
    show: false,
  });
  

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  // https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w18/activities/930?journey_step=55
  /*
    const setDays = (days) => {
    setState(prev => ({...state,days}));
  };
  */
  let dailyAppointments = [];
  let interviewers = [];



  // parse out appointments for day
  dailyAppointments = getAppointmentsForDay(state,state.day);
  interviewers = getInterviewersForDay(state,state.day);

  const appointmentList = Object.values(dailyAppointments).map((item) => {
    const interviewer = getInterview(state, item.interview);
    return (
      <Appointment
        key={item.id}
        id={item.id}
        time={item.time}
        interview={interviewer}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  })

  
  // https://dmitripavlutin.com/react-useeffect-explanation/
  if(global.config.cookiesModal) {
    useEffect(() => { cookiesModal(true); }, []);
  }
  
  function cookiesModal(modalState=false) {
    if (global.config.debug) console.log("IN COOKIES MODAL");
  
    let styles = {
      color: "navy",
      cursor: "pointer"
    }
    let mymodalMessage = (
      <div>
      <div align="center">
      <div><img className="fashadow" src="./images/cookie.svg" alt="myCookie" width="200" height="200" /></div>
      <h2>Nom, Nom, Nom...</h2>
      <big>
      Our web application uses cookies to provide you with the best browsing
      experience and relevant information.
      <br/><br/>
      Before continuing
      to use our web application, you agree & accept our <br/><span style={styles} onClick={showPrivacy}>Cookie & Privacy Policy</span>.
      </big>
      </div>
      </div>
    );
    
    zmodalUpdater(updateZModal ,zmodalData, {
      message: mymodalMessage,
      show:true,
      settings: { 
        noAbort: true, 
      },
    });

    // load from localStorage - don't show modal if we've done it before
    // update localStorage once user says ok 
  }

  function showAbout() {
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


  function showPrivacy() {
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




  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />

      { global.config.cookiesModal && 
        <ZModal settings={zmodalData.settings} buttontext={zmodalData.button} show={zmodalData.show} onClose={() => zmodalUpdater(updateZModal ,zmodalData, {show:false})} title="Why yes, we do use cookies...">
          {zmodalData.message}
        </ZModal>
      }
    
  
      <div className="socicons-container" align="center"><Tooltip content="Visit our GitHub profile" direction="right"><a className="socicons" href={global.config.link.github} target="_new"><i className="fa-brands fa-square-github fa-xl"></i></a></Tooltip>&nbsp;&nbsp;|&nbsp;&nbsp;<a className="socicons" href={global.config.link.linkedin} target="_new"><i className="fa-brands fa-linkedin fa-xl"></i></a>&nbsp;&nbsp;|&nbsp;&nbsp;<a className="socicons" href={global.config.link.twitter} target="_new"><i className="fa-brands fa-square-twitter fa-xl"></i></a>&nbsp;&nbsp;|&nbsp;&nbsp;<Tooltip content="About Scheduler" direction="right"><a className="socicons"><i onClick={() => showAbout() }  className="fa-solid fa-circle-question fa-xl"></i></a></Tooltip></div>

      <hr className="sidebar__separator sidebar--centered" />

      <nav className="sidebar__menu">
      <DayList days={state.days} value={state.day} onChange={setDay} />
      </nav>

      <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
      </section>

      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm"/>
      </section>
      
    </main>
  );
}

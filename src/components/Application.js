import React, { useEffect, useState } from "react";
import axios from "axios";
import "components/Application.scss";

import DayList  from "components/DayList.js";
import Appointment  from "components/Appointment/index.js";
import {getAppointmentsForDay, getInterview, getInterviewersForDay }  from "helpers/selectors.js";
import useApplicationData from "hooks/useApplicationData";
import { isFalsey } from "config";

import ZModal from "./Modal";


export default function Application(props) {
  
  // using zModal
  // todo - how do we wrap this in an 'if' statement given that it's not to be in an if statement? (useeffect)
  // https://reactjs.org/docs/hooks-rules.html#explanation
  const [showModal,setShowModal] = useState(false);
  
  let styles = {
    color: "navy",
    cursor: "pointer"
  }
  let mymodalMessage = (
    <div>
    <div align="center">
    <div><img className="fashadow" src="./images/cookie.svg" alt="myCookie" width="200" height="200" /></div>
    <big>
    Our web application uses cookies to provide you with the best browsing
    experience and relevant information.
    <br/><br/>
    Before continuing
    to use our web application, you agree & accept our <span style={styles} onClick={showPrivacy}>Cookie & Privacy Policy</span>.
    </big>
    </div>
    </div>
  );
  const [modalMessage,setModalMessage]  = useState(mymodalMessage);
  const [modalButton,setModalButton]    = useState("AGREE & CONTINUE");

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
    console.log("IN COOKIES MODAL")
    // load from localStorage - don't show modal if we've done it before
    setShowModal(modalState);
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
    setModalMessage(mymodalMessage)
    setModalButton("");
    setShowModal(true);
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
    
      <h3>Privacy Policy</h3><br/>
      Nullam cursus velit ac dui cursus hendrerit. Proin malesuada erat eu tempus sagittis. Pellentesque sit amet odio at mauris tristique egestas at vulputate mauris. Duis eget est eu neque accumsan fringilla in at mauris. Donec molestie libero sem, et mattis tellus porttitor quis. Nulla ut dolor quis nibh maximus venenatis. Vestibulum iaculis tempus commodo. Nulla tincidunt dolor mauris, quis eleifend massa commodo in. Nulla vehicula neque nec malesuada eleifend. Vivamus sagittis ornare risus, vel semper purus aliquam nec. Donec porttitor elit sem, vel rhoncus diam vulputate sed.
      <br/><br/>
      </div>
  
      </div>
    );

    setModalMessage(mymodalMessage)
    setModalButton("agree");
    setShowModal(true);
    return;
  }





  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />

      { global.config.cookiesModal && 
        <ZModal buttontext={modalButton} show={showModal} onClose={() => setShowModal(false)} title="Why yes, we do use cookies..." body={modalMessage}>
          {modalMessage}
        </ZModal>
      }
    
  
      <div className="socicons-container" align="center"><a className="socicons" href="https://github.com/ej8899/scheduler" target="_new"><i className="fa-brands fa-square-github fa-xl"></i></a>&nbsp;&nbsp;|&nbsp;&nbsp;<a className="socicons" href="https://ca.linkedin.com/in/ernie-johnson-3b77829b" target="_new"><i className="fa-brands fa-linkedin fa-xl"></i></a>&nbsp;&nbsp;|&nbsp;&nbsp;<a className="socicons" href="https://github.com/ej8899/scheduler" target="_new"><i className="fa-brands fa-square-twitter fa-xl"></i></a>&nbsp;&nbsp;|&nbsp;&nbsp;<a className="socicons"><i onClick={() => showAbout() }  className="fa-solid fa-circle-question fa-xl"></i></a></div>

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

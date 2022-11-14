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
  
  let mymodalMessage = `<div align=center>
  <i class="fashadow fa-solid fa-cookie-bite" style="font-size:6rem;color:orange"></i>
  <br clear=all><BR>
  <BIG>Why yes, we do use cookies in this application.<BR>
  Please accept our cookies to continue!</BIG>
  <BR><BR>
  </div>
  `;
  const [modalMessage,setModalMessage] = useState(mymodalMessage);

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
    let mymodalMessage = `<div align=center>
    <i class="fashadow fa-solid fa-circle-question" style="font-size:6rem;color:orange"></i>
    <br clear=all><BR>
    <BIG>
    <B>LHL Scheduler App</B><BR>
    is a project for learning React and<BR>
    various testing integrations.<BR><BR>
    Modified by ${global.config.appDeveloper}<BR>
    <i class="fa-regular fa-copyright"></i> 2022, All Rights Reserved<BR>
    Version: ${global.config.appVersion}
    </BIG>

    <BR><BR>
    </div>
    `;
    setModalMessage(mymodalMessage)
    setShowModal(true);
    return;
  }

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />

      { global.config.cookiesModal && 
      <ZModal show={showModal} onClose={() => setShowModal(false)} title="Why yes, we do use cookies..." >
        <div dangerouslySetInnerHTML={{__html: modalMessage}}></div>
      </ZModal>
      }
    
  
      <div className="socicons" align="center"><a href="https://github.com/ej8899/scheduler" target="_new"><i className="fa-brands fa-square-github fa-xl"></i></a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://ca.linkedin.com/in/ernie-johnson-3b77829b" target="_new"><i className="fa-brands fa-linkedin fa-xl"></i></a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://github.com/ej8899/scheduler" target="_new"><i className="fa-brands fa-square-twitter fa-xl"></i></a>&nbsp;&nbsp;|&nbsp;&nbsp;<a><i onClick={() => showAbout() }  className="fa-solid fa-circle-question fa-xl"></i></a></div>

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

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
import { modalAboutMessage, modalPrivacyPolicy, modalCookiesMessage } from "./Modal/ModalData.js";



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


  function showAbout() {
    zmodalUpdater(updateZModal ,zmodalData, modalAboutMessage());
  }

  function showPrivacy() {
    zmodalUpdater(updateZModal ,zmodalData, modalPrivacyPolicy());
  }


  const {
    state,
    setDay,
    setTip,
    toolTip,
    bookInterview,
    cancelInterview,
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
        toolTip={props.toolTip}
        changeTip={setTip}
      />
    )
  })

  
  // https://dmitripavlutin.com/react-useeffect-explanation/
  if(global.config.cookiesModal) {
    useEffect(() => { cookiesModal(true); }, []);
  }

  
  // console.log("\n\nDELETEOPEN:",global.config.deleteOpen);
  // useEffect(() => { setTip("Cancel or Confirm your delete interview action first!"); }, []);

  function cookiesModal(modalState=false) {
    if (global.config.debug) console.log("IN COOKIES MODAL");
    zmodalUpdater(updateZModal, zmodalData, modalCookiesMessage({clickFunction: showPrivacy}));
    
    // load from localStorage - don't show modal if we've done it before
    // update localStorage once user says ok 
  }


  let tipStyles = {
    "--tooltip-text-color": "black",
    "--tooltip-background-color": "orange" 
  };

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
    
  
      <div className="socicons-container" align="center">
        <Tooltip styles={tipStyles} content="Visit our GitHub profile" direction="right"><a className="socicons" href={global.config.link.github} target="_new"><i className="fa-brands fa-square-github fa-xl"></i></a></Tooltip>&nbsp;&nbsp;|&nbsp;&nbsp;
        <Tooltip styles={tipStyles} content="Visit our LinkedIn profile" direction="right"><a className="socicons" href={global.config.link.linkedin} target="_new"><i className="fa-brands fa-linkedin fa-xl"></i></a></Tooltip>&nbsp;&nbsp;|&nbsp;&nbsp;
        <Tooltip styles={tipStyles} content="check us out on Twitter" direction="right"><a className="socicons" href={global.config.link.twitter} target="_new"><i className="fa-brands fa-square-twitter fa-xl"></i></a></Tooltip>&nbsp;&nbsp;|&nbsp;&nbsp;
        <Tooltip styles={tipStyles} content="About Scheduler" direction="right"><a className="socicons"><i onClick={() => showAbout() }  className="fa-solid fa-circle-question fa-xl"></i></a></Tooltip></div>

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

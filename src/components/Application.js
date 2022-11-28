import React, { useEffect, useRef, useState } from "react";
import "components/Application.scss";

import DayList  from "components/DayList.js";
import Appointment  from "components/Appointment/index.js";
import {getAppointmentsForDay, getInterview, getInterviewersForDay }  from "helpers/selectors.js";
import useApplicationData from "hooks/useApplicationData";
import { isFalsey } from "config";

import Tooltip from "./Tooltips/Tooltip.js";

// modal windows
import ZModal, { zmodalUpdater } from "./Modal/index.js";
import { modalAboutMessage, modalPrivacyPolicy, modalCookiesMessage, dragndropMessage } from "./Modal/ModalData.js";

// light and dark mode switch / theme switch
import { ThemeContext, isBrowserDefaultDark, getDefaultTheme } from "./ThemeContext.ts";




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

  // set up for light and dark modes
  const [theme, setTheme] = useState(getDefaultTheme);
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };


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
    updateAppointmentList,
  } = useApplicationData();
  
  

  // https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w18/activities/930?journey_step=55
  /*
    const setDays = (days) => {
    setState(prev => ({...state,days}));
  };
  */
  let dailyAppointments = [];
  let interviewers = [];

  
  //
  // draggable items
  // ref: https://rootstack.com/en/blog/how-do-i-use-drag-and-drop-react
  //
  const dragItem = useRef();
  const dragOverItem = useRef();
  const dragStart = (e, position) => {
    dragItem.current = position;
    //console.log(e.target.innerHTML);
    //console.log("drag item:",position);
  };
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    //console.log(e.target.innerHTML);
    //console.log("drag to:",position)
  };
  const dragEnd = (e) => {
    console.log("in drag END:original:",dragItem.current)
    console.log("in drag END:destination:",dragOverItem.current)
    const destinationIndex = dragOverItem.current-1;
    zmodalUpdater(updateZModal ,zmodalData, dragndropMessage());
    // check if interview is NOT here, 
    console.log("props of dragover item:",appointmentList)
    if(!isFalsey(appointmentList[dragOverItem.current-1].props.interview)) {
      console.log('oops - already an inteview here abort')
      return;
    }
    console.log('no student here ok to drop')
    // if empty, copy new item here

    const newInterview = appointmentList[dragItem.current-1].props.interview;
    updateAppointmentList(dragOverItem.current,newInterview,dragItem.current);
    

    // todo - change appointment id
    /*
    bookInterview(destinationIndex, newAppt)
    .then((res) => {
      console.log("applicaton res:",res)
    })
    .catch((err) => {
      console.log("application error:",err)
    });
    */
    // remove old from view
    // remove old item
    // save data
    // delete old location from db
  }


  // parse out appointments for day
  dailyAppointments = getAppointmentsForDay(state,state.day);
  interviewers = getInterviewersForDay(state,state.day);

  const appointmentList = Object.values(dailyAppointments).map((item,index) => {
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
        dragStartFn={dragStart}
        dragEnterFn={dragEnter}
        dragEndFn={dragEnd}
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
    zmodalUpdater(updateZModal, zmodalData, modalCookiesMessage({clickFunction: showPrivacy}));
    // todo -load from localStorage - don't show modal if we've done it before
    // todo - update localStorage once user says ok 
  }


  let tipStyles = {
    "--tooltip-text-color": "black",
    "--tooltip-background-color": "orange" 
  };

  return (
    <ThemeContext.Provider value = {{ theme, setTheme}}>
          
    <div className={`theme-${theme}`}>
    <main className="layout" id={theme}>
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
    </div>
    </ThemeContext.Provider>
  );
}

import React, { useEffect, useRef, useState } from "react";
import "components/Application.scss";

import DayList from "components/DayList.js";
import Appointment from "components/Appointment/index.js";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors.js";
import useApplicationData from "hooks/useApplicationData";
import { isFalsey,goSleep } from "config";

import Tooltip from "./Tooltips/Tooltip.js";

// modal windows
import ZModal, { zmodalUpdater } from "./Modal/index.js";
import {
  modalAboutMessage,
  modalPrivacyPolicy,
  modalCookiesMessage,
  dragndropMessage,
  modalReleaseNotes,
} from "./Modal/ModalData.js";

// light and dark mode switch / theme switch
import {
  ThemeContext,
  isBrowserDefaultDark,
  getDefaultTheme,
} from "./ThemeContext.jsx";

// console log helper
import zlog from "zlog.js";

// load spinners
import LoadingSpinner from "./LoadingSpinner.jsx";

//
// application - main function
//
export default function Application(props) {
  const [dragTrash, setdragTrash] = useState(false);
  
  // spinners (use in drag and drop instead of panel updates)
  const [isLoading, setIsLoading] = useState(false);

  //  setup controlled page loader -- NOTE check our useEffect for smooth load of app itself
  const [pageLoading,setPageLoading] = useState(true);
  const pageloader = document.getElementById('pageloader');
  if(pageLoading === true) {
    global.config.goSleep(2000).then(()=> { 
      pageloader.style.display = "none";
      setPageLoading(false); 
    });
  }

  // classes for main display
  const [className, setclassName] = useState("layout");

  //
  // MODAL WINDOWS: 
  // set up states & defaults for our zmodal windows
  //
  const [zmodalData, updateZModal] = useState({
    message: "",
    button: "",
    settings: {
      noAbort: true,
    },
    show: false,
  });
  function showAbout() {
    zmodalUpdater(updateZModal, zmodalData, modalAboutMessage({clickFunction: showReleaseNotes}));
  }
  function showReleaseNotes() {
    zmodalUpdater(updateZModal, zmodalData, modalReleaseNotes());
  }
  function showPrivacy() {
    zmodalUpdater(updateZModal, zmodalData, modalPrivacyPolicy());
  }


  //
  // set up for light and dark modes
  //
  const [theme, setTheme] = useState(getDefaultTheme);
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };


  //
  // set up APP data
  //
  const {
    state,
    setDay,
    setTip,
    toolTip,
    bookInterview,
    cancelInterview,
    updateAppointmentList,
    trashAppointment,
  } = useApplicationData();

  // https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w18/activities/930?journey_step=55
  let dailyAppointments = [];
  let interviewers = [];


  //
  // draggable items (main controller code)
  // support code in Appointment/Show.js and Empty.js
  //
  // ref: https://rootstack.com/en/blog/how-do-i-use-drag-and-drop-react
  // ref: https://vijayt.com/post/drag-and-drop-example-using-plain-react/
  // ref: https://codesandbox.io/s/react-drag-and-drop-forked-9012wf
  const dragItem = useRef();
  const dragOverItem = useRef();
  const dragStart = (e, position) => {
    dragItem.current = position;
    setdragTrash(true);
    //console.log('info',e)
  };
  const dragEnter = (e, position) => { // dragOver?
    dragOverItem.current = position;
    e.stopPropagation();
    e.preventDefault();
  };
  const dragEnd = (e) => {
    let destinationPageKey, sourcePageKey;
    setdragTrash(false);
    //zmodalUpdater(updateZModal, zmodalData, dragndropMessage());
    e.stopPropagation();
    e.preventDefault();
    // console.log("in drag END:original:", dragItem.current);
    // console.log("in drag END:destination:", dragOverItem.current);
    const destinationIndex = dragOverItem.current - 1;

    // trash can in left sidebar
    // todo remove this - was a test for showing an element
    if (dragOverItem.current === 'trash') {
      //console.log("TO DELETE sidebar")
      return;
    }
    // trashcan at "5pm" position
    if (dragOverItem.current === 'trashcan') {
      //console.log("TO DELETE -5pm trashcan")
      // TODO confirmation modal
      setIsLoading(true);
      trashAppointment(dragItem.current);
      setIsLoading(false);
      return;
    }
    // console.log("appointmentList",appointmentList)

    // adjust for pageKey
    destinationPageKey = dragOverItem.current - 1;
    sourcePageKey = dragItem.current - 1;
    // todo refactor this mess:
    if (dragOverItem.current > 20) {
      destinationPageKey = dragOverItem.current - 21;
      sourcePageKey = dragItem.current - 21;
    } else
    if (dragOverItem.current > 15) {
      destinationPageKey = dragOverItem.current - 16;
      sourcePageKey = dragItem.current - 16;
    } else
    if (dragOverItem.current > 10) {
      destinationPageKey = dragOverItem.current - 11;
      sourcePageKey = dragItem.current - 11;
    } else
    if (dragOverItem.current > 5) {
      destinationPageKey = dragOverItem.current - 6;
      sourcePageKey = dragItem.current - 6;
    }

    // check if interview is NOT here,
    if (!isFalsey(appointmentList[destinationPageKey].props.interview)) {
      zlog('debug',"already a student here");

      return;
    }
    zlog('debug',"no student here ok to drop");
    // if empty, copy new item here
    const newInterview = appointmentList[sourcePageKey].props.interview;
    setIsLoading(true);
    updateAppointmentList(dragOverItem.current, newInterview, dragItem.current);
    setTimeout(() => setIsLoading(false),1000);
  };

  //
  // parse out appointments for day
  //
  dailyAppointments = getAppointmentsForDay(state, state.day);
  interviewers = getInterviewersForDay(state, state.day);

  const appointmentList = Object.values(dailyAppointments).map(
    (item, index) => {
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
          setdragTrash={setdragTrash}
        />
      );
    }
  );

  
  //
  // useEffect - actions on first load
  // https://dmitripavlutin.com/react-useeffect-explanation/
  //
  useEffect(() => {
    if (global.config.cookiesModal) {
      cookiesModal(true);
    }
    global.config.goSleep(2000).then(()=> { setclassName("layout fadein"); });
  }, []);
  
  function cookiesModal(modalState = false) {
    zmodalUpdater(
      updateZModal,
      zmodalData,
      modalCookiesMessage({ clickFunction: showPrivacy })
    );
    // todo -load from localStorage - don't show modal if we've done it before
    // todo - update localStorage once user says ok
  }

  // setup any extra styles not included in SCSS files
  let tipStyles = {
    "--tooltip-text-color": "black",
    "--tooltip-background-color": "orange",
  };


  return (
    !pageLoading && (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div >
        <main className={className} id={theme}>
          <section className="sidebar">
            {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
            <img
              className="sidebar--centered"
              src="images/logo.png"
              alt="Interview Scheduler"
            />

            {global.config.cookiesModal && (
              <ZModal
                settings={zmodalData.settings}
                buttontext={zmodalData.button}
                show={zmodalData.show}
                onClose={() =>
                  zmodalUpdater(updateZModal, zmodalData, { show: false })
                }
                title="Why yes, we do use cookies..."
              >
                {zmodalData.message}
              </ZModal>
            )}

            <div className="socicons-container" align="center">
              <Tooltip
                styles={tipStyles}
                content="Visit our GitHub profile"
                direction="right"
              >
                <a
                  className="socicons"
                  href={global.config.link.github}
                  target="_new"
                >
                  <i className="fa-brands fa-square-github fa-xl"></i>
                </a>
              </Tooltip>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Tooltip
                styles={tipStyles}
                content="Visit our LinkedIn profile"
                direction="right"
              >
                <a
                  className="socicons"
                  href={global.config.link.linkedin}
                  target="_new"
                >
                  <i className="fa-brands fa-linkedin fa-xl"></i>
                </a>
              </Tooltip>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Tooltip
                styles={tipStyles}
                content="check us out on Twitter"
                direction="right"
              >
                <a
                  className="socicons"
                  href={global.config.link.twitter}
                  target="_new"
                >
                  <i className="fa-brands fa-square-twitter fa-xl"></i>
                </a>
              </Tooltip>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Tooltip
                styles={tipStyles}
                content="About Scheduler"
                direction="right"
              >
                <a className="socicons">
                  <i
                    onClick={() => showAbout()}
                    className="fa-solid fa-circle-question fa-xl"
                  ></i>
                </a>
              </Tooltip>
            </div>

            <hr className="sidebar__separator sidebar--centered" />

            <nav className="sidebar__menu">
              <DayList days={state.days} value={state.day} onChange={setDay} />
              {isLoading ? <LoadingSpinner /> : <div></div>}
            </nav>
                {dragTrash && <div
                onDragEnter={(e) => {dragEnter(e,"trash")}} 
                onDragEnd={(e) => {dragEnter(e,"trash")}}
                key="trash">.</div>}
            <img
              className="sidebar__lhl sidebar--centered"
              src="images/lhl.png"
              alt="Lighthouse Labs"
            />
          </section>

          <section className="schedule">
            {appointmentList}
            <Appointment 
              key="last" 
              time="5pm" 
              toolTip="delete item"
              changeTip={setTip}
              dragStartFn={dragStart}
              dragEnterFn={dragEnter}
              dragEndFn={dragEnd}
              setdragTrash={setdragTrash}
              trashMode={dragTrash}
              />
          </section>
        </main>
      </div>
    </ThemeContext.Provider>
    )
  );
}

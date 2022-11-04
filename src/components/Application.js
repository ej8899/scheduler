import React, { useEffect, useState } from "react";
import axios from "axios";
import "components/Application.scss";

import DayList  from "components/DayList.js";
import Appointment  from "components/Appointment/index.js";
import {getAppointmentsForDay, getInterview, getInterviewersForDay }  from "helpers/selectors.js";

import { isFalsey } from "config";

// TODO remove data below
// TEST DATA for DayListItem
// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
//   {
//     id: 4,
//     name: "Thurs",
//     spots: 16,
//   },
// ];

// TEST DATA for appointments.
// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };



export default function Application(props) {
  const [state, setState] = useState ({
    day: "Tuesday",
    days: [],
    appointments: {},
  });

  isFalsey("test")

  // for combined state object
  // https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w18/activities/929?journey_step=55
  const setDay = (day) => {
    setState({ ...state, day });
  };
  
  // https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w18/activities/930?journey_step=55
  /*
  const setDays = (days) => {
    setState(prev => ({...state,days}));
  };
  */
  let dailyAppointments = [];
  let interviewers = [];


  // https://dmitripavlutin.com/react-useeffect-explanation/
  /* SINGLE useEffect with Axios GET
  useEffect(() => {
    const testURL = `http://localhost:8001/api/days`;
    axios.get(testURL)
    .then(response => {
      if(global.config.debug) console.log("axiosGET(days):",response.data);
      setDays(response.data);
    });
  }, []); */
   // empty array says to run ONCE after initial load of Application

  useEffect(() => {
    const daysURL         = "http://localhost:8001/api/days";
    const appointmentURL  = "http://localhost:8001/api/appointments";
    const interviewersURL = "http://localhost:8001/api/interviewers";
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentURL),
      axios.get(interviewersURL),
    ]).then((all) =>{
      if(global.config.debug) console.log("axiosGET(DAYS):",all[0].data);
      if(global.config.debug) console.log("axiosGET(APPOINTMENTS):",all[1].data);
      if(global.config.debug) console.log("axiosGET(INTERVIEWERS):",all[2].data);
      setState(prev=>({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data}));
    })
  },[]);

  //
  // bookInterview (save into DB)
  //
  function bookInterview(id, interview) {
    if(global.config.debug) console.log("APPLICATION:bookInterview:id:",id);
    if(global.config.debug) console.log("APPLICATION:bookInterview:interview:",interview);

    // https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w19/activities/963?journey_step=56&workbook=24
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // PUT data into db: https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w19/activities/963?journey_step=56&workbook=24
    // reminder, this is TWO STEP action with axios.put
    return axios.put(`http://localhost:8000/api/appointments/${id}`, { interview })
    .then((res) => {
      if(global.config.debug) console.log("BOOKINTERVIEW - PUT response:",res.status);
      // 204 is all good
      // TODO error handling?
      setState({
        ...state,
        appointments
      });
      return;
    })
    // FOR LOCAL ONLY
    // setState({
    //       ...state,
    //       appointments
    //     });
    //     return;
  }


  //
  // cancelInterview (delete From DB)
  //
  function cancelInterview(id,interview=null) {
    const appointment = { 
      ...state.appointments[id],
      interview
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    if(global.config.debug) console.log("cancelInterview() id:",id);
    return axios.delete(`http://localhost:8000/api/appointments/${id}`, { appointment })
    .then((res) => {
      if(global.config.debug) console.log("cancelINTERVIEW - PUT response:",res.status);
      setState({...state, appointments})
      return;
    })
  }


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

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
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

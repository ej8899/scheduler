import React, { useEffect, useState } from "react";
import axios from "axios";
import "components/Application.scss";

import DayList  from "components/DayList.js";
import Appointment  from "components/Appointment/index.js";


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
const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};



export default function Application(props) {
  const [state, setState] = useState ({
    day: "Tuesday",
    days: [],
    appointments: {},
  })

  // for combined state object
  // https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w18/activities/929?journey_step=55
  const setDay = (day) => {
    setState({ ...state, day });
  };
  const setDays = (days) => {
    setState(prev => ({...state,days}));
  };

  // https://dmitripavlutin.com/react-useeffect-explanation/
  useEffect(() => {
    const testURL = `http://localhost:8001/api/days`;
    axios.get(testURL)
    .then(response => {
      if(global.config.debug) console.log("axiosGET(days):",response.data);
      setDays(response.data);
    });
  }, []) // empty array says to run ONCE after initial load of Application
  

  const appointmentList = Object.values(appointments).map((item) => {
    return (
      <Appointment
        key={item.id}
        {...item}
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import "components/Application.scss";

import DayList  from "components/DayList.js";
import Appointment  from "components/Appointment/index.js";


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
  const [day, setDay] = useState("Tuesday"); // default day
  const [days,setDays] = useState([]);

  useEffect(() => {
    const testURL = `http://localhost:8001/api/days`;
    axios.get(testURL)
    .then(response => {
      if(global.config.debug) console.log("axiosGET(days):",response.data);
      setDays(response.data);
    });
  }, [])
  

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
  
      <DayList days={days} value={day} onChange={setDay} />

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

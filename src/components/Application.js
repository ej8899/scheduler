import React, { useState } from "react";

import "components/Application.scss";

import DayList  from "components/DayList.js";



// TEST DATA for DayListItem
const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
  {
    id: 4,
    name: "Thurs",
    spots: 16,
  },
];


export default function Application(props) {
  const [day, setDay] = useState("Tuesday");
  
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
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}

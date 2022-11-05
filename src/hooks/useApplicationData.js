
//
// useApplicationData.js
//
// https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w19/activities/967?journey_step=56
//

// Our useApplicationData Hook will return an object with four keys:

// [x] The state object will maintain the same structure.
// [] The setDay action can be used to set the current day.
// [] The bookInterview action makes an HTTP request and updates the local state.
// [] The cancelInterview action makes an HTTP request and updates the local state.

import { useState, useEffect } from "react";
import axios from "axios";

const baseURL = "http://localhost:8001/api/";

export default function useApplicationData() {

//
// finDay(dayName,dayNum)
// use null,dayNum to get back the ENGLISH day of week (passing num of day with 0 as monday)
// use dayName,null to get back NUMBER of day of the week (passing name of day)
function findDay(dayName,dayNum) {
  if(global.config.debug) console.log("DAYName input: ",dayName);
  if(global.config.debug) console.log("DAYNum input: ",dayNum);
  const daysList = {
    Monday:   0,
    Tuesday:  1,
    Wednesday:2,
    Thursday: 3,
    Friday:   4,
  }
  if(dayName) {
    return daysList[dayName];
  }
  if(dayNum) {
    return Object.keys(daysList).find(key => daysList[key] === dayNum);
  }
}

const d = new Date();
const dayName = findDay(null,d.getDay()-1);
if(global.config.debug) console.log("WHAT DAY IS IT: ",dayName);
if (dayName === "Saturday" || dayName === "Sunday") {
  dayName === "Tuesday";
}

//
// initial setState
//
const [state, setState] = useState ({
  day: dayName, // default on start up is "today"
  days: [],
  appointments: {},
});


// for combined state object
// https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w18/activities/929?journey_step=55
const setDay = (day) => {
  setState({ ...state, day });
};




//
//
//
useEffect(() => {
  const daysURL         = `${baseURL}days`;
  const appointmentURL  = `${baseURL}appointments`;
  const interviewersURL = `${baseURL}interviewers`;
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


// https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w19/activities/968?journey_step=56
function spotsRemaining(type) {
    let day = {};
    const numDayOfWeek = findDay(state.day); // convert written day of week to day number
    if(global.config.debug) console.log("state.day:",numDayOfWeek);
    // reminder - we add to spots available if we remove an existing appointment!
    if(type === "increase") {
      day = {
        ...state.days[numDayOfWeek],
        spots: state.days[numDayOfWeek].spots + 1,
      }
    } else if (type === "decrease") {
      day = {
        ...state.days[numDayOfWeek],
        spots: state.days[numDayOfWeek].spots - 1,
      }
    }
    
    let days = state.days;
    days[numDayOfWeek] = day;
    return days;
}


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
  return axios.put(`${baseURL}appointments/${id}`, { interview })
  .then((res) => {
    if(global.config.debug) console.log("BOOKINTERVIEW - PUT response:",res.status);
    // 204 is all good
    // TODO error handling?

    const days = spotsRemaining("decrease");
    setState({ ...state, appointments, days });
    return res.status;
  })
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
  return axios.delete(`${baseURL}appointments/${id}`, { appointment })
  .then((res) => {
    if(global.config.debug) console.log("cancelINTERVIEW - PUT response:",res.status);

    const days = spotsRemaining("increase");
    setState({...state, appointments, days});
    return res.status;
  })
}


return {
  state, 
  setDay,
  bookInterview,
  cancelInterview
}

} // end of useApplicationData()
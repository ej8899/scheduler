
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

const baseURL = "http://localhost:8001/api";

export default function useApplicationData() {

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const d = new Date();
const dayName = days[d.getDay()];
if (dayName === "Saturday" || dayName === "Sunday") {
  dayName === "Tuesday";
}
const [state, setState] = useState ({
  day: dayName,
  days: [],
  appointments: {},
});


// for combined state object
// https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w18/activities/929?journey_step=55
const setDay = (day) => {
  setState({ ...state, day });
};


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
      return res.status;
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
      return res.status;
    })
  }


return {
  state, 
  setDay,
  bookInterview,
  cancelInterview
}

}
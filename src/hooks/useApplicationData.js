//
// useApplicationData.js
//
// https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w19/activities/967?journey_step=56
//

// Our useApplicationData Hook will return an object with four keys:
// [x] The state object will maintain the same structure.
// [x] The setDay action can be used to set the current day.
// [x] The bookInterview action makes an HTTP request and updates the local state.
// [x] The cancelInterview action makes an HTTP request and updates the local state.

import { useReducer, useState, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APP_DATA,
  SET_INTERVIEW,
} from "reducers/application.js";

import useVisualMode from "./useVisualMode";
//import axios from "__mocks__/axios";
const baseURL = "http://localhost:8001/api/";

export default function useApplicationData() {
  //
  // finDay(dayName,dayNum)
  // use null,dayNum to get back the ENGLISH day of week (passing num of day with 0 as monday)
  // use dayName,null to get back NUMBER of day of the week (passing name of day)
  function findDay(dayName, dayNum) {
    if (global.config.debug) console.log("DAYName input: ", dayName);
    if (global.config.debug) console.log("DAYNum input: ", dayNum);
    const daysList = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4,
      Saturday: 5,
      Sunday: 6,
    };
    if (dayName) {
      return daysList[dayName];
    }
    if (dayNum) {
      return Object.keys(daysList).find((key) => daysList[key] === dayNum);
    }
  }

  // grab current day or set default day to start on
  const d = new Date();
  let dayName = findDay(null, d.getDay() - 1);
  if (global.config.debug) console.log("WHAT DAY IS IT: |" + dayName + "|");
  if (dayName === "Saturday" || dayName === "Sunday" || dayName === undefined) {
    dayName = "Monday";
    if (global.config.debug)
      console.log("WHAT DAY IS IT NOW (change from sat/sun): ", dayName);
  }
  // default to Monday (for testing) - set through config.js
  if (!global.config.useToday) {
    dayName = "Monday";
  }

  //
  // initial setState
  //
  // const [state, setState] = useState({
  //   day: dayName, // default on start up is "today"
  //   days: [],
  //   appointments: {},
  // });
  const [state, dispatch] = useReducer(reducer, {
    day: dayName,
    days: [],
    appointments: {},
    interviewers: {},
  });



  // for combined state object
  // https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w18/activities/929?journey_step=55
  const setDay = (day) => dispatch({ type: SET_DAY, day: day, })

  //
  // grab data
  //
  function grabData() {
    const daysURL = `/api/days`;
    const appointmentURL = `/api/appointments`;
    const interviewersURL = `/api/interviewers`;
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentURL),
      axios.get(interviewersURL),
    ])
      .then((all) => {
        if (global.config.debug) console.log("axiosGET(DAYS):", all[0].data);
        if (global.config.debug)
          console.log("axiosGET(APPOINTMENTS):", all[1].data);
        if (global.config.debug)
          console.log("axiosGET(INTERVIEWERS):", all[2].data);
        dispatch({
          type: SET_APP_DATA,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        });
      })
      .catch((err) => {
        console.error("ERR in axiosGET:", err);
      });
      global.config.newData=true;
  }

  //
  // initial load functions
  //
  useEffect(() => {
    grabData();

    // WEB SOCKETS:
    // setup for web sockets / websockets - auto update if multiple instances of app are running
    // https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w19/activities/974?journey_step=56&workbook=24
    const wsocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL || "ws://localhost:8001");
    wsocket.onopen = () => {
      if(global.config.debug) console.log("Web socket opened");
      wsocket.send("Ping");
    };
    wsocket.onmessage = (event) => {
      if(global.config.debug) console.log("wsocket message rx'd:",JSON.parse(event.data));
      let socketMessage = JSON.parse(event.data);
      if (socketMessage.type === "SET_INTERVIEW") {
        dispatch({
          type: SET_INTERVIEW,
          id: socketMessage.id,
          spots: "add",
          interview: socketMessage.interview,
        })
      }
    }
  }, []);

  
  // 
  // updateAppointmentList -- support required data adjustments for drag and drop
  // TODO - how can we implement transitions here??
  //
  function updateAppointmentList(id,interview,initialID) {
    // TODO cleanup this code and console.log
    
    // read the ID - get the new time
    // in state.appointments
    const newTime = state.appointments[id].time;
    console.log("new time:",newTime)
    // above checks out to here

    // restructure appointments
    //console.log("appointments list(BEFORE):",state.appointments)
    // just need to insert interview into interview
    const studentName = interview.student;
    const interviewerId = interview.interviewer.id;
    const appointment = {
      ...state.appointments[id],
      interview: { student:studentName, interviewer:interviewerId },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    //console.log("restructure appointments;",appointments)
    // above correct to here
  
    cancelInterview(initialID)
    .then((res) => {
      if (global.config.debug) console.log("DEL item response:", res);
      //transition(EMPTY, true);
    })
    .catch((err) => {
      if (global.config.debug) console.error(err);
      // transition(ERROR_DELETE, true);
    });
  
    bookInterview(id,appointment.interview)
    .then((res) => {
      console.log("BOOKINTERVIEW RESULT:", res);
      //transition("SHOW");
    })
    .catch((err) => {
      console.error(err);
      //transition(ERROR_SAVE, true);
    });
    
    grabData();
    // console.log("appointments list(AFTER state):",state.appointments); // back to null in id3
  }

  //
  // bookInterview (save into DB)
  //
  function bookInterview(id, interview) {
    // PUT data into db: https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w19/activities/963?journey_step=56&workbook=24
    // reminder, this is TWO STEP action with axios.put
    return axios
      .put(`${baseURL}appointments/${id}`, { interview })
      .then((res) => {
        dispatch({
          type: SET_INTERVIEW,
          id,
          spots: "add",
          interview,
        })
      });
  }

  //
  // cancelInterview (delete From DB)
  //
  function cancelInterview(id, interview = null) {
    if (global.config.debug) console.log("cancelInterview() id:", id);
    return axios
      .delete(`${baseURL}appointments/${id}`)
      .then((res) => {
        dispatch({
          type: SET_INTERVIEW,
          id,
          spots: "del",
          interview: null,
        })
      });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    updateAppointmentList,
  };
} // end of useApplicationData()

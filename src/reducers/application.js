export const SET_DAY = "SET_DAY";
export const SET_APP_DATA = "SET_APP_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";


function spotsRemaining(state, day, process) {
  // https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w19/activities/972?journey_step=56&workbook=24
  
  // review incomming data
  //console.log("spotsforday state,day",state,day)

  // refactored spotsforday counter
  return state.days
    .find(searchDay => searchDay.name === day)
    .appointments.reduce((spotCounter, appointmentId) => {
      return state.appointments[appointmentId].interview ? spotCounter : spotCounter + 1;
    }, 0);

}

export default function reducer(state, action) {
  // https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w19/activities/972?journey_step=56&workbook=24
  const currentDay = state.days.find( day => day.appointments.includes(action.id));

  switch (action.type) {

    case SET_DAY:
      return {
        ...state,
        day: action.day
      };

    case SET_APP_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };

    case SET_INTERVIEW: {
      const newState = {
        ...state,
        appointments: {
          ...state.appointments,
          [action.id]: {
            ...state.appointments[action.id],
            interview: action.interview
          }
        }
      };
      return {
        ...newState,
        days: state.days.map(day => ({
          ...day,
          spots: spotsRemaining(newState, day.name, action.spots)
        }))
      };
    }
    default:
      throw new Error(
        `Unsupported reducer action: ${action.type}`
      );
  }
}
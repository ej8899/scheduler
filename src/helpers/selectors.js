import config from "config";


//... returns an array of appointments for that day
// https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w18/activities/928?journey_step=55&workbook=23
export function getAppointmentsForDay(state, day) {

  let appointmentArray = [];

  if(global.config.debug) console.log("selectors - appointmentsforday:state",state)
  if(global.config.debug) console.log("selectors - appointmentsforday:day",day)

  // extract items only for matching day
  const filterStateDays = state.days.filter(theDay => theDay.name === day);

  // no data, let's return before needless work
  if (filterStateDays.length === 0 || state.days.length === 0) {
    return appointmentArray;
  }

  if(global.config.debug) console.log("selectors - filterStateDays:",filterStateDays);

  // assemble just hte appointmnet array
  const appointments = filterStateDays[0].appointments;
  for(let appointment of appointments) {
    appointmentArray.push(state.appointments[appointment]);
  }

  if(global.config.debug) console.log("selectors - appointmentArray (RETURN data) (for day)",appointmentArray);
  return appointmentArray;
}
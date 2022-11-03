import "config";


//
//
//
//... returns an array of appointments for that day
// https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w18/activities/928?journey_step=55&workbook=23
export function getAppointmentsForDay(state, day) {
  // TODO refactor into something cleaner
  let appointmentArray = [];

  if(global.config.debug) console.log("selectors - appointmentsforday:state",state)
  if(global.config.debug) console.log("selectors - appointmentsforday:day",day)

  // extract items only for matching day
  const filterStateDays = state.days.filter(theDay => theDay.name === day);

  // no data, let's return before needless work
  if(isFalsey(filterStateDays.length) || isFalsey(state.days.length)) return [];
    

  if(global.config.debug) console.log("selectors - filterStateDays:",filterStateDays);

  // assemble just hte appointmnet array
  const appointments = filterStateDays[0].appointments;
  for(let appointment of appointments) {
    appointmentArray.push(state.appointments[appointment]);
  }

  if(global.config.debug) console.log("selectors - appointmentArray (RETURN data) (for day)",appointmentArray);
  return appointmentArray;
}


//
//
//
// https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w18/activities/945?journey_step=55
export function getInterview(state, interview) {
  if(global.config.debug) console.log("TEST:interview:",interview)
  if (global.config.isFalsey(interview)) return null;

  const filterInterview = {};
  filterInterview.student = interview.student;
  if(global.config.debug) console.log("TEST:state.interviewers:",state.interviewers);
  filterInterview.interviewer = state.interviewers[interview.interviewer];
  if(global.config.debug) console.log("TEST:getInterview RETURN:",filterInterview)
  return filterInterview;
}

//
//
//
export function getInterviewersForDay(state, day) {
  let appointmentArray = [];
  // TODO this is a mess -- refactor and cleanup w chainage
  
  if(global.config.debug) console.log("selectors - appointmentsforday:state",state)
  if(global.config.debug) console.log("selectors - appointmentsforday:day",day)

  // extract items only for matching day
  const filterStateDays = state.days.filter(theDay => theDay.name === day);

  // no data, let's return before needless work
  if(isFalsey(filterStateDays.length) || isFalsey(state.days.length)) return [];
    

  
  // assemble just hte appointmnet array
  const appointments = filterStateDays[0].interviewers;
  for(let appointment of appointments) {
    appointmentArray.push(state.interviewers[appointment]);
  }

  if(global.config.debug) console.log("selectors - appointmentArray (RETURN data) (for day)",appointmentArray);
  return appointmentArray;
}
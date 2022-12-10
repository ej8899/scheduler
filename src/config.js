//
// GLOBAL object
//

// TASK:
// add this to index.js
// import './config.js'; // for global configuration variables (EJ added)

module.exports = global.config = {
  // application details:
  appVersion: "1.1",
  appDeveloper: "Ernie Johnson",

  // debug mode true or false
  // usage is:  if (global.config.debug) console.log("debugging info here"); // or of course, other options for debug purposes
  debug: false,

  cookiesModal: true, // use modal windows in this app.
  useToday: true, // use today to set current day view in scheduler - fails tests if true (tests were modified to support this - to remove)

  // additional global vars and functions:
  editsOpen: {},
  deleteOpen: false,
  editRef: null,
  newData: false,      // todo - evaluate for viability
  useWebSockets: true, // todo - implement as a toggle option
  timeClock: 24,       // 12 or 24 for clock setting - will save to localstorage

  link: {
    github: "https://github.com/ej8899/scheduler",
    linkedin: "https://ca.linkedin.com/in/ernie-johnson-3b77829b",
    twitter: "http://www.twitter.com/ejdevscom",
  },

  // isFalsey(value) - is true if false value - checks Nan, 0, null, undefined, false, and ""
  isFalsey: function (value) {
    return !value;
  },
};

/*
Setup for a global function like this:

const isFalsey = (value) => !value;
global.isFalsey = isFalsey;

*/

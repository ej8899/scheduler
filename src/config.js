//
// GLOBAL object
//

// TASK:
// add this to index.js
// import './config.js'; // for global configuration variables (EJ added)

module.exports = global.config = {
  // application details:
  appVersion: "1.0",
  appDeveloper: "Ernie Johnson",

  // debug mode true or false
  // usage is:  if (global.config.debug) console.log("debugging info here"); // or of course, other options for debug purposes
  debug: false,

  cookiesModal: true,
  
  // additional global vars and functions:
  editsOpen: {},
  editRef: null,

  // isFalsey(value) - is true if false value - checks Nan, 0, null, undefined, false, and ""
  isFalsey: function(value) { return !value},
};


// isFalsey(value) - is true if false value - checks Nan, 0, null, undefined, false, ""
// ! above function inside our global object works fine to.
const isFalsey = (value) => !value;
global.isFalsey = isFalsey;


//
// GLOBAL object
//

// TASK:
// add this to index.js
// import './config.js'; // for global configuration variables (EJ added)

module.exports = global.config = {
  // debug mode true or false
  // usage is:  if (global.config.debug) console.log("debugging info here"); // or of course, other options for debug purposes
  debug: false,
  editsOpen: {},
  editRef: null,

  // isFalsey(value) - is true if false value - checks Nan, 0, null, undefined, false, ""
  isFalsey: function(value) { return !value},
};


// isFalsey(value) - is true if false value - checks Nan, 0, null, undefined, false, ""
// ! above function inside our global object works fine to.
const isFalsey = (value) => !value;
global.isFalsey = isFalsey;


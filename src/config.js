//
// GLOBAL object
//

// TASK:
// add this to index.js
// import './config.js'; // for global configuration variables (EJ added)

module.exports = global.config = {
  // debug mode true or false
  // usage is:  if (global.config.debug) console.log("debugging info here"); // or of course, other options for debug purposes
  debug: true,
};
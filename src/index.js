import React from "react";
import ReactDOM from "react-dom";

import "index.scss";

import Application from "components/Application";

import 'config.js'; // for global configuration variables (EJ added)
import 'zlog.js';   // console log replacement

ReactDOM.render(<Application />, document.getElementById("root"));

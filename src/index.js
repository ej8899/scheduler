import React from "react";
import ReactDOM from "react-dom";

import "index.scss";

import Application from "components/Application";
import 'config.js'; // for global configuration variables (EJ added)

ReactDOM.render(<Application />, document.getElementById("root"));

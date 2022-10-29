import React from "react";
import "components/Appointment/styles.scss";


//
// https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w17/activities/900?journey_step=54 
//

export default function Error(props) {



return (

<main className="appointment__card appointment__card--error">
  <section className="appointment__error-message">
    <h1 className="text--semi-bold">Error</h1>
    <h3 className="text--light">{props.message}</h3>
  </section>
  <img
    className="appointment__error-close"
    src="images/close.png"
    alt="Close"
    onClick={props.onClose}
  />
</main>

);

};
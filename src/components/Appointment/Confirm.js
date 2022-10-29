import React from "react";
import "components/Appointment/styles.scss";
import Button from "components/Button.js";

//
// https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w17/activities/900?journey_step=54 
//

export default function Confirm(props) {


// The <Confirm> component should accept the following props:
// message:String eg. "Delete the appointment?"
// onConfirm:Function to be called when the user clicks the Confirm button
// onCancel:Function to be called when the user clicks the Cancel button
if (global.config.debug) console.log("in CONFIRM:props",props)

return (

<main className="appointment__card appointment__card--confirm">
  <h1 className="text--semi-bold">{props.message}</h1>
  <section className="appointment__actions">
    <Button danger onClick={props.onCancel}>Cancel</Button>
    <Button danger onClick={props.onConfirm}>Confirm</Button>
  </section>
</main>

);

};
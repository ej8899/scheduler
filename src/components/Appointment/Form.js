import React from "react";
import "components/Appointment/styles.scss";
import Button from "components/Button.js";
import InterviewerList from "components/InterviewerList.js";

//
// https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w17/activities/900?journey_step=54 
//

export default function Form(props) {

  if (global.config.debug) console.log("in FORM:props",props)

return (

<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value = {props.student}
        /*
          This must be a controlled component
          your code goes here
        */
      />
    </form>
    <InterviewerList 
      interviewers={props.interviewers}
      value={props.interviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={props.onCancel}>Cancel</Button>
      <Button confirm onClick={props.onSave}>Save</Button>
    </section>
  </section>
</main>

);

};
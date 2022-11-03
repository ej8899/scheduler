import React, { useState } from "react";
import "components/Appointment/styles.scss";
import Button from "components/Button.js";
import InterviewerList from "components/InterviewerList.js";

//
// https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w17/activities/900?journey_step=54 
//

export default function Form(props) {
// STATE
const [student, setStudent] = useState(props.student || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);

// FUNCTIONS
const reset = function () {
  setStudent("");
  setInterviewer(null);
};
const cancel = function () {
  reset();
  props.onCancel();
};

if (global.config.debug) console.log("in FORM:props",props)
if (global.config.debug) console.log("in FORM:STATE:student",student)
if (global.config.debug) console.log("in FORM:STATE:interviewer",interviewer)

return (

<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value = {student}
        onChange={(event) => setStudent(event.target.value)}
        
        // !REMINDER - we have to use state
        // !QUESTION - can or should we just not capture on 'submit' instead? save CPU cycles?

      />
    </form>
    <InterviewerList 
      interviewers={props.interviewers}
      value={interviewer}
      interviewer={props.interviewer}
      onChange={setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm 
        onClick={props.onSave(student,interviewer)}
        // TODO State should be showing onSave - or should it?  Maybe check w instructor.
        >Save</Button>
    </section>
  </section>
</main>

);

};
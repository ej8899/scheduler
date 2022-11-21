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
  const [error, setError] = useState("");
  const [name, setName] = useState(props.name || "");

  // FUNCTIONS
  const reset = function () {
    //setStudent("");
    setName("");
    setInterviewer(null);
  };
  const cancel = function () {
    reset();
    setError("");
    props.onCancel();
  };

  if (global.config.debug) console.log("in FORM:props", props);
  if (global.config.debug) console.log("in FORM:STATE:student", student);
  if (global.config.debug)
    console.log("in FORM:STATE:interviewer", interviewer);

  function validate() {
    if (global.config.debug) console.log("in FORM:VALIDATE");
    //if (student === "") {
    if (name === "") {
      setError("student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer...");
      return;
    }
    setError("");
    //props.onSave(student, interviewer);
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form
          id={props.time}
          autoComplete="off"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            className="appointment__create-input text--semi-bold"
            //name="name"
            name={props.name}
            type="text"
            placeholder="Enter Student Name"
            // value = {student}
            value={name}
            //onChange={(event) => setStudent(event.target.value)}
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"

            // !REMINDER - we have to use state
            // !QUESTION - can or should we just not capture on 'submit' instead? save CPU cycles?
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          interviewer={props.interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger id={props.time} onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={(event) => validate()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

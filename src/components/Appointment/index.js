import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Form from "components/Appointment/Form.js";
import Status from "components/Appointment/Status.js";
import Confirm from "components/Appointment/Confirm.js";
import useVisualMode from "hooks/useVisualMode.js";
//
// https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w17/activities/900?journey_step=54 
//

export default function Appointment(props) {
  const EMPTY   = "EMPTY";
  const SHOW    = "SHOW";
  const CREATE  = "CREATE";
  const SAVE    = "SAVE";
  const DELETE  = "DELETE";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  if (global.config.debug) console.log("in Appointment - props:",props)

  function save(name, interviewer) {
    if (global.config.debug) console.log("in Appointment - save - name:",name)
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVE);
    // this returns ASYNC ("later") when done - need to run transitions here!
    props.bookInterview(props.id, interview)
      .then((res) => {
        if(global.config.debug) console.log("BOOKINTERVIEW RESULT:", res)
        transition(SHOW);
      })
      .catch((err) => {
        console.error(err)
      })
  }


  function remove() {
    if(global.config.debug) console.log("in REMOVE():props",props)
    transition(CONFIRM); // show the 'deleting in progress' message
    props.cancelInterview(props.id)
      .then((res) => {
        console.log("DELETE item response:", res)
        transition(EMPTY, true);
      }).catch((err) => {
        console.error(err)
        transition(ERROR_DELETE);
      })
  }


  return (
  <article className="appointment">
  <Header time={props.time} />

  {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

  {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={() => {transition(DELETE)}}
      onEdit={() => {transition(EDIT)}}
    />
  )}

  {mode === CREATE && 
  <Form 
      interviewers={props.interviewers}
      onSave={save}
      onCancel={() => {console.log("onCancel");transition(EMPTY)}}
    />
  }

{mode === DELETE && 
  <Confirm
  message={"Delete this interview?"}
  onCancel={() => {back()}}
  onConfirm={remove}
  /> }

  { mode === SAVE && <Status message={"Saving Appointment..."}/>}
  { mode === CONFIRM && <Status message={"Deleting..."}/>}
  </article>
  );

};
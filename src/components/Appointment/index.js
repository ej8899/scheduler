import React, { useState } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Form from "components/Appointment/Form.js";
import Status from "components/Appointment/Status.js";
import Confirm from "components/Appointment/Confirm.js";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode.js";
import ZModal from "components/Modal";
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
  const EDIT    = "EDIT";
  const ERROR_SAVE    = "ERROR_SAVE"
  const ERROR_DELETE  = "ERROR_DELETE"

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  let errorType ='';

  if (global.config.debug) console.log("in Appointment - props:",props)

  // using zModal
  const [showModal,setShowModal] = useState(false);
  const [modalError,setModalError] = useState();

  function save(name, interviewer) {

    if(!name || !interviewer) {
      // can't have a null

      // this was for initial error modal before discovering project that deals with the errors here
      
      // let messageUpdate;
      // if (global.config.debug) console.log("ERROR - trying to save NULL values");
      // if(!name) { messageUpdate = "student name" }
      // if(!interviewer) { messageUpdate = "interviewer" }
      // if (global.config.debug) console.log("ERROR -",errorType);
      // setModalError(messageUpdate);
      // setShowModal(true);
      return;
    }

    if (global.config.debug) console.log("in Appointment - save - name:",name)
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVE);
    // this returns ASYNC ("later") when done - need to run transitions here!
    props
      .bookInterview(props.id, interview)
      .then((res) => {
        if(global.config.debug) console.log("BOOKINTERVIEW RESULT:", res)
        transition(SHOW);
      })
      .catch((err) => {
        if(global.config.debug) console.error(err);
        transition(ERROR_SAVE,true);
      })
  }


  function del() {
    if(global.config.debug) console.log("in DEL():props",props)
    // see below for CONFIRM,true for 'double back' in:
    // https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w19/activities/966?journey_step=56&workbook=24
    transition(CONFIRM,true); // show the 'deleting in progress' message
    props
      .cancelInterview(props.id)
      .then((res) => {
        if(global.config.debug) console.log("DEL item response:", res);
        transition(EMPTY,true);
      }).catch((err) => {
        if(global.config.debug) console.error(err);
        // replacing mode
        // https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w19/activities/966?journey_step=56&workbook=24
        transition(ERROR_DELETE,true);
      })
  }


  return (
    
  <article className="appointment">
  <Header time={props.time}/>
  
  {mode === EMPTY && 
    <Empty onAdd={() => transition(CREATE)} />}

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

  {mode === EDIT && 
    <Form
    onCancel={() => {back()}}
    onSave={save}
    student={props.interview.student}
    interviewer={props.interview.interviewer.id}
    interviewers={props.interviewers}
    />}

  {mode === DELETE && 
    <Confirm
    message={"Delete this interview?"}
    onCancel={() => {back()}}
    onConfirm={del}
    /> }

  { mode === SAVE && 
    <Status message={"Saving Appointment..."}/>}

  { mode === CONFIRM && 
    <Status message={"Deleting..."}/>}

{ mode === ERROR_SAVE && 
    <Error  message={"Could not save.  Try again later."} onClose={() => {back()}}/>}

  { mode === ERROR_DELETE && 
    <Error  message={"Could not delete.  Try again later."} onClose={() => {back()}}/>}

  </article>
  );

};
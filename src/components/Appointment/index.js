import React, { useEffect, useRef, useState } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Form from "components/Appointment/Form.js";
import Status from "components/Appointment/Status.js";
import Confirm from "components/Appointment/Confirm.js";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode.js";

//
// https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w17/activities/900?journey_step=54
//

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVE = "SAVE";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  let errorType = "";


  //
  // extrastretch -- don't allow more than one edit form open at a time
  //
  function editOpen() {
    // if delete panel is open, do not allow a new edit
    if (global.config.deleteOpen) return;

    // if exists a schedule time in editsOpen, force a click on button w id of editsOpen 'time' (id)
    // get the cancel button of form id of this
    if (!global.config.isFalsey(global.config.editsOpen.current)) {
      global.config.editsOpen.current.click();
    }
    global.config.editsOpen = {};
  }

  // using zModal - just to catch vague saving errors
  const [showModal, setShowModal] = useState(false);
  const [modalError, setModalError] = useState();

  // TODO - finish building out dynamic tooltip messages
  const [theTip, updateTip] = useState("click schedule an interview");
  
  useEffect(() => { 
    if(global.config.deleteOpen === true) {
      //console.log('changing tool tip')
      updateTip("Cancel or Confirm your delete interview action first!"); 
    }
  }, [mode]);
  

  function save(name, interviewer) {
    if (!name || !interviewer) {
      // can't have a null
      // this was for initial error modal before discovering project that deals with the errors here
      let messageUpdate;
      if (global.config.debug)
        console.log("ERROR - trying to save NULL values");
      if (!name) {
        messageUpdate = "student name";
      }
      if (!interviewer) {
        messageUpdate = "interviewer";
      }
      if (global.config.debug) console.log("ERROR -", errorType);
      setModalError(messageUpdate);
      setShowModal(true);
      return;
    }
    // modal
    //let messageUpdate ="in saving"
    //setModalError(messageUpdate);
    //setShowModal(true);

    if (global.config.debug) console.log("in Appointment - save - name:", name);
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVE);
    // this returns ASYNC ("later") when done - need to run transitions here!
    props
      .bookInterview(props.id, interview)
      .then((res) => {
        if (global.config.debug) console.log("BOOKINTERVIEW RESULT:", res);
        transition(SHOW);
      })
      .catch((err) => {
        if (global.config.debug) console.error(err);
        transition(ERROR_SAVE, true);
      });
  }

  function del() {
    // see below for CONFIRM,true for 'double back' in:
    // https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w19/activities/966?journey_step=56&workbook=24
    transition(CONFIRM, true); // show the 'deleting in progress' message
    global.config.deleteOpen = false;
    props
      .cancelInterview(props.id)
      .then((res) => {
        if (global.config.debug) console.log("DEL item response:", res);
        transition(EMPTY, true);
      })
      .catch((err) => {
        if (global.config.debug) console.error(err);
        // replacing mode
        // https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w19/activities/966?journey_step=56&workbook=24
        transition(ERROR_DELETE, true);
      });
  }
  if (mode === DELETE) global.config.deleteOpen = true;

  return (
    <article className="appointment dragitem" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY && (
        <Empty
          keyname = {props.id}
          dragEnterFn={props.dragEnterFn}
          dragStartFn={props.dragStartFn}
          dragEndFn={props.dragEndFn}
          toolTip={theTip}
          
          onAdd={() => {
            if (!global.config.deleteOpen === true) {
              // delete panel is NOT open so we can allow user to create new entry
              editOpen();
              transition(CREATE);
            }
          }}
        />
      )}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          keyname = {props.id}
          dragStartFn={props.dragStartFn}
          dragEnterFn={props.dragEnterFn}
          dragEndFn={props.dragEndFn}
          onDelete={() => {
            if (global.config.deleteOpen === true) return;
            editOpen();
            transition(DELETE);
          }}
          onEdit={() => {
            if (global.config.deleteOpen === true) return;
            editOpen();
            transition(EDIT);
          }}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          time={props.time}
          onSave={save}
          onCancel={() => {
            transition(EMPTY);
          }}
        />
      )}

      {mode === EDIT && (
        <Form
          onCancel={() => {
            back();
          }}
          onSave={save}
          student={props.interview.student}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
        />
      )}

      {mode === DELETE && (
        <Confirm
          message={"Delete this interview?"}
          id={props.time}
          onCancel={() => {
            global.config.deleteOpen = false;
            back();
          }}
          onConfirm={del}
        />
      )}

      {mode === SAVE && <Status message={"Saving Appointment..."} />}

      {mode === CONFIRM && <Status message={"Deleting..."} />}

      {mode === ERROR_SAVE && (
        <Error
          message={"Could not save.  Try again later."}
          onClose={() => {
            back();
          }}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
          message={"Could not delete.  Try again later."}
          onClose={() => {
            back();
          }}
        />
      )}
    </article>
  );
}

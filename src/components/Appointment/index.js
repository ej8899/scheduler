import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Form from "components/Appointment/Form.js";
import useVisualMode from "hooks/useVisualMode.js";
//
// https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w17/activities/900?journey_step=54 
//

export default function Appointment(props) {
  const EMPTY   = "EMPTY";
  const SHOW    = "SHOW";
  const CREATE  = "CREATE";
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  if (global.config.debug) console.log("in Appointment - props:",props)



return (
<article className="appointment">
<Header time={props.time} />

{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

{mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
  />
)}

{mode === CREATE && 
<Form 
    interviewers={props.interviewers}
    onSave={() => console.log("onSave")}
    onCancel={() => {console.log("onCancel");transition(EMPTY)}}
  />
}


</article>
);

};
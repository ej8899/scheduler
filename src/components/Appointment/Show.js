import React, { useRef } from "react";
import "components/Appointment/styles.scss";
import Tooltip from "../Tooltips/Tooltip.js";

//
// https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w17/activities/900?journey_step=54
//

export default function Show(props) {
  if (global.config.debug) console.log("in SHOW:props", props);

console.log(props)
  return (
    <main className="appointment__card appointment__card--show dragitem" 
      draggable
      onDragStart={(e) => {props.dragStartFn(e,props.keyname)}}
      onDragEnd={props.dragEndFn}
      >
      <section className="appointment__card-left">
        <h2 className="text--regular">{props.student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{props.interviewer.name}</h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Tooltip content="Edit this appointment" direction="left">
            <img
              className="appointment__actions-button"
              src="images/edit.png"
              alt="Edit"
              onClick={props.onEdit}
            />
          </Tooltip>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Tooltip content="Delete this appointment" direction="left">
            <img
              className="appointment__actions-button"
              src="images/trash.png"
              alt="Delete"
              onClick={props.onDelete}
            />
          </Tooltip>
        </section>
      </section>
    </main>
  );
}

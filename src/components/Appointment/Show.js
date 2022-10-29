import React from "react";
import "components/Appointment/styles.scss";


//
// https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w17/activities/900?journey_step=54 
//

export default function Show(props) {

  if (global.config.debug) console.log("in SHOW:props",props)

return (

<main className="appointment__card appointment__card--show">
  <section className="appointment__card-left">
    <h2 className="text--regular">{props.student}</h2>
    <section className="interviewer">
      <h4 className="text--light">Interviewer</h4>
      <h3 className="text--regular">{props.interviewer.name}</h3>
    </section>
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <img
        className="appointment__actions-button"
        src="images/edit.png"
        alt="Edit"
        onClick={props.onEdit}
      />
      <img
        className="appointment__actions-button"
        src="images/trash.png"
        alt="Delete"
        onClick={props.onDelete}
      />
    </section>
  </section>
</main>

);

};
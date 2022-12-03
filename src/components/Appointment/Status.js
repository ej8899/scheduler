import React from "react";
import "components/Appointment/styles.scss";
import "components/Appointment/spinner.scss";

//
// https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w17/activities/900?journey_step=54
//

export default function Status(props) {
  return (
    <main className="appointment__card appointment__card--status">
        <div className="spinner-box">
        <div className="circle-border">
          <div className="circle-core"></div>
        </div>  
        </div>

      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  );
}

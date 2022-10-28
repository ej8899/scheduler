import React from "react";
import classNames from "classnames";
import 'components/InterviewerListItem.scss';

export default function InterviewListItem(props) {
  
  // deal with classes
  const componentClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  function clickHandler() {
    //props.setInterviewer(props.id);
    props.setInterviewer; 
    // above  line is refactored from above -- which ties to refactor of INterviewerList
    // see here: https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w17/activities/898?journey_step=54&workbook=22
    if (global.config.debug) console.log("TEST of click handler in InterviewListItem:PROPS:",props)
    // or could have used this in onClick={() => props.setInterviewer(props.id)}
    // or (after our refactor would be just onclick={props.setInterviewer})
  } 

  return (

  <li className={componentClass} onClick={props.setInterviewer}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
  </li>

);

}
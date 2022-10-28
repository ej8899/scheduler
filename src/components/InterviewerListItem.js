import React from "react";
import classNames from "classnames";
import 'components/InterviewerListItem.scss';

export default function InterviewListItem(props) {
  
  // deal with classes
  const componentClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  function clickHandler() {
    props.setInterviewer(props.id);
    if (global.config.debug) console.log("TEST of click handler in InterviewListItem:PROPS:",props)
    // or could have used this in onClick={() => props.setInterviewer(props.id)}
  } 

  return (

  <li className={componentClass} onClick={clickHandler}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
  </li>

);

}
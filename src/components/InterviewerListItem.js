import React from "react";
import classNames from "classnames";
import 'components/InterviewerListItem.scss';

export default function InterviewListItem(props) {
  
  // deal with classes
  const componentClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });


  return (

  <li className={componentClass} onClick={() => props.setInterviewer(props.id)}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
</li>

);

}
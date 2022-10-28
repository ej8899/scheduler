import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";



export default function interviewerList(props) {

  if(global.config.debug) console.log("interviewerList PROPS:",props)

  const interviewerArray = props.interviewers.map((item) => {
    return (
      <InterviewerListItem
        key={item.id}
        id={item.id}
        name={item.name}
        avatar={item.avatar}
        selected={item.id === props.interviewer}
        setInterviewer={props.setInterviewer}
      />
    )
  });

  return (

    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerArray}
      </ul>
    </section>

  );
}

import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";



export default function interviewerList(props) {
  const {} = props;
  if(global.config.debug) console.log("interviewerList PROPS:",props)

  // !IMPORTANT --DON'T FORGET THE KEY !!
  const interviewerArray = props.interviewers.map((item) => {
    return (
      <InterviewerListItem
        key={item.id}
        
        name={item.name}
        avatar={item.avatar}
        selected={item.id === props.value}
        setInterviewer={(event)=> props.onChange(item.id)}
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

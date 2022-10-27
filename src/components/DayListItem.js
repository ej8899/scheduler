import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  // deal with classes
  const dayListItemClass = classNames("day-list__item",
  {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  function setTheDay() {
    props.setDay(props.name);
  } 

  // process the componenent itself
  return (
    <li className={dayListItemClass} onClick={setTheDay} >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}
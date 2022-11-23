import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  // deal with classes
  const dayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  function formatSpots() {
    if (props.spots === 0) return "no spots remaining";
    if (props.spots === 1) return "1 spot remaining";
    return `${props.spots} spots remaining`;
  }

  function myClickHandler() {
    props.setDay(props.name);
    if (global.config.debug)
      console.log("TEST of click handler in DayListItem");
  } // or this in the onClick handler below: {() => props.setDay(props.name)}

  // process the componenent itself
  return (
    <li
      className={dayListItemClass}
      onClick={() => {
        global.config.deleteOpen = false;
        props.setDay(props.name);
      }}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}

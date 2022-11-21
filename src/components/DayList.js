import React from "react";
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
  // JS section
  if (global.config.debug) console.log("DayList componenent");

  const { days } = props; // dont forget, this is object destructuring - same idea as const days = props.days;
  if (global.config.debug) console.log("days:", days);

  const dayListData = days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
      />
    );
  });

  // RETURN section
  return <ul>{dayListData}</ul>;
}

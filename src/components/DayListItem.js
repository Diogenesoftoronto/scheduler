import React from "react";
import classNames from "classnames";
import './DayListItem.scss'

export default function DayListItem(props) {
  // const {name, spots, setDay, selected} = props;
  const spotsFull = props.spots === 0;
  let formatSpots; 
  formatSpots = spotsFull ? formatSpots = "no spots" 
  : props.spots > 1 ? formatSpots = props.spots+" spots" 
  : formatSpots = props.spots+" spot";
   
  const liClass = classNames("day-list__item",{"day-list__item--selected": props.selected, "day-list__item--full": spotsFull});
  return (
    <li className={liClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots} remaining</h3>
    </li>
  );
}

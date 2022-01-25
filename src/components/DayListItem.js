import React from "react";
import classNames from "classnames";
import './DayListItem.scss'

export default function DayListItem(props) {
  const {name, spots, setDay, selected} = props;
  const spotsFull = spots === 0;
  let formatSpots; 
  formatSpots = spotsFull ? formatSpots = "no spots" 
  : spots > 1 ? formatSpots = spots+" spots" 
  : formatSpots = spots+" spot";
   
  const liClass = classNames("day-list__item",{"day-list__item--selected": selected, "day-list__item--full": spotsFull});
  return (
    <li className={liClass} onClick={() => setDay(props.name)}>
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots} remaining</h3>
    </li>
  );
}

import React from "react";
import classNames from "classnames";
import './DayListItem.scss'

export default function DayListItem(props) {
  // const {name, spots, setDay, selected} = props;
  const spotsFull = props.spots === 0;
  const liClass = classNames("day-list__item",{"day-list__item--selected": props.selected, "day-list__item--full": spotsFull});
  return (
    <li className={liClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}

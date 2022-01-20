import React from 'react';
import DayListItem from './DayListItem'

const DayList = (props) => {
  const DayMap = props.days.map((day) => <DayListItem name={day.name} spots={day.spots} setDay={props.setDay} />);
    return (<ul>{DayMap}</ul>);
}

export default DayList;

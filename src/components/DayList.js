import React from 'react';
import DayListItem from './DayListItem'

const DayList = (props) => {
    const DayMap = props.days.map(
      day => 
      day.name === props.day ? 
      <DayListItem name={day.name} spots={day.spots} setDay={props.setDay} selected />
    : <DayListItem name={day.name} spots={day.spots} setDay={props.setDay} />);

    return (<ul>{DayMap}</ul>);
}

export default DayList;

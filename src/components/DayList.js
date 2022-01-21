import React from 'react';
import DayListItem from './DayListItem'

const DayList = props => {
    const DayMap = props.days.map(
      day => 
      <DayListItem key={day.id} name={day.name} spots={day.spots} setDay={props.onChange} selected={day.name === props.value} />
    )
    return (<ul>{DayMap}</ul>);
}

export default DayList;

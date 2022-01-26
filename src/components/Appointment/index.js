import React from 'react';
import "./styles.scss"
import Header from './Header'
import Show from './Show'
import Empty from './Empty'


const Appointment = props => {
  const {id, time, interview, onEdit, onDelete, onAdd} = props;
  let showComponent = false;
  if (interview) {
    const {student, interviewer} = interview;
    showComponent = <Show student={student} interviewer={interviewer} onEdit={onEdit} onDelete={onDelete}/>
  }
  let appointStr;
  // "Appointment at "+time
  time ? appointStr = null 
  : appointStr =  "No Appointments";
  
  return <article className="appointment"><Header time={time}/>
    {showComponent ? showComponent : <Empty onAdd={onAdd}/>}
      {appointStr}
    </article>
};

export default Appointment;

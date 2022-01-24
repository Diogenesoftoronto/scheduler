import React from 'react';
import "components/Appointment/styles.scss"
import Header from 'components/Appointment/Header'
import Show from 'components/Appointment/Show'
import Empty from 'components/Appointment/Empty'


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

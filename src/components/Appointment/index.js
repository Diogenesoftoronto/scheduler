import React from 'react';
import "./styles.scss"
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import useVisualMode from '../hooks/useVisualMode';
import Form from './Form';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';

const Appointment = props => {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );
  const {id, time, interview, onEdit, onDelete, onAdd} = props;
  const onSave = (name, interviewer) => {console.log(name, interviewer)}
  let showComponent = false;
  let createComponent = false;
  if (mode === SHOW) {
    const {student, interviewer} = interview;
    showComponent = <Show student={student} interviewer={interviewer} onEdit={onEdit} onDelete={onDelete}/>
  }
  console.log(mode)
  if (mode === CREATE) {
    createComponent = <Form interviewers={[]} interview={interview} onCancel={back} onSave={onSave} student={interview.student}/>
  }
  let appointStr;
  // "Appointment at "+time
  time ? appointStr = null 
  : appointStr =  "No Appointments";
  
  return <article className="appointment"><Header time={time}/>
    {showComponent ? showComponent 
    : createComponent ? createComponent : <Empty onAdd={onAdd}/>}
      {appointStr}
    </article>
};

export default Appointment;

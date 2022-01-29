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
  const {id, time, interview, onEdit, onDelete, onAdd} = props;
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
    );
  const onSave = (name, interviewer) => {console.log(name, interviewer)}
  let showComponent = false;
  let createComponent = false;
  if (mode === SHOW) {
    const {student, interviewer} = interview;
    console.log(interview)
    showComponent = <Show student={student} interviewer={interviewer} onEdit={onEdit} onDelete={onDelete}/>
  }
  console.log(mode)
  if (mode === CREATE) {
    console.log("in create mode", interview)
    createComponent = !interview ? <Form interviewers={[]} interview={{student: "N/A", interviewer:{ id: "N/A", name: "N/A", avatar: 'https://image.shutterstock.com/image-illustration/not-available-red-rubber-stamp-260nw-586791809.jpg'}}} onCancel={back} onSave={onSave} student={"N/A"}/> 
    : <Form interviewers={[]} interview={interview} onCancel={back} onSave={onSave} student={interview.student}/>
  }
  let appointStr;
  // "Appointment at "+time
  time ? appointStr = null 
  : appointStr =  "No Appointments";
  
  return <article className="appointment"><Header time={time}/>
    {showComponent ? showComponent 
    : createComponent ? createComponent : <Empty onAdd={() => transition(CREATE)}/>}
      {appointStr}
    </article>
};

export default Appointment;

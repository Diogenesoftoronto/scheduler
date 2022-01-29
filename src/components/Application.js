
import React from "react";
import DayList from "./DayList"
import Appointment from "../components/Appointment";
import "./Application.scss";
import {getAppointmentsForDay, getInterview} from "../helpers/selectors";
import useApplication from "./hooks/useApplication";

function Application (props) {
  const [state, setState] = useApplication(

["/api/days",
 "/api/appointments",
 "/api/interviewers"], 'Monday');
 const {day} = state;
 const setDay = day => setState({ ...state, day });
 
 // render appoints by the selected day
 const appointmentsForDay = getAppointmentsForDay(state, day)
//  console.log("hello world from Application", appointmentsForDay);
 const AppointmentMap = Object.values(appointmentsForDay).map(app =>
  { 
    const interview = getInterview(state, app.interview)
    // console.log("in app componenet", interview)
    return <Appointment
    key={app.id}
    id={app.id}
    time={app.time}
    interview={interview} 
    />})
    return (
      <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={state.days}
  value={day}
  onChange={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {AppointmentMap}
      </section>
    </main>
  );
}
export default Application;
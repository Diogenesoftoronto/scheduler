
import React, {useState, useEffect} from "react";
import DayList from "./DayList"
import Appointment from "./Appointment";
import "./Application.scss";
import useDays from "./hooks/useDays";







export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [appointments, setAppointments] = useState([]);
  const [interviewers, setInterviewers] = useState([]);
  const [days, setDays] = useDays('http://localhost:8001/api/days');
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
  days={days}
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

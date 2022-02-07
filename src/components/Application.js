import React from "react";
import DayList from "./DayList";
import Appointment from "../components/Appointment";
import "./Application.scss";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../helpers/selectors";
import useApplicationData from "./hooks/useApplicationData";

function Application(props) {
  const { state, setDay, bookInterview, deleteInterview } =
    useApplicationData();
  const { day, days } = state;

  // render interviewers by the selected day
  const interviewersArr = getInterviewersForDay(state, day);

  // render appointments by the selected day
  const appointmentsForDay = getAppointmentsForDay(state, day);
  const AppointmentMap = Object.values(appointmentsForDay).map((app) => {
    const interview = getInterview(state, app.interview);
    return (
      <Appointment
        key={app.id}
        id={app.id}
        time={app.time}
        interview={interview}
        interviewers={interviewersArr}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
      />
    );
  });
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
          <DayList days={days} value={day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {AppointmentMap}
        <Appointment key={"last"} time={"5pm"} />
      </section>
    </main>
  );
}
export default Application;


const getAppointmentsForDay = (state, day) => { 
  const appointmentDay = state.days.find(appDay => appDay.name === day)
  let filteredDay;
  !appointmentDay ? filteredDay = [] 
  : filteredDay = Object.values(state.appointments).filter(appointment => {
      return appointmentDay.appointments.includes(appointment.id)
    });
  return filteredDay;
}

export default getAppointmentsForDay;
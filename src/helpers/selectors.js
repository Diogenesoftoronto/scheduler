const getAppointmentsForDay = (state, day) => {
  const { days, appointments } = state;
  const appointmentDay = days.find((appDay) => appDay.name === day);
  let filteredDay;
  !appointmentDay
    ? (filteredDay = [])
    : (filteredDay = Object.values(appointments).filter((appointment) => {
        return appointmentDay.appointments.includes(appointment.id);
      }));
  return filteredDay;
};

// create a function that returns the interviewers for the day
const getInterviewersForDay = (state, day) => {
  const { days, interviewers } = state;
  const interviewerForDay = days.find((interDay) => interDay.name === day);
  let filteredInterviewers;
  !interviewerForDay
    ? (filteredInterviewers = [])
    : (filteredInterviewers = Object.values(interviewers).filter(
        (interviewer) => {
          return interviewerForDay.interviewers.includes(interviewer.id);
        }
      ));
  return filteredInterviewers;
};

const getInterview = (state, interview) => {
  let result = {};
  const { interviewers } = state;
  const helperInterview = (interviewers, interview) => {
    const result = {};
    const { student } = interview;
    let interviewer = Object.values(interviewers).find(
      (inter) => interview.interviewer === inter.id
    );
    if (!interviewer) {
      interviewer = {
        id: "N/A",
        name: "N/A",
        avatar:
          "https://image.shutterstock.com/image-illustration/not-available-red-rubber-stamp-260nw-586791809.jpg",
      };
    }

    Object.assign(result, {
      student,
      interviewer,
    });
    return result;
  };

  !interview
    ? (result = null)
    : (result = helperInterview(interviewers, interview));
  return result;
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };

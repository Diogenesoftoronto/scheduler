
const getAppointmentsForDay = (state, day) => { 
  const {days, appointments} = state;
  const appointmentDay = days.find(appDay => appDay.name === day)
  let filteredDay;
  !appointmentDay ? filteredDay = [] 
  : filteredDay = Object.values(appointments).filter(appointment => {
      return appointmentDay.appointments.includes(appointment.id)
    });
  return filteredDay;
}


const getInterview = (state, interview) => {

  let result = {}
  let student = null;
  const { interviewers } = state;

  const helperInterview = (interviewers, interview ) => {
    const result = {}
    const {student} = interview;
    let interviewer = Object.values(interviewers).find(inter => interview.interviewer === inter.id);
    if (!interviewer) { 
      interviewer = { 
        id: 'N/A',
        name: 'N/A',
        avatar: 'https://image.shutterstock.com/image-illustration/not-available-red-rubber-stamp-260nw-586791809.jpg'
      }
    }
      // console.log("interview-->", interview, "<----\n",
      //             "interviewer--->", interviewer, "<----\n",
      //             "student--->", student,
      //             "state---->",state);
      
      Object.assign(result, {
        student,
        interviewer
      })
      return result;
  }
  
  !interview ?  result = null 
  : result = helperInterview(interviewers, interview);
    return result;
}

export {getAppointmentsForDay, getInterview};
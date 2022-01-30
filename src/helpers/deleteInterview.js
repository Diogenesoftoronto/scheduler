import axios from 'axios';

// this function returns a promise that when fulfilled: deletes the interview from the server, and updates the state.
// pure function version dont know how to get it to work
const deleteInterview = async(id, state, setState) => {
  const appointment = {
    ...state.appointments[id],
    interview: null,
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  const deleteInterviewPromise = axios.delete(`/api/appointments/${id}`).then(setState({ ...state, appointments }));
  // console.log("cancelInterview", id, appointment, appointments);
  return deleteInterviewPromise;
};
export default deleteInterview;
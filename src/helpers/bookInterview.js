import axios from 'axios';

 // This function will change the local state when we book an interview.
//  pure function version dont know how to get it to work
const bookInterview = async(id, interview, state, setState) => {
  
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview },
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  
  
  // sends a put request using axios to the server with the useEffect hook
    const bookingPromise = axios.put(`/api/appointments/${id}`, {
      interview: { ...interview },
      }).then(setState({ ...state, appointments }));

  return bookingPromise;
};

export default bookInterview;
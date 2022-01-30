import { useEffect, useState } from "react";
import axios from "axios";

const useApplication = (
  urls = ["/api/days", "/api/appointments", "/api/interviewers"],
  day = "Monday"
) => {
  const [state, setState] = useState({
    day,
    days: [],
    appointments: {},
    interviewers: {},
    pending: true,
    error: null,
  });
  const setDay = (day) => setState({ ...state, day });
  // This function will change the local state when we book an interview.
  const bookInterview = async (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // sends a put request using axios to the server with the useEffect hook
    const bookingPromise = axios
      .put(`/api/appointments/${id}`, {
        interview: { ...interview },
      })
      .then(setState({ ...state, appointments }));

    // console.log("bookInterview", id, interview, appointments, appointments); // id, interview
    return bookingPromise;
  };

  const deleteInterview = async (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const deleteInterviewPromise = axios
      .delete(`/api/appointments/${id}`)
      .then(setState({ ...state, appointments }));
    // console.log("cancelInterview", id, appointment, appointments);
    return deleteInterviewPromise;
  };
  // console.log("hello world", urls);
  // return the responses from the axios requests and set the state state

  /**
   *@param {String[]} urls
   */
  function getstate(urls) {
    const getResponses = urls.map((url) => axios.get(url));
    Promise.all(getResponses)
      .then((responseArr) => {
        // console.log("responseArr", responseArr);
        const [daysResponse, appointmentsResponse, interviewersResponse] =
          responseArr;

        // console.log("daysResponse", daysResponse.data);
        // console.log("appointmentsResponse", appointmentsResponse.data);
        // console.log("interviewersResponse", interviewersResponse.data);
        setState((prev) => {
          return {
            ...prev,
            // days: daysResult,
            // appointments: appointmentsResult,
            // interviewers: interviewersResult,
            days: daysResponse.data,
            appointments: appointmentsResponse.data,
            interviewers: interviewersResponse.data,
            pending: false,
            error: null,
          };
        });
      })
      .catch((error) => {
        setState((prev) => ({
          ...prev,
          pending: false,
          error: error,
        }));
      });
  }
  // useEffect to get the state
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getstate(urls), [...urls]);

  return { state, setState, setDay, bookInterview, deleteInterview };
};

export default useApplication;

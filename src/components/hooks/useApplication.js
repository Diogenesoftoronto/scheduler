import { useEffect, useState } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "../../helpers/selectors";

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
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(appointments);
    console.log("yo", state);
    // sends a put request using axios to the server with the useEffect hook
    const bookingPromise = axios
      .put(`/api/appointments/${id}`, {
        interview: { ...interview },
      })
      .then(() => {
        setState({ ...state, days, appointments });
      });

    // console.log("bookInterview", id, interview, appointments, appointments); // id, interview
    return bookingPromise;
  };
  // This function will update the spots when we book or cancel an interview via the useEffect hook, and setState.

  // This function will update the spots when we book or delete an interview via setState.
  const deleteInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(appointments);
    const deleteInterviewPromise = axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, days, appointments });
      });

    // console.log("cancelInterview", id, appointment, appointments);
    return deleteInterviewPromise;
  };
  const updateSpots = (appointments) => {
    // loop over days
    const nullSpotsForDay = (day, appointments) => {
      let counter = 0;
      for (const id of day.appointments) {
        if (appointments[id].interview === null) {
          counter+=1;
        }

      }
      return counter;
    }
    const updateDays = state.days.map((currentDay) => {

      return {
        ...currentDay, 
        spots: nullSpotsForDay(currentDay, appointments)
      }
    })
    return updateDays;
  }

  // find appointments where the interview is null  and set the spots to the number of those appointments;
  const updateSpots2 = () => {
    const appointmentsForDay = getAppointmentsForDay(state, state.day);
    const appWhereInterviewNull = appointmentsForDay.filter((appointment) => {
      return appointment.interview === null;
    });
    const spots = appWhereInterviewNull.length;
    const findDayByName = state.days.findIndex((day) => day.name = state.day)

    const day = {
      ...state.days[findDayByName],
      spots
    };
    const days = [
      ...state.days
    ];
    days[findDayByName] = day

    console.log("dayyyyyy",day);
    // days of the week
 
   

    // console.log("updateSpots", day, id, state.appointments, spots);
    // sends a put request using axios to the server
    // const spotsPromise = axios
    // .put(`/api/days/${id}`, { spots })
    // .then(setState({ ...state, days }));
    console.log("in update", days);
    return days;
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

  return {
    state,
    setState,
    setDay,
    bookInterview,
    deleteInterview,
  };
};

export default useApplication;

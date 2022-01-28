import { useEffect, useState } from "react";
import axios from "axios";


const useDays = (urls, day) => {
   const [data, setData] = useState({
  day,
  days: [],
  appointments: {},
  interviewers: {},
  pending: true,
  error: null
  });
  console.log("hello world", urls);
  // return the responses from the axios requests and set the data state
  function getData (urls) {
    const getResponses = urls.map(url => axios.get(url))
    Promise.all(getResponses).then(responseArr => {
      // console.log("responseArr", responseArr);
      const [daysResponse, appointmentsResponse, interviewersResponse] = responseArr;
      // const [first, second, third] = all;
      // const daysResult = first.data;
      // const appointmentsResult = second.data;
      // const interviewersResult = third.data;
      // console.log("daysResponse", daysResponse.data)
        // console.log("appointmentsResponse", appointmentsResponse.data)
          // console.log("interviewersResponse", interviewersResponse.data)
        setData(prev => {
          return ({
          ...prev,
          // days: daysResult,
          // appointments: appointmentsResult,
          // interviewers: interviewersResult,
          days: daysResponse.data,
          appointments: appointmentsResponse.data,
          interviewers: interviewersResponse.data,
          pending: false,
          error: null
        })
      })
    }
      ).catch(error => {
        setData(prev =>( {
          ...prev,
          pending: false,
          error: error
        }));
      });
  }
  const getData2 = () => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      const [first, second, third] = all;
      const daysResult = first.data;
      const appointmentsResult = second.data;
      const interviewersResult = third.data;
      setData((prev) => ({
        ...prev,
        days: daysResult,
        appointments: appointmentsResult,
        interviewers: interviewersResult,
      }));
    });
  };
  useEffect(getData2(), [urls]);
  

  return [data, setData];
}

export default useDays;
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
  // return the responses from the axios requests and set the data state
  function getData (urls) {
    const getResponses = urls.map(url => axios.get(url));
    Promise.all(getResponses).then(responseArr => {
      const [daysResponse, appointmentsResponse, interviewersResponse] = responseArr;
        setData(prev => ({
          day,
          days: daysResponse.data,
          appointments: appointmentsResponse.data,
          interviewers: interviewersResponse.data,
          pending: false,
          error: null
        }))}
      )
      .catch(error => {
        setData(prev =>( {
          ...prev,
          pending: false,
          error: error
        }));
      });
  }
 
  useEffect(getData(urls), [urls]);

  return data;
}

export default useDays;
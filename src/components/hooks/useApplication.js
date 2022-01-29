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
  // console.log("hello world", urls);
  // return the responses from the axios requests and set the data state
  function getData (urls) {
    const getResponses = urls.map(url => axios.get(url))
    Promise.all(getResponses).then(responseArr => {
      // console.log("responseArr", responseArr);
      const [daysResponse, appointmentsResponse, interviewersResponse] = responseArr;
    
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
  // useEffect to get the data
  useEffect(() => getData(urls), [urls]);
  

  return [data, setData];
}

export default useDays;
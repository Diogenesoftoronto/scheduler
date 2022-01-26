import { useEffect, useState } from "react";
import axios from "axios";

const appointments = {
  "1": { id: 1, time: "12pm", interview: null },
  "2": { id: 2, time: "1pm", interview: null },
  "3": {
    id: 3,
    time: "2pm",
    interview: { student: "Archie Cohen", interviewer: 2 }
  },
  "4": { id: 4, time: "3pm", interview: null },
  "5": {
    id: 5,
    time: "4pm",
    interview: { student: "Chad Takahashi", interviewer: 2 }
  }
}

const useAppointments = url => {
  const [data, setData] = useState(appointments);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then(response => 
        prev => setData(...prev, response.data)
      )
      .catch(error => {
        setError(error);
      });
  }, [url]);

  return data;
}

export default useAppointments;
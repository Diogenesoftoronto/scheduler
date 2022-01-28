import { useEffect, useState } from "react";
import axios from "axios";


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
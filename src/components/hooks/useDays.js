import { useEffect, useState } from "react";
import axios from "axios";


const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];

const useDays = url => {
  const [data, setData] = useState(days);
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

export default useDays;
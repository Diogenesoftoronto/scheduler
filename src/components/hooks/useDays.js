import { useEffect, useState } from "react";
import axios from "axios";


// const days = [
//     {
//       id: 1,
//       name: "Monday",
//       spots: 2,
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       spots: 5,
//     },
//     {
//       id: 3,
//       name: "Wednesday",
//       spots: 0,
//     },
//   ];

const useDays = (url, days) => {
  // const [days, setDays] = useState(null);

  // const [data, setData] = useState({
  // days,
  // pending: true,
  // error: null
  // });

  useEffect(() => {
    axios
      .get(url)
      .then( 
        // response => 
        // prev => setData({
        //   ...prev, 
        //   days : response.data,
        //   pending: false, 
        //   error: null
        // })  
          response => setDays(response.data)
      
      )
      .catch(error => {
        setData(error);
      });
  }, [url]);

  return data;
}

export default useDays;
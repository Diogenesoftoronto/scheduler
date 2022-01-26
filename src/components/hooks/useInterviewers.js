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
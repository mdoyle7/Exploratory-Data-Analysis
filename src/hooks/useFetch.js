// hooks.js
import { csv } from "d3-fetch";
import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchUrl() {
    const response = await csv("https://raw.githubusercontent.com/mdoyle7/Exploratory-Data-Analysis/main/energy-mining.csv.txt?token=AJBBLIB34IBMYBCXBBSFBU3ARNQ5U");
    setData(response);
    setLoading(false);
  }
  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loading];
};

export { useFetch };

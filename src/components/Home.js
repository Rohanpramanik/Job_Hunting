import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const requestOptions = {
    method: "POST",
  };

  const fetchDetails = async () => {
    await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setJobs(data.jdList);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <>
      <JobCard data={jobs} />
    </>
  );
};

export default Home;

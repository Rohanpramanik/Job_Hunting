import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import FilterOption from "./FilterOption";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
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
        setFilteredJobs(data.jdList);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <>
      <FilterOption
        jobsData={jobs}
        setFilteredJobs={setFilteredJobs}
        filteredJobs={filteredJobs}
      />
      <JobCard data={filteredJobs} />
    </>
  );
};

export default Home;

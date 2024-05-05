import { useState } from "react";
import Select from "react-select";
import "../style/FilterOption.css";

const FilterOption = ({ jobsData, setFilteredJobs }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filterOptions = [
    {
      name: "Role",
      options: [
        { value: "Frontend", label: "Frontend" },
        { value: "Backend", label: "Backend" },
        { value: "Fullstack", label: "Fullstack" },
        { value: "Devops", label: "Devops" },
        { value: "IOS", label: "IOS" },
        { value: "Flutter", label: "Flutter" },
        { value: "Tech Lead", label: "Tech Lead" },
        { value: "Android", label: "Android" },
      ],
    },
    {
      name: "Name Of Employees",
      options: [
        { value: "1-10", label: "1-10" },
        { value: "11-20", label: "11-20" },
        { value: "21-50", label: "21-50" },
        { value: "51-100", label: "51-100" },
        { value: "101-200", label: "101-200" },
        { value: "201-500", label: "201-500" },
        { value: "500+", label: "500+" },
      ],
    },
    {
      name: "Experience",
      options: [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
        { value: "7", label: "7" },
        { value: "8", label: "8" },
        { value: "9", label: "9" },
        { value: "10", label: "10" },
      ],
    },
    {
      name: "Remote",
      options: [
        { value: "Remote", label: "Remote" },
        { value: "Hybrid", label: "Hybrid" },
        { value: "In-Office", label: "In-Office" },
      ],
    },
    {
      name: "Minimum Base Pay Salary",
      options: [
        { value: "0L", label: "0L" },
        { value: "10L", label: "10L" },
        { value: "20L", label: "20L" },
        { value: "30L", label: "30L" },
        { value: "40L", label: "40L" },
        { value: "50L", label: "50L" },
        { value: "60L", label: "60L" },
        { value: "70L", label: "70L" },
      ],
    },
  ];

  const handleClick = (selectedOption, filterName) => {
    console.log(selectedOption);
    let updatedJobs = jobsData;
    if (filterName === "Role") {
      console.log("role");
      updatedJobs = updatedJobs.filter((job) =>
        selectedOption.some(
          (option) => option.value.toLowerCase() === job.jobRole.toLowerCase()
        )
      );
    } else if (filterName === "Name Of Employees") {
      updatedJobs = updatedJobs.filter((job) =>
        selectedOption.some((option) => {
          const [min, max] = option.value.split("-");
          return (
            job.numberOfEmployees >= parseInt(min) &&
            job.numberOfEmployees <= parseInt(max)
          );
        })
      );
    } else if (filterName === "Experience") {
      updatedJobs = updatedJobs.filter((job) =>
        selectedOption.some((option) => option.value == job.minExp)
      );
    } else if (filterName === "Remote") {
      const item = selectedOption.map((item) => item.value);
      if (
        item.includes("Hybrid") ||
        (item.includes("In-Office") && item.includes("Remote"))
      ) {
        updatedJobs = jobsData;
      } else if (item.includes("Remote")) {
        updatedJobs = updatedJobs.filter((job) =>
          selectedOption.some(
            (option) =>
              option.value.toLowerCase() === job.location.toLowerCase()
          )
        );
      }
    } else if (filterName === "Minimum Base Pay Salary") {
      updatedJobs = updatedJobs.filter((job) =>
        selectedOption.some((option) => {
          const minSalary = parseInt(option.value.replace("L", "")) * 100000;
          return job.salary >= minSalary;
        })
      );
    }
    setFilteredJobs(updatedJobs);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    const filteredData = jobsData.filter((job) =>
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredJobs(filteredData);
  };

  return (
    <div className="filter-container">
      {filterOptions.map((item) => (
        <div key={item.name} style={{ margin: 5 }}>
          <Select
            className="filter-btn"
            options={item.options}
            name={item.name}
            defaultValue={item.name}
            placeholder={item.name}
            onChange={(selectedOption) =>
              handleClick(selectedOption, item.name)
            }
            isMulti
            isSearchable
            noOptionsMessage={() => "No Options"}
          />
        </div>
      ))}
      <input
        type="text"
        className="search-input"
        placeholder="Search Company Name"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default FilterOption;

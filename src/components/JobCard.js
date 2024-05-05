import React from "react";
import "../style/Card.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions, Grid } from "@mui/material";

const JobCard = ({ data }) => {
  if (data === undefined) return <h1>we can use shimmer UI here</h1>;
  return (
    <div className="card-container">
      {data.map((job) => (
        <div className="job-card" key={job.jdUid}>
          <Card>
            <CardContent className="card-header">
              <Grid className="img">
                {/* Image */}
                <img
                  src={job.logoUrl}
                  alt="Company"
                  style={{ width: "100%", height: "auto" }}
                />
              </Grid>
              <Grid className="img-desc">
                <Typography
                  variant="h5"
                  component="div"
                  className="img-desc-header"
                >
                  {job.companyName}
                </Typography>
                <Typography variant="h5" component="div" className="sub-header">
                  <p className="desc-text">{job.jobRole}</p>
                  <p className="sub-text">{job.location}</p>
                </Typography>
              </Grid>
            </CardContent>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                Estimated Salary: ₹
                {job.minJdSalary ? job.minJdSalary + " - " : ""}{" "}
                {job.maxJdSalary ? job.maxJdSalary : "<"} LPA ✅
              </Typography>
              <Typography variant="h5" component="div" className="desc">
                About Company :
              </Typography>
              <Typography variant="body2" className="job-description fade-out">
                {job.jobDetailsFromCompany}
              </Typography>
              <Typography variant="body2" color="primary" className="show-more">
                <a
                  href="#"
                  style={{ color: "#1976d2", textDecoration: "none" }}
                >
                  Show more
                </a>
              </Typography>
              <Typography
                variant="h5"
                component="div"
                className="exp-container"
              >
                Minimum Experience
                <h3>{job.minExp || "Not mentioned"}</h3>
              </Typography>
            </CardContent>
            <CardActions className="action-btn">
              <Button className="btn no-hover">⚡Easy Apply</Button>
              <Button className="btn no-hover">Ask for referal</Button>
            </CardActions>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default JobCard;

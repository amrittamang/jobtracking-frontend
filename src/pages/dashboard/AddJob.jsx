import React, { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { Alert, FormRow, FormRowSelect } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { jobAction } from "../../store/job-slice";
import { alertAction } from "../../store/alert-slice";

const AddJob = () => {
  const baseURL = "http://localhost:3000/api/v1";
  const {
    isLoading,
    isEditing,
    position,
    company,
    jobLocation,
    status,
    jobType,
    jobTypeOptions,
    statusOptions,
    editJobId,
  } = useSelector((state) => state.job);
  const { showAlert } = useSelector((state) => state.alert);
  const { token } = useSelector((state) => state.account);

  const initialState = isEditing
    ? {
      position,
      company,
      jobLocation,
      status,
      jobType,
    }
    : {
      position: "",
      company: "",
      jobLocation: "",
      status: "",
      jobType: "",
    };

  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    /*  if (!position || !company || !jobLocation) {
     displayAlert()
     return
     } */
    const job = {
      position: values.position,
      company: values.company,
      jobLocation: values.jobLocation,
      jobType: values.jobType,
      status: values.status,
    };
    if (isEditing) {
      editJob(job);
      return;
    }
    createJob(job);
  };

  const createJob = async (job) => {
    dispatch(jobAction.addJobBegin());
    try {
      const { data } = await axios.post(`${baseURL}/jobs`, job, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(jobAction.addJobSuccess(data?.job));
      dispatch(
        alertAction.showAlert({
          alertType: "success",
          alertText: "Job added successfully",
        })
      );
      clearJob();
    } catch (error) {
      console.log("Error in create job", error.response.data.msg);
      dispatch(
        alertAction.showAlert({
          alertType: "danger",
          alertText: error.response.data.msg,
        })
      );

    }
    dispatch(jobAction.addJobError());
    setTimeout(() => {
      dispatch(alertAction.hideAlert());
    }, 3000);
  };

  const editJob = async (job) => {
    try {
      const res = await fetch(`${baseURL}/jobs/${editJobId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const product = await res.json();
      console.log("Product:", product);
      dispatch(
        alertAction.showAlert({
          alertType: "success",
          alertText: "Job edited successfully!",
        })
      );
    } catch (error) {
      console.log("Error:", error);
      dispatch(
        alertAction.showAlert({ alertType: "danger", alertText: error })
      );
    }
    setTimeout(() => {
      dispatch(alertAction.hideAlert());
    }, 3000);
  };

  const handleJobInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const clearJob = () =>
    setValues({
      position: "",
      company: "",
      jobLocation: "",
      status: "",
      jobType: "",
    });

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* position */}
          <FormRow
            type="text"
            name="position"
            value={values.position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type="text"
            name="company"
            value={values.company}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            value={values.jobLocation}
            handleChange={handleJobInput}
          />
          {/* job status */}
          <FormRowSelect
            name="status"
            value={values.status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* job type */}
          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={values.jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          {/* btn container */}
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            {!isEditing &&
              <button
                className="btn btn-block clear-btn"
                onClick={(e) => {
                  e.preventDefault();
                  clearJob();
                }}
              >
                clear
              </button>
            }
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;

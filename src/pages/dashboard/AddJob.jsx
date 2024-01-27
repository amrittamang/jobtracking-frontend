import React from 'react'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { Alert, FormRow, FormRowSelect } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import {
  HANDLE_CHANGE,
  CREATE_JOB,
  EDIT_JOB,
  CLEAR_JOB,
  ADD_JOB_BEGIN,
  ADD_JOB_SUCCESS,
  ADD_JOB_ERROR,
  SHOW_SUCCESS_ALERT,
  SHOW_ERROR_ALERT,
  HIDE_ALERT,
} from '../../context/actions';

const AddJob = () => {
  const baseURL = 'http://localhost:3000/api/v1';
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    clearValues,
    token,
    editJobId
  } = useSelector(state => state.job);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()

    /*  if (!position || !company || !jobLocation) {
     displayAlert()
     return
     } */
    const job = { position, company, jobLocation, jobType, status };
    if (isEditing) {
      editJob()
      return
    }
    createJob({ job, alertText: 'Job added successfully' });
  }

  const createJob = async ({ job, alertText }) => {
    dispatch({ type: ADD_JOB_BEGIN });
    try {
      const res = await axios.post(
        `${baseURL}/jobs`,
        job,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      dispatch({
        type: ADD_JOB_SUCCESS,
        payload: { alertText },
      });
      dispatch({ type: CLEAR_JOB });
    } catch (error) {
      console.log("Error in create job", error);
      dispatch({
        type: ADD_JOB_ERROR,
        payload: { alertText: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const editJob = async (id) => {
    try {
      const res = await fetch(`${baseURL}/jobs/${editJobId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ position, company, jobLocation, jobType, status })
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const product = await res.json();
      console.log('Product:', product);
      dispatch({ type: SHOW_SUCCESS_ALERT, payload: { alertText: 'Job edited successfully!' } })
    } catch (error) {
      console.log('Error:', error);
      dispatch({ type: SHOW_ERROR_ALERT, payload: { alertText: error } })
    }
    clearAlert();
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: HIDE_ALERT });
    }, 3000);
  };

  const handleChange = (name, value) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: {
        [name]: value,
      },
    });
  };


  const handleJobInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange(name, value)
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* position */}
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* job status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* job type */}
          <FormRowSelect
            name='jobType'
            labelText='job type'
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          {/* btn container */}
          <div className='btn-container'>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault()
                clearValues()
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
import React, { useReducer, useContext, ReactNode } from "react";

import reducer from "./reducer";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

import {
  SHOW_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  LOGOUT_USER,
  TOGGLE_SIDEBAR,
  HIDE_ALERT,
  HANDLE_CHANGE,
  ADD_JOB_BEGIN,
  ADD_JOB_ERROR,
  ADD_JOB_SUCCESS,
  CLEAR_JOB,
  GET_JOBS_BEGINS,
  GET_JOBS_SUCCESS,
  EDIT_JOB_BEGINS,
  // DELETE_JOB,
  SHOW_ERROR_ALERT,
  SHOW_SUCCESS_ALERT,
} from "./actions";

type User = {
  userId: string;
  name: string;
  email: string;
  password: string;
};

type Job = {
  jobId: string;
  company: string;
  position: string;
  status: string;
  jobType: string;
  jobLocation: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

interface InitialState {
  userLoading: boolean;
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  user: User | null;
  token: string | null;
  userLocation: string;
  showSidebar: false;
  isEditing: false;
  editJobId: string;
  position: string;
  company: string;
  jobLocation: string;
  jobTypeOptions: string[];
  jobType: string;
  statusOptions: Array<string>;
  status: string;
  jobs: Job[];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: {};
  monthlyApplications: [];
  search: string;
  searchStatus: string;
  searchType: string;
  sort: string;
  sortOptions: string[];
}

const initialState: InitialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: null,
  token: null,
  userLocation: "",
  showSidebar: false,
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const AppContext = React.createContext<any>(initialState);
// const baseURL = 'https://jobify-api-g1x9.onrender.com/api/v1';
const baseURL = "http://localhost:3000/api/v1";

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL,
  });

  authFetch.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error);
      if (error.response.status === 401) {
        logoutUser();
      }
    }
  );

  const displayAlert = () => {
    dispatch({ type: SHOW_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: HIDE_ALERT });
    }, 3000);
  };

  interface CurrentUser {
    _id: string;
    name: string;
    email: string;
    password: string;
  }

  type SetupUserProps = {
    currentUser: CurrentUser;
    endPoint: string;
    alertText: string;
  };

  const setupUser = async ({
    currentUser,
    endPoint,
    alertText,
  }: SetupUserProps) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await authFetch.post(`/auth/${endPoint}`, currentUser);

      const { user, location, token } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, location, alertText, token },
      });
    } catch (error: any) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { alertText: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const logoutUser = async () => {
    await authFetch.get("/auth/logout");
    dispatch({ type: LOGOUT_USER });
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const handleChange = (name: string, value: string) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: {
        [name]: value,
      },
    });
  };

  const createJob = async ({
    job,
    alertText,
  }: {
    job: Job;
    alertText: string;
  }) => {
    dispatch({ type: ADD_JOB_BEGIN });
    try {
      await axios.post(`${baseURL}/jobs`, job, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      dispatch({
        type: ADD_JOB_SUCCESS,
        payload: { alertText },
      });
      dispatch({ type: CLEAR_JOB });
    } catch (error: any) {
      console.log("Error in create job", error);
      dispatch({
        type: ADD_JOB_ERROR,
        payload: { alertText: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getJobs = async () => {
    dispatch({ type: GET_JOBS_BEGINS });
    try {
      const { data } = await authFetch.get("/jobs");
      const { jobs, totalJobs } = data;
      dispatch({ type: GET_JOBS_SUCCESS, payload: { jobs, totalJobs } });
    } catch (error) {
      console.log("Error:", error);
    }
    clearAlert();
  };

  const setEditJob = ({
    jobId,
    position,
    company,
    jobLocation,
    jobType,
    status,
  }: Job) => {
    dispatch({
      type: EDIT_JOB_BEGINS,
      payload: { jobId, position, company, jobLocation, jobType, status },
    });
  };

  const editJob = async (id: string) => {
    try {
      const { position, company, jobLocation, jobType, status } = state;
      const res = await fetch(`${baseURL}/jobs/${state.editJobId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          position,
          company,
          jobLocation,
          jobType,
          status,
        }),
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const product = await res.json();
      console.log("Product:", product);
      dispatch({
        type: SHOW_SUCCESS_ALERT,
        payload: { alertText: "Job edited successfully!" },
      });
    } catch (error: any) {
      console.log("Error:", error);
      dispatch({ type: SHOW_ERROR_ALERT, payload: { alertText: error } });
    }
    clearAlert();
  };

  const deleteJob = async (id: string) => {
    try {
      const response = await fetch(`${baseURL}/jobs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      dispatch({
        type: SHOW_SUCCESS_ALERT,
        payload: { alertText: "Job deleted successfully" },
      });
      getJobs();
    } catch (error) {
      dispatch({ type: SHOW_ERROR_ALERT, payload: { alertText: error } });
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        handleChange,
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext, AppContext };

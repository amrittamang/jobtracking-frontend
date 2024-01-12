import React, { useReducer, useContext } from "react";

import actionDispatcher from "./reducer";
import axios from "axios";

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
    DELETE_JOB,
    SHOW_ERROR_ALERT,
    SHOW_SUCCESS_ALERT,
} from "./actions";
import { useNavigate } from "react-router-dom";

const initialState = {
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

const AppContext = React.createContext();
// const baseURL = 'https://jobify-api-g1x9.onrender.com/api/v1';
const baseURL = 'http://localhost:3000/api/v1'

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(actionDispatcher, initialState);

    // axios
    const authFetch = axios.create({
        baseURL,
    })

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

    const setupUser = async ({ currentUser, endPoint, alertText }) => {
        dispatch({ type: SETUP_USER_BEGIN });
        try {
            const { data } = await authFetch.post(
                `/auth/${endPoint}`,
                currentUser
            );

            const { user, location, token } = data;
            dispatch({
                type: SETUP_USER_SUCCESS,
                payload: { user, location, alertText, token },
            });
        } catch (error) {
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

    const handleChange = (name, value) => {
        dispatch({
            type: HANDLE_CHANGE,
            payload: {
                [name]: value,
            },
        });
    };

    const createJob = async ({ job, alertText }) => {
        dispatch({ type: ADD_JOB_BEGIN });
        try {
            const res = await axios.post(
                `${baseURL}/jobs`,
                job,
                {
                    headers: {
                        'Authorization': `Bearer ${state.token}`
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

    const getJobs = async () => {
        dispatch({ type: GET_JOBS_BEGINS });
        try {
            const { data } = await authFetch.get('/jobs');
            const { jobs, totalJobs } = data;
            dispatch({ type: GET_JOBS_SUCCESS, payload: { jobs, totalJobs } });
        } catch (error) {
            console.log('Error:', error);
        }
        clearAlert();
    }

    const setEditJob = ({ jobId, position, company, jobLocation, jobType, status }) => {
        dispatch({ type: EDIT_JOB_BEGINS, payload: { jobId, position, company, jobLocation, jobType, status } });
    }

    const editJob = async (id) => {
        try {
            const { position, company, jobLocation, jobType, status } = state;
            const res = await fetch(`${baseURL}/jobs/${state.editJobId}`, {
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

    const deleteJob = async (id) => {
        try {
            const response = await fetch(`${baseURL}/jobs/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            dispatch({ type: SHOW_SUCCESS_ALERT, payload: { alertText: 'Job deleted successfully' } })
            getJobs();
        } catch (error) {
            dispatch({ type: SHOW_ERROR_ALERT, payload: { alertText: error } })
        }
        clearAlert();
    }

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
                editJob
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

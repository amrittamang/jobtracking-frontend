import {
    SHOW_ALERT,
    HIDE_ALERT,
    LOGOUT_USER,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    TOGGLE_SIDEBAR,
    HANDLE_CHANGE,
    ADD_JOB_BEGIN,
    ADD_JOB_SUCCESS,
    ADD_JOB_ERROR,
    CLEAR_JOB,
    GET_JOBS_BEGINS,
    GET_JOBS_SUCCESS,
    EDIT_JOB_BEGINS,
    SHOW_SUCCESS_ALERT,
    SHOW_ERROR_ALERT
} from './actions';

import { initialState } from './appContext';

const actionDispatcher = (state, action) => {
    switch (action.type) {
        /* case SHOW_ALERT:
            return {
                ...state,
                showAlert: true,
                alertType: 'danger',
                alertText: 'Please provide all values!',
            }; */
        /*  case SHOW_SUCCESS_ALERT:
             return {
                 ...state,
                 showAlert: true,
                 alertType: 'success',
                 alertText: action.payload.alertText || 'Operation Successful'
             };
         case SHOW_ERROR_ALERT:
             return {
                 ...state,
                 showAlert: true,
                 alertType: 'danger',
                 alertText: action.payload.alertText || 'Something went wrong! Please try again later.'
             }; */
        /* case HIDE_ALERT:
            return {
                ...state,
                showAlert: false,
                alertType: '',
                alertText: '',
            }; */
        /*  case LOGOUT_USER:
             return {
                 ...initialState,
                 userLoading: false,
             }; */
        /* case SETUP_USER_BEGIN:
            return {
                ...state,
                isLoading: true,
            }; */
        /* case SETUP_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload.user,
                token: action.payload.token,
                userLoading: false,
                userLocation: action.payload.location,
                jobLocation: action.payload.jobLocation,
                showAlert: true,
                alertType: 'success',
                alertText: action.payload.alertText
            }; */
        /* case SETUP_USER_ERROR:
            return {
                ...state,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.alertText,
                isLoading: false,
            }; */
        /* case TOGGLE_SIDEBAR:
            return {
                ...state,
                showSidebar: !state.showSidebar,
            }; */
        case HANDLE_CHANGE:
            return {
                ...state,
                ...action.payload,
            }
        case CLEAR_JOB:
            const initialJobState = {
                isEditing: false,
                editJobId: '',
                position: '',
                company: '',
                jobLocation: '',
                jobType: 'full-time',
                status: 'pending',
            };

            return {
                ...state,
                ...initialJobState,
            };
        /* case ADD_JOB_BEGIN:
            return {
                ...state,
                isLoading: true,
            }; */
        /*  case ADD_JOB_SUCCESS:
             return {
                 ...state,
                 isLoading: false,
                 showAlert: true,
                 alertType: 'success',
                 alertText: action.payload.alertText
             } */
        case ADD_JOB_ERROR:
            return {
                ...state,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.alertText,
                isLoading: false
            }
        /*  case GET_JOBS_BEGINS:
             return {
                 ...state,
                 isLoading: true,
             } */
        /*  case GET_JOBS_SUCCESS:
             return {
                 ...state,
                 isLoading: false,
                 jobs: action.payload.jobs,
                 totalJobs: action.payload.totalJobs
             } */
        /*  case EDIT_JOB_BEGINS:
             return {
                 ...state,
                 isEditing: true,
                 editJobId: action.payload.jobId,
                 position: action.payload.position,
                 company: action.payload.company,
                 jobLocation: action.payload.jobLocation,
                 jobType: action.payload.jobType,
                 status: action.payload.status
             } */
        default:
            break;
    }
}

export default actionDispatcher;
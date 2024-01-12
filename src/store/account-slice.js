import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../context/appContext';

const accountSlice = createSlice({
    name: 'account-slice',
    initialState,
    reducers: {
        showAlert(state) {
            return {
                ...state,
                showAlert: true,
                alertType: 'danger',
                alertText: 'Please provide all values!',
            };
        },
        hideAlert(state) {
            return {
                ...state,
                showAlert: false,
                alertType: '',
                alertText: '',
            };
        },
        setUpUserBegin(state) {
            return {
                ...state,
                isLoading: true,
            };
        },
        setUpUserSuccess(state, action) {
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
            };
        },
        setUpUserError(state, action) {
            return {
                ...state,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.alertText || 'Something went wrong! Please try again later.'
            };
        },
        logOutUser(state) {
            return {
                ...initialState,
                userLoading: false,
            };
        }
    }
});

export default accountSlice.reducer;

export const accountAction = accountSlice.actions;

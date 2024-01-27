import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    userLocation: "",
    userLoading: false,
};

const accountSlice = createSlice({
    name: "account-slice",
    initialState: initialState,
    reducers: {
        setUpUserBegin(state) {
            return {
                ...state,
                userLoading: true,
            };
        },
        setUpUserSuccess(state, action) {
            return {
                ...state,
                userLoading: false,
                user: action.payload.user,
                token: action.payload.token,
                userLocation: action.payload.location,
                jobLocation: action.payload.jobLocation,
            };
        },
        logOutUser(state) {
            return {
                ...initialState,
                userLoading: false,
            };
        },
    },
});

export default accountSlice.reducer;

export const accountAction = accountSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

const initialStateAlert = {
    showAlert: false,
    alertText: "",
    alertType: "",
};

const alertSlice = createSlice({
    name: "alert-slice",
    initialState: initialStateAlert,
    reducers: {
        showAlert(state, action) {
            return {
                ...state,
                showAlert: true,
                alertText: action.payload.alertText,
                alertType: action.payload.alertType,
            };
        },
        hideAlert(state) {
            return {
                ...state,
                showAlert: false,
                alertType: "",
                alertText: "",
            };
        },
    },
});

export default alertSlice.reducer;

export const alertAction = alertSlice.actions;

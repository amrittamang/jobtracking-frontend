import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './account-slice';
import alertReducer from './alert-slice';
import jobReducer from './job-slice';
import sidebarReducer from './sidebar-slice';

const store = configureStore({
    reducer: {
        account: accountReducer,
        alert: alertReducer,
        job: jobReducer,
        sidebar: sidebarReducer,
    },
});

export default store;
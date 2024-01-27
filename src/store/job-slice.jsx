import { createSlice } from '@reduxjs/toolkit';


const initialStateJob = {
    isLoading: false,
    showAlert: false,
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
}

const jobSlice = createSlice({
    name: 'job-slice',
    initialState: initialStateJob,
    reducers: {
        getJobsBegins(state, action) {
            state.isLoading = true;
        },
        addJobBegin(state, action) {
            state.isLoading = true;
        },
        getJobsSuccess(state, action) {
            return {
                ...state,
                isLoading: false,
                jobs: action.payload.jobs,
                totalJobs: action.payload.totalJobs
            }
        },
        addJobSuccess(state, action) {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
            }
        }
    }
});

export default jobSlice.reducer;

export const jobAction = jobSlice.actions;
import { useEffect } from 'react'
import Loading from './Loading';
import Wrapper from '../assets/wrappers/JobsContainer';
import Job from './Job';
import Alert from './Alert';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { accountAction } from '../store/account-slice';
import { jobAction } from '../store/job-slice';
import { alertAction } from '../store/alert-slice';

const JobsContainer = () => {
    // const baseURL = 'https://jobify-api-g1x9.onrender.com/api/v1';
    const baseURL = 'http://localhost:3000/api/v1'
    const {
        isLoading,
        jobs,
        totalJobs,
    } = useSelector(state => state.job);
    const { showAlert } = useSelector(state => state.alert);
    const dispatch = useDispatch();
    // axios
    const authFetch = axios.create({
        baseURL,
    })

    authFetch.interceptors.response.use(
        (response) => response,
        (error) => {
            console.log(error);
            if (error.response.status === 401) {
                logOut();
            }
        }
    );

    const clearAlert = () => {
        setTimeout(() => {
            dispatch(alertAction.hideAlert());
        }, 3000);
    };

    const logOut = async () => {
        await authFetch.get("/auth/logout");
        dispatch(accountAction.logOutUser());
    };

    const getJobs = async () => {
        dispatch(jobAction.getJobsBegins());
        try {
            const { data } = await authFetch.get('/jobs');
            const { jobs, totalJobs } = data;
            dispatch(jobAction.getJobsSuccess({ jobs, totalJobs }));
        } catch (error) {
            console.log('Error:', error);
        }
        clearAlert();
    }

    useEffect(() => {
        getJobs();
    }, [])

    if (isLoading) {
        return <Loading center />
    }

    if (jobs.length === 0) {
        return (
            <Wrapper><h2>No jobs to display...</h2></Wrapper>
        );
    }

    return (
        <Wrapper>
            {showAlert && <Alert />}
            <h5>
                {totalJobs} Jobs {totalJobs.length > 1 && 's'} found
            </h5>
            <div className='jobs'>
                {jobs.map((job) => {
                    return <Job key={job._id} {...job} getJobs={getJobs} />
                })}
            </div>
        </Wrapper>
    )
}

export default JobsContainer
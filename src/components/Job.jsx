import moment from 'moment'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'
import { useSelector, useDispatch } from 'react-redux';
import { jobAction } from '../store/job-slice';
import { alertAction } from '../store/alert-slice';

const Job = ({
    _id,
    position,
    company,
    jobLocation,
    jobType,
    createdAt,
    status,
}) => {
    const { } = useSelector(state => state.job);
    const dispatch = useDispatch();

    // const baseURL = 'https:/ / jobify - api - g1x9.onrender.com / api / v1';
    const baseURL = 'http://localhost:3000/api/v1'

    const setEditJob = () => {
        dispatch(jobAction.editJobBegins({ jobId: _id, position, company, jobLocation, jobType, status }))
    }

    const deleteJob = async () => {
        try {
            const response = await fetch(`${baseURL}/jobs/${_id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            dispatch(alertAction.showAlert({ alertText: 'Job deleted successfully', alertType: 'success' }));
            // getJobs();
        } catch (error) {
            dispatch(alertAction.showAlert({ alertText: error }));
        }
    };

    let date = moment(createdAt)
    date = date.format('MMM Do, YYYY')
    return (
        <Wrapper>
            <header>
                <div className='main-icon'>{company.charAt(0)}</div>
                <div className='info'>
                    <h5>{position}</h5>
                    <p>{company}</p>
                </div>
            </header>
            <div className='content'>
                <div className='content-center'>
                    <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
                    <JobInfo icon={<FaCalendarAlt />} text={date} />
                    <JobInfo icon={<FaBriefcase />} text={jobType} />
                    <div className={`status ${status}`}>{status}</div>
                </div>
                <footer>
                    <div className='actions'>
                        <Link
                            to='/add-job'
                            className='btn edit-btn'
                            onClick={setEditJob}
                        >
                            Edit
                        </Link>
                        <button
                            type='button'
                            className='btn delete-btn'
                            onClick={() => deleteJob(_id)}
                        >
                            Delete
                        </button>
                    </div>
                </footer>
            </div>
        </Wrapper>
    )
}

export default Job

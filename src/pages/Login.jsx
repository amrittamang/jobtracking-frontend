import { useState, useEffect } from 'react';
import { Logo, FormRow, Alert } from '../components';
import Wrapper from "../assets/wrappers/LandingPage";
import { Form, useNavigate } from 'react-router-dom';
import { accountAction } from '../store/account-slice';
import { alertAction } from '../store/alert-slice';
import axios from "axios";
import {
    useSelector,
    useDispatch
} from 'react-redux';
const initialState = {
    name: '',
    email: '',
    password: '',
};

const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState(initialState);
    const { user, userLoading } = useSelector(state => state.account);
    const { showAlert } = useSelector(state => state.alert);
    const dispatch = useDispatch();

    // const baseURL = 'https://jobify-api-g1x9.onrender.com/api/v1';
    const baseURL = 'http://localhost:3000/api/v1'
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

    const logoutUser = async () => {
        await authFetch.get("/auth/logout");
        dispatch(accountAction.logOutUser());
    };


    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const setupUser = async (currentUser) => {
        dispatch(accountAction.setUpUserBegin());
        try {
            const { data } = await authFetch.post(
                `/auth/login`,
                currentUser
            );

            const { user, location, token, jobLocation } = data;
            dispatch(accountAction.setUpUserSuccess({ user, location, jobLocation, token }));
            dispatch(alertAction.showAlert({ alertType: 'success', alertText: 'Login successful! Redirecting!' }))
        } catch (error) {

            dispatch(alertAction.showAlert({ alertType: 'danger', alertText: error.response.data.msg }))
        }
        setTimeout(() => {
            dispatch(alertAction.hideAlert());
        }, 3000);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = values;
        if (!email || !password) {
            dispatch(alertAction.showAlert({ alertType: 'danger', alertText: 'Please provide required fields!' }));
            setTimeout(() => {
                dispatch(alertAction.hideAlert());
            }, 3000);
            return;
        }
        const currentUser = { email, password };
        setupUser(currentUser);
    };

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/');
            }, 1)
        }
    }, [user, navigate]);
    return (
        <Wrapper className="full-page">
            <form className="form" data-testid="login-form" onSubmit={onSubmit}>
                <Logo />
                <h3>Login</h3>
                {showAlert && <Alert />}
                {/* email input */}
                <FormRow
                    type="email"
                    name="email"
                    value={values.email}
                    handleChange={handleChange}
                />
                {/* password input */}
                <FormRow
                    type="password"
                    name="password"
                    value={values.password}
                    handleChange={handleChange}
                />
                <button type="submit" className="btn btn-block" disabled={userLoading}>submit</button>
                <button
                    type="button"
                    className="btn btn-block btn-hipster"
                    disabled={userLoading}
                    onClick={() => {
                        setupUser({
                            currentUser: { email: 'admin@admin.com', password: 'admin123' },
                            endPoint: 'login',
                            alertText: 'Login Successful! Redirecting...',
                        });
                    }}
                >
                    {userLoading ? 'loading' : 'demo app'}
                </button>
                <p>
                    <span onClick={() => navigate('/register')}>Register</span>
                </p>
            </form>
        </Wrapper>
    );
}

export default Login;
import { useState, useEffect } from 'react';
import { Logo, FormRow, Alert } from '../components';
import Wrapper from "../assets/wrappers/LandingPage";
import { Form, useNavigate } from 'react-router-dom';
import { accountAction } from '../store/account-slice';
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

const Register = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState(initialState);
    const { user, isLoading, showAlert } = useSelector(state => state.account);
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

    const setupUser = async ({ currentUser, alertText }) => {
        dispatch(accountAction.setUpUserBegin());
        try {
            const { data } = await authFetch.post(
                `/auth/register`,
                currentUser
            );

            const { user, location, token } = data;
            dispatch(accountAction.setUpUserSuccess({ user, location, alertText, token }));
        } catch (error) {

            dispatch(accountAction.setUpUserError({ alertText: error.response.data.msg }))
        }
        setTimeout(() => {
            dispatch(accountAction.hideAlert());
        }, 3000);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = values;
        if (!email || !password ) {
            dispatch(accountAction.showAlert());
            setTimeout(() => {
                dispatch(accountAction.hideAlert());
            }, 3000);
            return;
        }
        const currentUser = { name, email, password };
        setupUser({
            currentUser,
            alertText: 'User Created! Redirecting...',
        });
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
            <form className="form" data-testid="register-form" onSubmit={onSubmit}>
                <Logo />
                <h3>Register</h3>
                {showAlert && <Alert />}
                {/* name input */}
                <FormRow
                    type="text"
                    name="name"
                    value={values.name}
                    handleChange={handleChange}
                />
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
                <button type="submit" className="btn btn-block" disabled={isLoading}>submit</button>
                <button
                    type="button"
                    className="btn btn-block btn-hipster"
                    disabled={isLoading}
                    onClick={() => {
                        setupUser({
                            currentUser: { email: 'admin@admin.com', password: 'admin123' },
                            endPoint: 'login',
                            alertText: 'Login Successful! Redirecting...',
                        });
                    }}
                >
                    {isLoading ? 'loading' : 'demo app'}
                </button>
                <p>
                    <span onClick={() => navigate('/login')}>Login</span>
                </p>
            </form>
        </Wrapper>
    );
}

export default Register;
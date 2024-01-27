import { redirect, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const {user, userLoading} = useSelector(state => state.account);
    const navigate = useNavigate();

    // if (userLoading) return <Loading />;
    useEffect(() => {
        if (!user) {
            console.info('User not found navigating to landing page');
            navigate("/landing");
        }
    });

    if (userLoading) {
        return (<Loading />);
    }
    return children;

}

export default ProtectedRoute;
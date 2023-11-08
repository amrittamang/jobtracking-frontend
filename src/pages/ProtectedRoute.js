import { useAppContext } from '../context/appContext';
import { redirect, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { useEffect } from 'react';
const ProtectedRoute = ({ children }) => {
    const { user, userLoading } = useAppContext();
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
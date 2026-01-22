import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuthContext();

    if (!user) {
        // User not authenticated, redirect to login
        return <Navigate to="/login" replace />;
    }

    // User is authenticated, render the children (protected content)
    return children;
};

export default ProtectedRoute;

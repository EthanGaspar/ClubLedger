import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const logout = () => {
        // Remove from localStorage
        localStorage.removeItem('user');

        // Update context
        dispatch({ type: 'LOGOUT' });

        toast.success('Logged out');
        navigate('/login');
    }

    return { logout };
}

export default useLogout;

import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';
import api from '../lib/axios';

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            // Call backend to clear the cookie
            await api.post('/auth/users/logout');
        } catch (error) {
            console.error('Logout error:', error);
        }

        // Update context
        dispatch({ type: 'LOGOUT' });

        toast.success('Logged out');
        navigate('/welcome');
    }

    return { logout };
}

export default useLogout;

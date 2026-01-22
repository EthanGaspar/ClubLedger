import {useState} from 'react';
import { toast } from 'react-hot-toast';
import api from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.post('/auth/users/login', { email, password });

            // Save to localStorage for persistence
            localStorage.setItem('user', JSON.stringify(response.data));

            // Update context
            dispatch({ type: 'LOGIN', payload: response.data });

            toast.success('Logged in successfully!');
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.error || 'Login failed. Please try again.');
            toast.error(error.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    }

    return { login, loading, error };
}

export default useLogin;

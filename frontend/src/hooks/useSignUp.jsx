import { useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const signup = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.post('/auth/users/signup', { email, password });

            // Cookie is set automatically by the browser
            // Update context with user data
            dispatch({ type: 'LOGIN', payload: response.data.user });

            toast.success('Signup successful!');
            navigate('/');
        } catch (error) {
            const backendMsg = error.response?.data?.error || error.response?.data?.message;
            const msg = backendMsg || 'Signup failed. Please try again.';
            if (msg.toLowerCase().includes('maximum number of users reached')) {
                navigate('/limit-reached?type=account');
                return;
            }
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }

    return { signup, loading, error };
}

export default useSignup;

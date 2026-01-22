import {useState} from 'react';
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

            // Save to localStorage for persistence
            localStorage.setItem('user', JSON.stringify(response.data));

            // Update context
            dispatch({ type: 'LOGIN', payload: response.data });
            toast.success('Signup successful!');
            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.error || 'Signup failed. Please try again.');
            toast.error(error.response?.data?.error || 'Signup failed');
        } finally {
            setLoading(false);
        }
    }

    return { signup, loading, error };
}

export default useSignup;
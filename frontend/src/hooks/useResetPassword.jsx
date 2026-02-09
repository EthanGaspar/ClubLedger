import { useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../lib/axios';
import { useNavigate } from 'react-router-dom';

export const useResetPassword = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const resetPassword = async (token, password) => {
        setLoading(true);
        setError(null);

        try {
            await api.post(`/auth/users/reset-password/${token}`, { password });
            toast.success('Password reset successfully! Please log in.');
            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.error || 'Password reset failed. Please try again.');
            toast.error(error.response?.data?.error || 'Reset failed');
        } finally {
            setLoading(false);
        }
    };

    return { resetPassword, loading, error };
};

export default useResetPassword;

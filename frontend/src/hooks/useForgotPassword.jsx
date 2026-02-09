import { useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../lib/axios';

export const useForgotPassword = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const forgotPassword = async (email) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await api.post('/auth/users/forgot-password', { email });
            setSuccess(true);
            toast.success(response.data.message);
        } catch (error) {
            setError(error.response?.data?.error || 'Something went wrong. Please try again.');
            toast.error(error.response?.data?.error || 'Request failed');
        } finally {
            setLoading(false);
        }
    };

    return { forgotPassword, loading, error, success };
};

export default useForgotPassword;

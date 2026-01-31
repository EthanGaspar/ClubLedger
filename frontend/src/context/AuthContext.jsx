import { createContext, useEffect, useReducer, useState } from "react";
import api from "../lib/axios";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };
        case "LOGOUT":
            return { user: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });
    const [loading, setLoading] = useState(true);

    // Check if user is authenticated on app load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get("/auth/users/me");
                dispatch({ type: "LOGIN", payload: response.data.user });
            } catch (error) {
                // Not authenticated or token expired
                dispatch({ type: "LOGOUT" });
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    console.log("AuthContext state:", state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

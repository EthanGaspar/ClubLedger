import { createContext, useEffect, useReducer } from "react";

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
// "children" are the components wrapped by AuthContext
// See main.jsx for for what it wraps
export const AuthContextProvider = ({ children }) => { 
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    // If the the user has valid credentials then login based on the JWT in their local storage
    useEffect (() => {
        // "user" refers to user in local storage "state.user" is from useReducer
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) { 
            dispatch ({ type: "LOGIN", payload: user });
        }
    }, []);

    // Listen for unauthorized events from axios interceptor
    useEffect(() => {
        const handleUnauthorized = () => {
            dispatch({ type: "LOGOUT" });
        };

        window.addEventListener('unauthorized', handleUnauthorized);
        return () => window.removeEventListener('unauthorized', handleUnauthorized);
    }, []);

    console.log("AuthContext state:", state);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
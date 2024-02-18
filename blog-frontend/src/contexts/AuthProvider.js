import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    

    const createUser = async (data) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/account/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                toast.success("Registration Successful. Please Login!");
                return response.json();
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Registration Failed! Please try again");
                throw new Error(errorData.message);
            }
        } catch (error) {
            toast.error(error.message || "Registration Failed! Please try again");
            console.log(error.message);
        }
    };

    const signInUser = async (data) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/account/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                toast.success("Login Successful!");
                const userData = await response.json();
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
                window.location.href = "/";
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Login Failed! Please try again");
                throw new Error(errorData.message);
            }
        } catch (error) {
            toast.error(error.message || "Login Failed! Please try again");
            console.log(error.message);
        }
    };

    const logOutUser = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);

    const authInfo = {
        createUser,
        signInUser,
        logOutUser,
        user
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

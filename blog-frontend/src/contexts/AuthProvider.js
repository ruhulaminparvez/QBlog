import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthor, setIsAuthor] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const localStorageUser = JSON.parse(localStorage.getItem("user"));

    const [category, setCategory] = useState([]);
    // const [blog, setBlog] = useState([]);

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
                const userData = await response.json();
                if (userData) {
                    setUser(userData);
                    localStorage.setItem("user", JSON.stringify(userData));
                    window.location.href = "/";
                }
                toast.success("Login Successful!");
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

    const fetchCategory = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/category/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorageUser?.access}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setCategory(data);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        }
        catch (error) {
            console.log(error.message);
        }
    };

    const createCategory = async (data) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/category/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorageUser?.access}`
                    },
                    body: JSON.stringify(data)
                });
            if (response.ok) {
                const newCategory = await response.json();
                setCategory([...category, newCategory]);
                toast.success("Category Created Successfully!");
            }
            else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        }
        catch (error) {
            toast.error(error.message || "Category Creation Failed! Please try again");
            console.log(error.message);
        }
    }

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

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            if (user?.user_type === "author") {
                setIsAuthor(true);
            } else if (user?.user_type === "normal") {
                setIsUser(true);
            } else {
                setIsAuthor(false);
                setIsUser(false);
            }
        }
    }, [user]);

    const authInfo = {
        createUser,
        signInUser,
        logOutUser,
        user,
        isUser,
        isAuthor,
        category,
        fetchCategory,
        createCategory
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

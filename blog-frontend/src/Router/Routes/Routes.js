import { createBrowserRouter } from "react-router-dom";
import SignUp from "../../Pages/signup/SignUp";
import Home from "../../Pages/home/Home";
import Login from "../../Pages/login/Login";
import Main from "../../layouts/Main";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/signup",
            element: <SignUp />
        },
    ]
  },
]);

export default router;
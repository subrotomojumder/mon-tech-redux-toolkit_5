import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Main from "../pages/Layout/Main";
import CreateUser from "../pages/CreateUser";
import Cart from "../pages/Cart";
import Users from "../pages/AllUsers";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/create-user',
                element: <CreateUser />
            },
            {
                path: '/add-to-cart',
                element: <Cart />
            },
            {
                path: '/users',
                element: <Users/>
            },

        ]
    }
])


import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
//pages
import Home from "../Pages/Home";
import UserDashboard from "../Pages/Auth/UserDashboard";
import Login from "../Pages/Auth/Login";
import Registration from "../Pages/Auth/Registration";
import Templates from "../Pages/Templates";
import { templatesData } from "../Components/Data/templatesData";
import GetTemplateComponent from "../Components/GetTemplates";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children : [
            {
                path : "/",
                element : <Home />
            },
            {
                path : "/templates",
                element : <Templates />
            },
            {
                path : "/registration",
                element : <Registration />
            },
            {
                path : "/login",
                element : <Login />
            },
            {
                path : "/user-dashboard",
                element : <UserDashboard />
            },

            ...templatesData.map((template)=>({
                path : `templates/${template.link}`,
                element : GetTemplateComponent(template.link)
            }))
        ]
    },
    
])
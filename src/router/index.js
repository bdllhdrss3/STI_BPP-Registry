import { createBrowserRouter} from "react-router-dom";
import Home from '../pages/home/Index';
import Dashboard from '../pages/dashboard/index';
import DashboardLayout from "../layouts/Dashboard";
import Login from "../pages/auth/Login"



const  router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/dashboard",
    element: <DashboardLayout/>,
    children: [
        { index: true, element: <Dashboard />  },
        // {
        //   path: "contacts/:contactId",
        //   element: <Contact />,
        //   loader: contactLoader,
        //   action: contactAction,
        // },
        /* existing code */
      ],
  },
]);

export default  router;
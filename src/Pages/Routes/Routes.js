import { createBrowserRouter } from "react-router-dom";
import Appointment from "../Appointment/Appointment";
import AllUsers from "../DashBoard/AllUsers";
import DashBoard from "../DashBoard/DashBoard";
import MyAppointment from "../DashBoard/MyAppointment";
import DashBoardLayout from "../DashBoardLayout/DashBoardLayout";
import Home from "../Home/Home";
import Main from "../Home/Layout/Main";
import Login from "../Login/Login";
import Signup from "../Login/Signup/Signup";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from '../Routes/AdminRoute'
import AddDoctor from "../DashBoard/AddDoctor";
import ManageDoctors from "../DashBoard/ManageDoctors";
import Payment from "../DashBoard/Payment";
import DisplayError from "../Shared/DisplayEror/DisplayError";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/signup',
                element:<Signup></Signup>
            },
            
           
            {
                path:'/appointment',
                element:<Appointment></Appointment>
            }
        ]

    },
    {
        path:'/dashboard',
        element:<PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                
                    path:'/dashboard',
                    element:<MyAppointment></MyAppointment>
                
            },
            {
                
                    path:'/dashboard/allusers',
                    element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
                
            },
            {
                
                    path:'/dashboard/adddoctor',
                    element:<AdminRoute><AddDoctor></AddDoctor></AdminRoute>
                
            },
            {
                
                    path:'/dashboard/managedoctor',
                    element:<AdminRoute><ManageDoctors></ManageDoctors></AdminRoute>
                
            },
            {
                
                    path:'/dashboard/payment/:id',
                    element:<Payment></Payment>,
                    loader: ({params})=> fetch(`https://doctors-portal-server-sooty-five.vercel.app/bookings/${params.id}`)
                
            }
        ]
    }
])

export default router;
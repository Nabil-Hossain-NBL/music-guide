import {
  createBrowserRouter
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../Pages/Dashboard/MyCart/MyCart";
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import AddClass from "../Pages/Dashboard/AddClass/AddClass";
import MyClasses from "../Pages/Dashboard/MyClasses/MyClasses";
import ManageClasses from "../Pages/Dashboard/ManageClasses/ManageClasses";
import AdminRoute from "./AdminRoute";
import AllClass from "../Pages/AllClass/AllClass";
import AllInstructor from "../Pages/AllInstructor/AllInstructor";
import EnrolledClasses from "../Pages/Dashboard/EnrolledClasses/EnrolledClasses";
import ErrorPage from "../error-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>
      },
      {
        path: 'allClass',
        element: <AllClass></AllClass>
      }
      ,
      {
        path: 'allInstructors',
        element: <AllInstructor></AllInstructor>
      }
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: "myCart",
        element: <MyCart></MyCart>
      },
      {
        path: "manageUsers",
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: "addClass",
        element: <AddClass></AddClass>
      },
      {
        path: "myClass",
        element: <MyClasses></MyClasses>
      },
      {
        path: "manageClass",
        element: <ManageClasses></ManageClasses>
      },
      {
        path: "enrolledClass",
        element: <EnrolledClasses></EnrolledClasses>
      }
    ]
  }
]);
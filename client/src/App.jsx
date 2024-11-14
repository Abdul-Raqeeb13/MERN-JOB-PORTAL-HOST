// import { Button as BootstrapButton } from 'react-bootstrap';
// import { Button as MUIButton } from '@mui/material';

// users components
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserAppLayout from './User/User Pages/UserAppLayout';
import Home from './User/User Pages/Home'
import UserJobs from './User/User Pages/UserJobs';
import { AuthProvider } from './User/User Pages/AuthContext';
import ProtectedRoute from './User/User Pages/ProtectedRoute'
import UserAppliedJobs from './User/User Pages/UserAppliedJobs';
import JobDetail from './User/User Pages/JobDetail';
import UserProfile from './User/User Pages/UserProfile';
import UserProfileForm from './User/User Pages/ProfileForm';
// admins components
import AdminAppLayout from './Admin/Admin Pages/AdminAppLayout';
import AdminDashboard from './Admin/Admin Pages/AdminDashboard';
import AdminAddJobs from './Admin/Admin Pages/AdminAddJobs'
import AdminViewJobs from './Admin/Admin Pages/AdminViewJobs';
import AdminAppliedJobs from './Admin/Admin Pages/AdminAppliedJobs';


const router  = createBrowserRouter([
  {
    path : "/",
    element : <UserAppLayout/>,
    children : [
      {
        path : "/",
        element : <Home/>
      },
      {
        path : "/userjobs",
        element: <ProtectedRoute element={<UserJobs />} />
      },
      {
        path : "/userappliedjobs",
        element: < ProtectedRoute element={<UserAppliedJobs/>} />
      },
      {
        path : "/jobdetails/:jobid",
        element: <ProtectedRoute  element={<JobDetail/>} />
      },
      {
        path : "/userprofile",
        element: <ProtectedRoute  element={<UserProfileForm/>} />
      },
    ]
  }
  ,
  {
    path: "/admin",
    element: <AdminAppLayout />,
    children: [
      {
        path: "/admin",
        element: <AdminDashboard />
      },
      {
        path: "/admin/addjobs",
        element: <AdminAddJobs />
      },
      {
        path: "/admin/viewjobs",
        element: <AdminViewJobs />
      },
      {
        path: "/admin/appliedjob",
        element: <AdminAppliedJobs />
      },
      // {
      //   path: "/admin/addevents",
      //   element: <AddEvent />
      // },
      // {
      //   path: "/admin/ViewEvent",
      //   element: <ViewEvent/>
      // },
     
    ]
  }
])
const App = () => {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App
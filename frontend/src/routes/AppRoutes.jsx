import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Outlet,
} from "react-router-dom";

// Landing page
import LandingPage from "../pages/LandingPage";

// Auth pages
import Login from "../pages/auth/login";
import SignUp from "../pages/auth/signUp";
import VerifySignupOtp from "../pages/auth/otp";
import ForgotPassword from "../pages/auth/forgot";
import VerifyOtp from "../pages/auth/VerifyOtp";
import ResetPassword from "../pages/auth/ResetPassword";
import NotFound from "../pages/NotFound";
import AuthLayout from "../layouts/AuthLayout";

// Route guards
import ProtectedRoute from "./ProtectedRoute";

// Layouts
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import UserLayout from "../layouts/UserLayout/UserLayout";

// Admin pages
import AdminDashboard from "../pages/admin/Dashboard/AdminDashboard";
import AdminUsers from "../pages/admin/Users/AdminUsers";
import AdminServices from "../pages/admin/Services/AdminServices";
import AdminSupport from "../pages/admin/Support/AdminSupport";
import AdminAbout from "../pages/admin/About/AdminAbout";
import AdminSettings from "../pages/admin/Settings/AdminSettings";

// User pages
import UserHome from "../pages/user/Home/UserHome";
import UserProfile from "../pages/user/Profile/UserProfile";
import UserServices from "../pages/user/Services/UserServices";
import UserSupport from "../pages/user/Support/UserSupport";
import UserAbout from "../pages/user/About/UserAbout";
import UserSettings from "../pages/user/Settings/UserSettings";

/**
 * Bridge component: reads user from ProtectedRoute context and passes to Layout
 */
import { useOutletContext } from "react-router-dom";

function AdminBridge() {
  const { user } = useOutletContext();
  return <AdminLayout user={user} />;
}

function UserBridge() {
  const { user } = useOutletContext();
  return <UserLayout user={user} />;
}

const myRouter = createBrowserRouter([
  // Root → Landing Page
  {
    path: "/",
    element: <LandingPage />,
  },

  // Auth routes
  {
    path: "/login",
    element: <AuthLayout />,
    children: [{ path: "", element: <Login /> }],
  },
  { path: "/signup", element: <SignUp /> },
  { path: "/verify-signup-otp", element: <VerifySignupOtp /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/verify-otp", element: <VerifyOtp /> },
  { path: "/reset-password", element: <ResetPassword /> },

  // Legacy /home redirect
  {
    path: "/home",
    element: <Navigate to="/user/home" replace />,
  },

  // ─── ADMIN ROUTES ─────────────────────────────────────────────
  {
    element: <ProtectedRoute role="admin" />,
    children: [
      {
        path: "/admin",
        element: <AdminBridge />,
        children: [
          { path: "", element: <Navigate to="/admin/dashboard" replace /> },
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "users", element: <AdminUsers /> },
          { path: "services", element: <AdminServices /> },
          { path: "support", element: <AdminSupport /> },
          { path: "about", element: <AdminAbout /> },
          { path: "settings", element: <AdminSettings /> },
        ],
      },
    ],
  },

  // ─── USER ROUTES ──────────────────────────────────────────────
  {
    element: <ProtectedRoute role="user" />,
    children: [
      {
        path: "/user",
        element: <UserBridge />,
        children: [
          { path: "", element: <Navigate to="/user/home" replace /> },
          { path: "home", element: <UserHome /> },
          { path: "services", element: <UserServices /> },
          { path: "support", element: <UserSupport /> },
          { path: "about", element: <UserAbout /> },
          { path: "profile", element: <UserProfile /> },
          { path: "settings", element: <UserSettings /> },
        ],
      },
    ],
  },

  // 404
  { path: "*", element: <NotFound /> },
]);

function AppRoutes() {
  return <RouterProvider router={myRouter} />;
}

export default AppRoutes;

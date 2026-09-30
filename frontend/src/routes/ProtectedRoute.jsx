import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute
 * - Uses global AuthContext (no duplicate API calls)
 * - role="admin"  → only admin email allowed; others → /user/home
 * - role="user"   → admin is redirected → /admin/dashboard
 * - No role       → any authenticated user
 */
function ProtectedRoute({ role }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="route-loader" aria-label="Checking session" />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = user.email === "geetaishsinghrajput@gmail.com";

  if (role === "admin" && !isAdmin) {
    return <Navigate to="/user/home" replace />;
  }

  if (role === "user" && isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet context={{ user }} />;
}

export default ProtectedRoute;

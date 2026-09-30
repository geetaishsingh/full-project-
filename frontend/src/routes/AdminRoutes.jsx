import { useOutletContext } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

/**
 * AdminRoutes wraps all /admin/* pages inside:
 *   ProtectedRoute (role="admin") → AdminLayout → page
 *
 * The ProtectedRoute passes user via Outlet context.
 * AdminLayout reads user from the same context.
 */
function AdminRoutesWrapper() {
  const { user } = useOutletContext();
  return <AdminLayout user={user} />;
}

export { AdminRoutesWrapper };

// Re-export ProtectedRoute for convenience
export { default as ProtectedRoute } from "./ProtectedRoute";

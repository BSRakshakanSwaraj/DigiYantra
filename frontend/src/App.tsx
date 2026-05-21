import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AdminApprovalPage } from "./pages/AdminApprovalPage";
import { SuperAdminPage } from "./pages/SuperAdminPage";

// ==============================
// PROTECTED ROUTE
// ==============================
const ProtectedRoute = ({
  children,
  allowedRole,
}: {
  children: JSX.Element;
  allowedRole: string;
}) => {

  const token = localStorage.getItem("token");

  const role =
    localStorage
      .getItem("role")
      ?.toLowerCase();

  // NOT LOGGED IN
  if (!token) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

  // WRONG ROLE
  if (role !== allowedRole) {

    if (role === "admin") {

      return (
        <Navigate
          to="/admin"
          replace
        />
      );

    }

    if (role === "service") {

      return (
        <Navigate
          to="/service"
          replace
        />
      );

    }

    return (
      <Navigate
        to="/user"
        replace
      />
    );
  }

  return children;
};

// ==============================
// APP
// ==============================
export function App() {

  return (

    <Router>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* SIGNUP */}
        <Route
          path="/signup"
          element={<SignupPage />}
        />

        {/* USER DASHBOARD */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRole="user">

              <DashboardPage />

            </ProtectedRoute>
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">

              <DashboardPage />

            </ProtectedRoute>
          }
        />

        {/* SERVICE DASHBOARD */}
        <Route
          path="/service"
          element={
            <ProtectedRoute allowedRole="service">

              <DashboardPage />

            </ProtectedRoute>
          }
        />

        {/* ADMIN APPROVAL PAGE */}
        <Route
          path="/admin-approvals"
          element={
            <ProtectedRoute allowedRole="admin">

              <AdminApprovalPage />

            </ProtectedRoute>
          }
        />
        <Route
        path="/superadmin"
        element={
        <ProtectedRoute
        allowedRole="superadmin">
          <SuperAdminPage />
          </ProtectedRoute>
        }
        />

        {/* DEFAULT */}
        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>

    </Router>

  );
}
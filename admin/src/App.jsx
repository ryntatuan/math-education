import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminAuthProvider } from "./auth/AdminAuthProvider";
import AdminRoute from "./auth/AdminRoute";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import EconomyPage from "./pages/EconomyPage";
import UsersPage from "./pages/UsersPage";

export default function App() {
  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AdminRoute>
                <Layout />
              </AdminRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="economy" element={<EconomyPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AdminAuthProvider>
  );
}

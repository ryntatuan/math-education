import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminAuthProvider } from "./auth/AdminAuthProvider";
import AdminRoute from "./auth/AdminRoute";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import EconomyPage from "./pages/EconomyPage";
import UsersPage from "./pages/UsersPage";
import ChildProfilePage from "./pages/ChildProfilePage";
import ReportsPage from "./pages/ReportsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ContentPage from "./pages/ContentPage";
import ReferencePage from "./pages/ReferencePage";

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
            <Route path="users/:childId" element={<ChildProfilePage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="content" element={<ContentPage />} />
            <Route path="reference" element={<ReferencePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AdminAuthProvider>
  );
}

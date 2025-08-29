import { Routes, Route } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import EditGame from './pages/EditGame';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Ruta pública sin layout */}
      <Route path="/admin" element={<AdminLogin />} />

      {/* Rutas protegidas con layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<CatalogPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditGame />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

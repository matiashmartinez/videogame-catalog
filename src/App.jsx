import { Routes, Route } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AddGame from './pages/AddGame'; // Importante importar el nuevo
import EditGame from './pages/EditGame';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* 1. Login: Fuera de todo para que sea una pantalla limpia */}
      <Route path="/admin" element={<AdminLogin />} />

      {/* 2. Rutas con el diseño base (Navbar, Footer, etc.) */}
      <Route element={<Layout />}>
        
        {/* Ruta pública: El catálogo */}
        <Route path="/" element={<CatalogPage />} />

        {/* 3. RUTAS PROTEGIDAS: Cada una con su URL única */}
        
        {/* Dashboard: Estadísticas y resumen */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Agregar: El formulario para nuevos juegos */}
        <Route
          path="/admin/add"
          element={
            <ProtectedRoute>
              <AddGame />
            </ProtectedRoute>
          }
        />

        {/* Editar: El formulario con ID dinámico */}
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
import { Routes, Route } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AddGame from './pages/AddGame'; // Importante importar el nuevo
import EditGame from './pages/EditGame';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Error404 from './pages/Error404';

const App = ()=> {
  return (
    <Routes>
      {/* 1. Rutas totalmente abiertas */}
      <Route path="/admin" element={<AdminLogin />} />

      {/* 2. Rutas que llevan el diseño base (Navbar) */}
      <Route element={<Layout />}>
        <Route path="/" element={<CatalogPage />} />

        {/* 3. CAPA DE SEGURIDAD: Todo lo que esté aquí adentro está protegido */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add" element={<AddGame />} />
          <Route path="/edit/:id" element={<EditGame />} />
        </Route>

        {/* Ruta de escape */}
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}


export default App;
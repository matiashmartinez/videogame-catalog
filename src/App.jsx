import { Routes, Route, useLocation } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Layout from './components/Layout';


function App() {
  const location = useLocation();
  const isLoginRoute = location.pathname === '/admin';

  return isLoginRoute ? (
    <Routes>
      <Route path="/admin" element={<AdminLogin />} />
    </Routes>
  ) : (
    <Layout>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Layout>
  );
}

export default App;

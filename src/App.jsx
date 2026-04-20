import { Routes, Route } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AddGame from './pages/AddGame'; // Importante importar el nuevo
import EditGame from './pages/EditGame';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Error404 from './pages/Error404';
import { useAdmin } from './context/AdminContext'
import {useInactivityTimeout} from './hooks/useInactivityTimeout';

const App = ()=> {

const { isAdmin } = useAdmin();

useInactivityTimeout(2);
  return (
    <Routes>
      
      <Route path="/admin" element={<AdminLogin />} />
   
      <Route element={<Layout />}>
        <Route path="/" element={<CatalogPage />} />
     
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add" element={<AddGame />} />
          <Route path="/edit/:id" element={<EditGame />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}


export default App;
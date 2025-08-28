import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';


function App() {
return (
<Router>
<Routes>
<Route path="/" element={<CatalogPage />} />
<Route path="/admin" element={<AdminLogin />} />
<Route path="/dashboard" element={<AdminDashboard />} />
</Routes>
</Router>
);
}


export default App;
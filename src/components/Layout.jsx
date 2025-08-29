import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import ScrollToTopButton from './ScrollToTopButton'


const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-900 text-white px-4 py-6">
        <Outlet />
        <ScrollToTopButton />
      </main>
      <Footer />
    </>
  );
};

export default Layout;

import './App.css';
import { UserProvider } from './components/layout/test-api/UserContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/sidebar/Sidebar';
import { adminRoutes } from './components/layout/routes-config/adminRoutes';
import { sellerRoutes } from './components/layout/routes-config/sellerRoutes';
import { authRoutes } from './components/layout/routes-config/authRoutes';
import { ProductProvider } from './components/layout/test-api/products/ProductContext';
import ScrollToTop from './components/layout/page-components/ScrollToTop';
import BuyerLayout from './components/layout/pages/layouts/BuyerLayout';
import { buyerRoutes } from './components/layout/routes-config/buyerRoutes';

function App() {
  return (
    <UserProvider>
     <ProductProvider>
     <div className='parent-container'>
     <Router>
            <ScrollToTop />
            <Sidebar />
            <div className='content-container'>
                <Routes>
                    <Route path="/" element={<Navigate to="/buyer-home" />} />
                    {authRoutes.map(route => (
                        <Route key={route.path} path={route.path} element={<route.component />} />
                    ))}
                    {adminRoutes.map(route => (
                        <Route key={route.path} path={route.path} element={<route.component />} />
                    ))}
                    {sellerRoutes.map(route => (
                        <Route key={route.path} path={route.path} element={<route.component />} />
                    ))}
                    {buyerRoutes.map(route => (
                        <Route key={route.path} path={route.path} element={<route.component />} />
                    ))}
                    
                </Routes>
            </div>
        </Router>
      </div>
     </ProductProvider>
    </UserProvider>
  )
}

export default App;

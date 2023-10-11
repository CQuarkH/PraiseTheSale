import './App.css';
import { UserProvider } from './components/layout/test-api/UserContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/sidebar/Sidebar';
import { adminRoutes } from './components/layout/routes-config/adminRoutes';
import { sellerRoutes } from './components/layout/routes-config/sellerRoutes';
import { buyerRoutes } from './components/layout/routes-config/buyerRoutes';
import { authRoutes } from './components/layout/routes-config/authRoutes';
import { ProductProvider } from './components/layout/test-api/products/ProductContext';
import ScrollToTop from './components/layout/page-components/ScrollToTop';
import { DisplayedElementsProvider } from './components/layout/page-components/utils/DisplayedElementsContext';
function App() {
  return (
    <UserProvider>
    <DisplayedElementsProvider>
     <ProductProvider>
     <div className='parent-container'>
      <Router>
      <ScrollToTop/>
      <Routes>
          {authRoutes.map(route => (
          <Route key={route.path} path={route.path} element={<route.component />} />
          ))}
          </Routes>
        <Sidebar/>
        <div className='content-container'>
          <Routes>
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
     </DisplayedElementsProvider>
    </UserProvider>
  )
}

export default App;

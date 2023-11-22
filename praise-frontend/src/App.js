import './App.css';
import { UserProvider } from './test-api/UserContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/sidebar/Sidebar';
import { adminRoutes } from './routes/adminRoutes';
import { sellerRoutes } from './routes/sellerRoutes';
import { authRoutes } from './routes/authRoutes';
import { buyerRoutes } from './routes/buyerRoutes';
import ScrollToTop from './components/layout/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/route-component/ProtectedRoute';
import HomeRedirect from './routes/route-component/HomeRedirect';
import { commonRoutes } from './routes/commonRoutes';
import PageNotFound from './pages/shared/PageNotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductProvider } from './context/ProductContext';
import ComplaintsProvider from './context/ComplaintContext';


function App() {
  return (
    <>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />  
    <AuthProvider>
    <UserProvider>
     <ProductProvider>
     <ComplaintsProvider>
     <div className='parent-container'>
       <Router>
            <ScrollToTop />
            <Sidebar />
            <div className='content-container'>
                <Routes>
                    <Route path="/" element={ <HomeRedirect/> } />
                    {authRoutes.map(route => (
                        <Route key={route.path} path={route.path} element={<route.component />} />
                    ))}
                    {adminRoutes.map(route => (
                        <Route key={route.path} path={route.path} element={
                         <ProtectedRoute roles={['ADMIN']}>
                            <route.component />
                          </ProtectedRoute> 
                        } />
                    ))}
                    {sellerRoutes.map(route => (
                        <Route key={route.path} path={route.path} element={
                         <ProtectedRoute roles={['SELLER']}>
                            <route.component />
                          </ProtectedRoute> 
                        } />
                    ))}
                    {buyerRoutes.map(route => (
                        <Route key={route.path} path={route.path} element={
                            route.protected ? 
                            <ProtectedRoute roles={['BUYER']}>
                              <route.component />
                            </ProtectedRoute> :
                            <route.component />
                        } />
                    ))}
                    {commonRoutes.map(route => (
                    <Route key={route.path} path={route.path} element={
                        <ProtectedRoute roles={['ADMIN', 'SELLER', 'BUYER']}>
                            <route.component />
                        </ProtectedRoute>
                    } />
                    ))}
                    <Route path="*" element={<PageNotFound/>} />
                </Routes>
            </div>
        </Router>
      </div>
      </ComplaintsProvider>
     </ProductProvider>
    </UserProvider>
    </AuthProvider>
    
    </>
  )
}

export default App;

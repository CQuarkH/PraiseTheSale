import SellerHome from '../pages/seller-pages/SellerHome';
import SellerSalesHistory from '../pages/seller-pages/SellerSalesHistory';
import SellerComplaints from '../pages/seller-pages/SellerComplaints';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import FeedbackIcon from '@mui/icons-material/Feedback';


export const sellerRoutes = [
    {
      path: '/seller-home',
      component: SellerHome,
      title: 'Home',
      icon: <HomeIcon className='sidebar-option-icon'/>,
      showInSidebar: true
    },
    {
      path: '/seller-sales-history',
      component: SellerSalesHistory,
      title: 'Sales History',
      icon: <HistoryIcon className='sidebar-option-icon'/>,
      showInSidebar: true
    },
    {
      path: '/seller-complaints',
      component: SellerComplaints,
      title: 'Complaints',
      icon: <FeedbackIcon className='sidebar-option-icon'/>,
      showInSidebar: true
    },
    
];
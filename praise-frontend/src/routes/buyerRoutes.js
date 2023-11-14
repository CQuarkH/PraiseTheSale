import HomeIcon from '@mui/icons-material/Home';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CategoryIcon from '@mui/icons-material/Category';
import FeedbackIcon from '@mui/icons-material/Feedback';
import BuyerHome from '../pages/buyer-pages/BuyerHome';
import BuyerSellers from '../pages/buyer-pages/BuyerSellers';
import BuyerCategories from '../pages/buyer-pages/BuyerCategories';
import BuyerComplaints from '../pages/buyer-pages/BuyerComplaints';
import ProductsByCategory from '../pages/common-pages/ProductsByCategory';


export const buyerRoutes = [
    {
      path: '/buyer-home',
      component: BuyerHome,
      title: 'Home',
      icon: <HomeIcon className='sidebar-option-icon'/>,
      showInSidebar: true,
      protected: false
    },
    {
      path: '/buyer-sellers',
      component: BuyerSellers,
      title: 'Sellers',
      icon: <BusinessCenterIcon className='sidebar-option-icon'/>,
      showInSidebar: true,
      protected: false
    },
    {
      path: '/buyer-categories',
      component: BuyerCategories,
      title: 'Categories',
      icon: <CategoryIcon className='sidebar-option-icon'/>,
      showInSidebar: true,
      protected: false
    },
    {
      path: '/buyer-categories/:categoryName',
      component: ProductsByCategory,
      protected: true
    },
    {
      path: '/buyer-complaints',
      component: BuyerComplaints,
      title: 'Complaints',
      icon: <FeedbackIcon className='sidebar-option-icon'/>,
      showInSidebar: true,
      protected: true
    },
    
  ];
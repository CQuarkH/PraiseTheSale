import AdminHome from '../pages/admin-pages/AdminHome';
import AdminUsers from '../pages/admin-pages/AdminUsers';
import AdminProducts from '../pages/admin-pages/AdminProducts';
import AdminComplaints from '../pages/admin-pages/AdminComplaints';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ProductView from '../page-components/ProductView';
import { commonRoutes } from './commonRoutes';
import ComplaintView from '../pages/admin-pages/ComplaintView';


export const adminRoutes = [
  ...commonRoutes,
    {
      path: '/admin-home',
      component: AdminHome,
      title: 'Home',
      icon: <HomeIcon className='sidebar-option-icon'/>,
      showInSidebar: true
    },
    {
      path: '/product/:productID',
      component: ProductView,
      showInSidebar: false
    },
    {
      path: '/admin-users',
      component: AdminUsers,
      title: 'Users',
      icon: <GroupIcon className='sidebar-option-icon'/>,
      showInSidebar: true
    },
    {
      path: '/admin-products',
      component: AdminProducts,
      title: 'Products',
      icon: <Inventory2Icon className='sidebar-option-icon'/>,
      showInSidebar: true
    },
    {
      path: '/admin-complaints',
      component: AdminComplaints,
      title: 'Complaints',
      icon: <FeedbackIcon className='sidebar-option-icon'/>,
      showInSidebar: true
    },
    {
      path: '/admin-complaints/:complaintID',
      component: ComplaintView
    }
    
  ];
import ComplaintView from '../page-components/ComplaintView';
import ProductView from '../page-components/ProductView';
import ProductsBySeller from '../page-components/ProductsBySeller';
import LoginRegister from '../pages/login/LoginRegister';

export const commonRoutes = [
    {
     path: '/product/:productID',
     component: ProductView,
    },
    {
     path: '/seller/:sellerID',
     component: ProductsBySeller
    },
    {
     path: '/complaint/:complaintID',
     component: ComplaintView
    }
];
import ComplaintView from '../pages/common-pages/complaint-view/ComplaintView';
import ProductView from '../pages/common-pages/product-view/ProductView';
import ProductsBySeller from '../pages/common-pages/ProductsBySeller';


export const commonRoutes = [
    {
     path: '/product/:productID',
     component: ProductView,
    
    },
    {
     path: '/seller/:sellerID',
     component: ProductsBySeller,
     
    },
    {
     path: '/complaint/:complaintID',
     component: ComplaintView,
     
    }
];

import ProductView from '../page-components/ProductView';

export const commonRoutes = [
    {
     path: '/product/:productID',
     component: ProductView,
     showInSidebar: false
    },
];
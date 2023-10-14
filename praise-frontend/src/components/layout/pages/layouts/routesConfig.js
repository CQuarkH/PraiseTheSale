import BuyerCategories from "../buyer-pages/BuyerCategories";
import ProductsByCategory from "../../page-components/ProductsByCategory";
import ProductView from "../../page-components/ProductView";
import BuyerSellers from "../buyer-pages/BuyerSellers";
import ProductsBySeller from "../../page-components/ProductsBySeller";
import BuyerHome from "../buyer-pages/BuyerHome";
import BuyerComplaints from "../buyer-pages/BuyerComplaints";
import SellerHome from "../seller-pages/SellerHome";
import SellerSalesHistory from "../seller-pages/SellerSalesHistory";
import SellerComplaints from "../seller-pages/SellerComplaints";

function generateNestedRoutes(routeConfig) {
    if (!routeConfig.children) {
        return {
            path: routeConfig.path,
            element: routeConfig.element
        };
    }

    return {
        path: routeConfig.path,
        element: routeConfig.element,
        children: routeConfig.children.map(childRoute => generateNestedRoutes(childRoute))
    };
}



export const buyerRoutesConfig = [
    {
        path: 'home',
        showInSidebar: true,
        element: <BuyerHome/>,
        children: [
            {
                path: ':productID',
                element: <ProductView/>
            }
        ]

    },
    {
        path: 'sellers',
        showInSidebar: true,
        element: <BuyerSellers/>,
        children: [
            {
                path: ':sellerID',
                element: <ProductsBySeller/>,
                children: [
                    {
                        path: ':productID',
                        element: <ProductView/>
                    }
                ]
            }
        ]
    },
    {
        path: 'categories',
        showInSidebar: true,
        element: <BuyerCategories />,
        children: [
            {
                path: ':categoryName',
                element: <ProductsByCategory />,
                children: [
                    {
                        path: ':productID',
                        element: <ProductView />
                    }
                ]
            }
        ]
    },
    {
        path: 'complaints',
        showInSidebar: true,
        element: <BuyerComplaints/>,
    }

];

export const sellerRoutes = [
    {
        path: 'home',
        showInSidebar: true,
        element: <SellerHome/>,
        children: [
            {
                path: ':productID',
                element: <ProductView/>
            }
        ]
    },
    {
        path: 'sales-history',
        showInSidebar: true,
        element: <SellerSalesHistory/>,
    },
    {
        path: 'complaints',
        showInSidebar: true,
        element: <SellerComplaints/>
    }
]

export const buyerRoutes = buyerRoutesConfig.map(route => generateNestedRoutes(route));
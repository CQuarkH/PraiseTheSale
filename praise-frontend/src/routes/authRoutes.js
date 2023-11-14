import ConfirmAccount from "../pages/auth/ConfirmAccount"
import ForgotPassword from "../pages/auth/ForgotPassword"
import LoginRegister from "../pages/auth/LoginRegister"


export const authRoutes = [
    {
     path: '/login',
     component: LoginRegister
    },
    {
     path: '/forgot-password',
     component: ForgotPassword
    },
    {
     path: '/confirm-account',
     component: ConfirmAccount   
    }
    
]
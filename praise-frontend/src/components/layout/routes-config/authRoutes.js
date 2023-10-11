import ForgotPassword from "../pages/login/ForgotPassword"
import LoginRegister from "../pages/login/LoginRegister"


export const authRoutes = [
    {
     path: '/login',
     component: LoginRegister
    },
    {
     path: '/forgot-password',
     component: ForgotPassword
    }
]